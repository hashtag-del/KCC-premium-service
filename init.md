# KCC Premiumdienste – Projektstatus

## Projektübersicht
- Business: Wohnungsräumungen & Haushaltsauflösungen (Hauptfokus), dazu Reinigung, Gartenpflege, Umzugshilfe, Fahrzeugpflege
- Marke: KCC Premiumdienste (K = Kaiser, C = Clemens, C = Constantin)
- Slogan: "Drei Freunde. Ein Team. Qualität."
- Region: Breitenfurt bei Wien und Umgebung (vorerst)
- Telefon: +4367763267134
- E-Mail: KCC.premium.service@outlook.com
- Website: statische Multi-Page-Website (HTML, CSS, JS)
- Live: https://kccpremiumservice.netlify.app/
- Repo: https://github.com/hashtag-del/fresh-interior

## Design
- Modernes, helles Design im Apple-Stil: viel Weißraum, Systemschrift (SF Pro / Inter), abgerundete Karten, Glas-Effekt in der Menüleiste
- Buttons durchgehend schwarz-weiß (auf dunklen Flächen weiß mit schwarzer Schrift)
- Farben in styles.css: --bg #ffffff, --bg-alt #f5f5f7, --text #1d1d1f
- Bilder: assets/images/hero-kcc.jpg, callout-kcc.jpg, leistungen-kcc.jpg
- Hintergründe: dezente helle Verläufe, Foto-Banner auf Leistungen/Preise/Kontakt und im Preis-Callout; helle Foto-Überlagerungen in Kontaktbereichen. Rechtliche Texte bleiben auf ruhigen Flächen.

## Preis
- Ein einziges Angebot: 29,99 € pro Stunde (ohne Zusatz "pro Person")
- Abrechnung nach Aufwand, kostenlose Besichtigung mit Aufwandsschätzung

## Aktuelle Seiten
- index.html – Start: Hero, Warum KCC, Preis-Banner, 3-Schritte-Ablauf, weitere Premiumdienste
- leistungen.html – Wohnungsräumung, Haushaltsauflösung, Keller/Dachboden/Garage, Büro, Entsorgung, besenreine Übergabe
- preise.html – ein Paket "Räumung" mit 29,99 € / Stunde plus Hinweise
- kontakt.html – einziges Anfrageformular (Name, E-Mail optional, Telefon, Adresse, Details)
- danke.html – Danke-Seite nach Formular
- impressum.html / datenschutz.html

## Formulare / E-Mail
- FormSubmit (kostenlos): https://formsubmit.co/KCC.premium.service@outlook.com
- WICHTIG: Nach erstem Test die FormSubmit-Aktivierungs-Mail bestätigen, sonst kommen keine Mails an
- Bei Versandfehlern bleiben Eingaben erhalten. Der E-Mail-Link unter dem Formular übernimmt die Angaben beim Absendeversuch ins lokale E-Mail-Programm; dort muss die E-Mail noch abgesendet werden.
- Pflichtfelder: Name, Telefon, Adresse, Details, DSGVO-Checkbox (E-Mail ist optional)

## Technik-Hinweise
- Deployment: Push auf main → Netlify baut automatisch
- Live-Checks mit Cache-Buster (?cb=...) durchführen, Netlify liefert sonst evtl. alte Versionen
- netlify.toml: statisches Hosting, Security-Header, kein SPA-Redirect
