/* ─────────────────────────────────────────────────────────────
   GoatCounter — pageview tracking and the footer visitor count

   SITE_CODE below is the goatcounter.com subdomain, so the site
   at https://airesearchgroup.goatcounter.com has the code
   "airesearchgroup".

   The footer count needs one setting turned on, at
   https://airesearchgroup.goatcounter.com/settings/main under
   the "Site settings" heading: the checkbox "Allow adding
   visitor counts on your website", just below the "Your site"
   field. Save the form afterwards. Without it the /counter/
   endpoint returns 403 and the footer stays as it is. Pageview
   tracking works either way.

   Until a valid code is set, nothing loads: no request to
   GoatCounter and no counter in the footer. The guard also skips
   local development, so testing does not pollute the statistics.

   GoatCounter sets no cookies and stores no IP addresses.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SITE_CODE = 'airesearchgroup';

  // A malformed or absent code would silently send data nowhere,
  // so check the shape rather than merely checking for a value.
  if (!/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/.test(SITE_CODE)) return;

  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '' || host.endsWith('.local')) return;

  var BASE = 'https://' + SITE_CODE + '.goatcounter.com';

  /* ── record this pageview ────────────────────────────────── */

  var s = document.createElement('script');
  s.async = true;
  s.setAttribute('data-goatcounter', BASE + '/count');
  s.src = 'https://gc.zgo.at/count.js';
  document.head.appendChild(s);

  /* ── show the running total in the footer ────────────────── */

  // The count only appears once a number arrives. A blocked or
  // failing request leaves the footer exactly as it was rather
  // than showing a broken or zero figure.
  function show(text) {
    var box = document.getElementById('visits');
    var out = document.getElementById('visits-n');
    if (!box || !out) return;
    out.textContent = text;
    box.hidden = false;
  }

  // TOTAL is GoatCounter's reserved path for the whole site.
  // count_unique is visitors; count is pageviews.
  //
  // Without a start date the endpoint counts today only, so the
  // footer sat at 1. START predates the site, which makes the
  // range the whole history.
  var START = '2020-01-01';

  fetch(BASE + '/counter/TOTAL.json?start=' + START)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (d) {
      var n = d.count_unique || d.count;
      // The API formats the number already, e.g. "12,481". Keep
      // only what a formatted count can contain.
      if (typeof n === 'string' && /^[0-9][0-9,. ]*$/.test(n)) show(n);
    })
    .catch(function () { /* leave the footer unchanged */ });
})();
