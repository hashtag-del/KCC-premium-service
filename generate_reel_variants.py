from pathlib import Path

from moviepy import ColorClip, CompositeVideoClip, ImageClip, TextClip, concatenate_videoclips

BASE = Path(__file__).resolve().parent
IMG = BASE / "assets" / "images"

W, H = 1080, 1920
FPS = 30


SCENES = [
    (IMG / "request-basic.jpg", 4.0),
    (IMG / "request-deep.jpg", 4.0),
    (IMG / "request-fleet.jpg", 4.0),
    (IMG / "request.jpg", 4.0),
    (IMG / "home.jpg", 3.5),
    (IMG / "services.jpg", 3.5),
]


def fit_cover(image_path: Path, duration: float):
    clip = ImageClip(str(image_path)).with_duration(duration)
    clip = clip.resized(height=H) if clip.w / clip.h > W / H else clip.resized(width=W)
    x = (clip.w - W) / 2
    y = (clip.h - H) / 2
    return clip.cropped(x1=x, y1=y, x2=x + W, y2=y + H)


def title(text: str, start: float, end: float, size: int = 72, color: str = "white"):
    return (
        TextClip(
            text=text,
            font_size=size,
            color=color,
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


def badge(text: str, start: float, end: float, text_color: str = "#FFD54A"):
    bg = (
        ColorClip(size=(760, 110), color=(0, 0, 0))
        .with_opacity(0.45)
        .with_start(start)
        .with_end(end)
        .with_position(("center", 130))
    )
    label = (
        TextClip(
            text=text,
            font_size=48,
            color=text_color,
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


def base_video():
    clips = [fit_cover(path, d) for path, d in SCENES]
    return concatenate_videoclips(clips, method="compose")


def render_tiktok_aggressive(out_path: Path):
    video = base_video()
    layers = [video]

    layers.extend(badge("Schmutzig? Nicht mehr.", 0.0, 3.5, text_color="#FF7A59"))
    layers.append(title("Wien 23 Innenraum-Reset", 0.0, 3.5, 84, color="#FFFFFF"))

    layers.extend(badge("Express Deep Clean", 3.5, 8.0, text_color="#FFB347"))
    layers.append(title("Sitze, Cockpit, Fussraum", 3.5, 8.0, 66))

    layers.extend(badge("Heute Termin sichern", 8.0, 13.0, text_color="#FFD54A"))
    layers.append(title("Schnell. Gruendlich. Lokal.", 8.0, 13.0, 68))

    layers.extend(badge("Vorher -> Nachher", 13.0, 18.0, text_color="#FFDF6B"))
    layers.append(title("Sieht aus wie neu", 13.0, 18.0, 80))

    layers.extend(badge("Nur Wien 23", 18.0, 23.0, text_color="#FFFFFF"))
    layers.append(title("JETZT DM FUER SLOT", 18.0, 23.0, 96, color="#FFEB99"))

    final = CompositeVideoClip(layers, size=(W, H)).with_duration(23.0)
    final.write_videofile(str(out_path), fps=FPS, codec="libx264", audio=False, bitrate="14M")


def render_instagram_clean(out_path: Path):
    video = base_video()
    layers = [video]

    layers.extend(badge("Auto Innenraumwäsche", 0.0, 4.5, text_color="#EDEDED"))
    layers.append(title("Wien 23", 0.0, 4.5, 94, color="#F8F8F8"))

    layers.extend(badge("Sorgfaeltige Details", 4.5, 9.0, text_color="#D7E6F5"))
    layers.append(title("Cockpit, Lueftung, Flaechen", 4.5, 9.0, 58, color="#FFFFFF"))

    layers.extend(badge("Textilien & Fussraum", 9.0, 14.0, text_color="#D7E6F5"))
    layers.append(title("Sauber und gepflegt", 9.0, 14.0, 64, color="#F9F9F9"))

    layers.extend(badge("Vorher / Nachher", 14.0, 19.0, text_color="#EDEDED"))
    layers.append(title("Ein frisches Fahrgefuehl", 14.0, 19.0, 66, color="#FFFFFF"))

    layers.extend(badge("Buchung per DM", 19.0, 23.0, text_color="#FFFFFF"))
    layers.append(title("Innenraumpflege in Wien 23", 19.0, 23.0, 60, color="#F8F8F8"))

    final = CompositeVideoClip(layers, size=(W, H)).with_duration(23.0)
    final.write_videofile(str(out_path), fps=FPS, codec="libx264", audio=False, bitrate="12M")


def main():
    tiktok_out = BASE / "reel-wien23-tiktok-aggressive.mp4"
    insta_out = BASE / "reel-wien23-instagram-clean.mp4"

    render_tiktok_aggressive(tiktok_out)
    render_instagram_clean(insta_out)


if __name__ == "__main__":
    main()
