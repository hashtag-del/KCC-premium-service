# KCC Premiumdienste – Projektstatus

## Projektübersicht
- Business: Wohnungsräumungen & Haushaltsauflösungen (Hauptfokus), dazu Reinigung, Gartenpflege, Umzugshilfe, Fahrzeugpflege
- Marke: KCC Premiumdienste (K = Kaiser, C = Clemens, C = Constantin)
- Slogan: "Drei Freunde. Ein Team. Qualität."
- Region: Breitenfurt bei Wien und Umgebung (vorerst)
- Telefon: +4367763267134
- E-Mail: Fresh_interior@outlook.com (HINWEIS: für die Marke besser später z. B. kcc.premiumdienste@outlook.com anlegen und überall tauschen)
- Website: statische Multi-Page-Website (HTML, CSS, JS)
- Live: https://kccpremiumservice.netlify.app/
- Repo: https://github.com/hashtag-del/fresh-interior

## Design (Basis: Referenzbilder vom User)
- Dunkelgrün + Gold, Krone als Markenzeichen-Idee
- Farben in styles.css: --bg #0a1f19, --surface #123129, --accent (Gold) #d4b96a
- Foto-Hintergründe entfernt, stattdessen dunkle Farbflächen (Fotos passend zum Räumungsbusiness noch offen)

## Aktuelle Seiten
- index.html – Start: Hero "Wohnung räumen lassen", Warum KCC, Fixpreis-Callout, 3-Schritte-Ablauf, weitere Premiumdienste
- leistungen.html – Wohnungsräumung, Haushaltsauflösung, Keller/Dachboden/Garage, Büro, Entsorgung, besenreine Übergabe
- preise.html – Pakete: Räumung Kompakt (ab 290 EUR), Räumung Komplett (ab 690 EUR, featured), Räumung Business (auf Anfrage)
- raeumung-kompakt.html / raeumung-komplett.html / raeumung-business.html – Paket-Detailseiten
- anfrage-kompakt.html / anfrage-komplett.html / anfrage-business.html – Paket-Anfrageformulare (FormSubmit, Honeypot, DSGVO-Checkbox, Redirect auf danke.html)
- kontakt.html – Hauptkontaktformular mit Adressfeld
- danke.html – Danke-Seite nach Formular
- impressum.html / datenschutz.html – auf KCC umgestellt

## Formulare / E-Mail
- FormSubmit (kostenlos): https://formsubmit.co/Fresh_interior@outlook.com
- WICHTIG: Nach erstem Test die FormSubmit-Aktivierungs-Mail bestätigen, sonst kommen keine Mails an
- Pflichtfelder: Name, E-Mail, Telefon, paketspezifische Felder, DSGVO-Checkbox

## Verlauf (alt → neu)
- Ursprung: "Fresh Interior" Auto-Innenraumwäsche Wien 23
- 2026-10-29: Komplette Umwandlung zu KCC Premiumdienste (Räumungen) anhand zweier Referenzbilder des Users
- Alte Auto-Dateien (basic-clean/deep-fresh/fleet-pro + anfrage-*) wurden umbenannt zu raeumung-*/anfrage-kompakt/komplett/business
- Social-Videos (reel-wien23*.mp4, generate_reel*.py, video-*.md/srt) stammen noch vom Auto-Business und sind Legacy – bei Bedarf neu für KCC erstellen
- putzsachen-liste.md ist ebenfalls Legacy vom Reinigungskonzept

## Technik-Hinweise
- Deployment: Push auf main → Netlify baut automatisch
- Live-Checks mit Cache-Buster (?cb=...) durchführen, Netlify liefert sonst evtl. alte Versionen
- netlify.toml: statisches Hosting, Security-Header, kein SPA-Redirect

