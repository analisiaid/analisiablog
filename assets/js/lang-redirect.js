// Auto-locale redirect — runs once on first visit
(function () {
  var langCookie = '_analisia_lang';
  var cookies = document.cookie.split('; ').reduce(function (acc, c) {
    var parts = c.split('=');
    acc[parts[0]] = parts[1];
    return acc;
  }, {});

  if (cookies[langCookie]) return;

  // Only redirect on root path, not /en/ or any other page
  if (window.location.pathname !== '/' && window.location.pathname !== '') return;

  var lang = navigator.language || navigator.userLanguage || '';
  // If the browser language starts with 'id', stay at root (ID).
  // Otherwise redirect to /en/.
  if (lang.indexOf('id') !== 0) {
    document.cookie = langCookie + '=en; path=/; max-age=31536000; SameSite=Lax';
    window.location.href = '/en/';
  } else {
    document.cookie = langCookie + '=id; path=/; max-age=31536000; SameSite=Lax';
  }
})();
