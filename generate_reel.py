from pathlib import Path

from moviepy import (
    ColorClip,
    CompositeVideoClip,
    ImageClip,
    TextClip,
    concatenate_videoclips,
)


BASE = Path(__file__).resolve().parent
IMG = BASE / "assets" / "images"
OUT = BASE / "reel-wien23.mp4"

W, H = 1080, 1920
FPS = 30


def fit_cover(image_path: Path, duration: float):
    """Scale an image to cover the 9:16 frame and center-crop it."""
    clip = ImageClip(str(image_path)).with_duration(duration)
    clip = clip.resized(height=H) if clip.w / clip.h > W / H else clip.resized(width=W)
    x = (clip.w - W) / 2
    y = (clip.h - H) / 2
    return clip.cropped(x1=x, y1=y, x2=x + W, y2=y + H)


def title(txt: str, start: float, end: float, size: int = 72):
    return (
        TextClip(
            text=txt,
            font_size=size,
            color="white",
            stroke_color="black",
            stroke_width=3,
            method="caption",
            text_align="center",
            size=(980, None),
        )
        .with_start(start)
        .with_end(end)
        .with_position(("center", H - 280))
    )


def badge(txt: str, start: float, end: float):
    bg = (
        ColorClip(size=(760, 110), color=(0, 0, 0))
        .with_opacity(0.45)
        .with_start(start)
        .with_end(end)
        .with_position(("center", 130))
    )
    label = (
        TextClip(
            text=txt,
            font_size=48,
            color="#FFD54A",
            stroke_color="black",
            stroke_width=2,
            method="caption",
            text_align="center",
            size=(700, None),
        )
        .with_start(start)
        .with_end(end)
        .with_position(("center", 155))
    )
    return [bg, label]


scenes = [
    (IMG / "request-basic.jpg", 4.0),
    (IMG / "request-deep.jpg", 4.0),
    (IMG / "request-fleet.jpg", 4.0),
    (IMG / "request.jpg", 4.0),
    (IMG / "home.jpg", 3.5),
    (IMG / "services.jpg", 3.5),
]

clips = []
for path, d in scenes:
    base = fit_cover(path, d)
    clips.append(base)

video = concatenate_videoclips(clips, method="compose")

layers = [video]

layers.extend(badge("Innenraumwäsche Wien 23", 0.0, 4.0))
layers.append(title("Dein Auto innen wie neu", 0.0, 4.0, 78))

layers.extend(badge("Tiefenreinigung", 4.0, 8.0))
layers.append(title("Armaturen, Lueftung, Konsole", 4.0, 8.0, 64))

layers.extend(badge("Sitze & Fussraum", 8.0, 12.0))
layers.append(title("Gruendlich und schonend", 8.0, 12.0, 64))

layers.extend(badge("Hygienisch sauber", 12.0, 16.0))
layers.append(title("Touchflaechen desinfiziert", 12.0, 16.0, 62))

layers.extend(badge("Vorher -> Nachher", 16.0, 19.5))
layers.append(title("Frisch. Sauber. Einladend.", 16.0, 19.5, 66))

layers.extend(badge("Wien 23", 19.5, 23.0))
layers.append(title("DM fuer Termin", 19.5, 23.0, 92))

final = CompositeVideoClip(layers, size=(W, H)).with_duration(23.0)

final.write_videofile(
    str(OUT),
    fps=FPS,
    codec="libx264",
    audio=False,
    bitrate="14M",
)
