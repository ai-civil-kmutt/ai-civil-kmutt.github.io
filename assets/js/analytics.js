/* ─────────────────────────────────────────────────────────────
   Google Analytics 4

   Put the property's Measurement ID in MEASUREMENT_ID below. It
   looks like G-XXXXXXXXXX and is found under
   Admin -> Data streams -> your web stream.

   Until a valid id is set, nothing loads: no request to Google,
   no cookies, no consent question to answer. The guard also skips
   local development, so testing does not pollute the statistics.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var MEASUREMENT_ID = '';

  // A malformed or absent id would silently send data nowhere, so
  // check the shape rather than merely checking for a value.
  if (!/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID)) return;

  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '' || host.endsWith('.local')) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    anonymize_ip: true,
    // The site sets no advertising cookies and runs no ad features.
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(s);
})();
