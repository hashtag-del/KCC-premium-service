(() => {
  "use strict";

  const consentKey = "kcc-premium-agb-2026-10-30";
  const protectedPages = [
    "index.html",
    "leistungen.html",
    "preise.html",
    "kontakt.html",
    "danke.html",
    "datenschutz.html",
    "impressum.html",
  ];
  const pageName = window.location.pathname.split("/").pop().toLowerCase();

  function hasConsent() {
    try {
      return window.localStorage.getItem(consentKey) === "accepted";
    } catch (error) {
      console.error("Die Zustimmung konnte nicht aus dem Browserspeicher gelesen werden.", error);
      return false;
    }
  }

  if (pageName !== "agb.html") {
    if (!hasConsent()) {
      const gateUrl = new URL("agb.html", window.location.href);
      gateUrl.searchParams.set(
        "next",
        window.location.pathname + window.location.search + window.location.hash
      );
      window.location.replace(gateUrl.href);
    }
    return;
  }

  const form = document.getElementById("agb-consent-form");
  const status = document.getElementById("agb-consent-status");

  if (!form || !status) {
    console.error("Das Zustimmungsformular oder die Statusanzeige für die AGB fehlt.");
    return;
  }

  function getReturnUrl() {
    const defaultUrl = new URL("index.html", window.location.href);
    const requestedUrl = new URLSearchParams(window.location.search).get("next");
    const allowedPaths = new Set(
      protectedPages.map((page) => new URL(page, window.location.href).pathname)
    );
    allowedPaths.add(new URL(".", window.location.href).pathname);

    if (!requestedUrl) {
      return defaultUrl.href;
    }

    try {
      const targetUrl = new URL(requestedUrl, window.location.href);
      if (targetUrl.origin === window.location.origin && allowedPaths.has(targetUrl.pathname)) {
        return targetUrl.href;
      }
      console.warn("Das angeforderte Rücksprungziel wurde abgelehnt.");
    } catch (error) {
      console.warn("Das angeforderte Rücksprungziel ist ungültig.", error);
    }

    return defaultUrl.href;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      window.localStorage.setItem(consentKey, "accepted");
    } catch (error) {
      console.error("Die Zustimmung konnte nicht gespeichert werden.", error);
      status.textContent =
        "Dein Browser verhindert die lokale Speicherung. Bitte erlaube Website-Speicher und versuche es erneut.";
      status.classList.add("error");
      return;
    }

    window.location.replace(getReturnUrl());
  });
})();