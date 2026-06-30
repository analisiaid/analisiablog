// Subscribe form handler — POSTs to /api/subscribe
(function() {
  'use strict';

  async function handleSubmit(form) {
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) return;

    if (submitBtn) submitBtn.disabled = true;

    try {
      const resp = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: nameInput ? nameInput.value.trim() : '',
        }),
      });

      const data = await resp.json();

      if (data.success) {
        form.innerHTML = '<div class="subscribe-success-msg">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="20 6 9 17 4 12"></polyline></svg>' +
          '<span>Thanks! Check your inbox.</span></div>';
      } else {
        showError(form, data.error || 'Something went wrong. Try again.');
      }
    } catch (err) {
      showError(form, 'Couldn\'t reach the server. Check your connection.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  function showError(form, msg) {
    var existing = form.querySelector('.subscribe-error');
    if (existing) existing.remove();

    var error = document.createElement('div');
    error.className = 'subscribe-error';
    error.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' +
      '<span>' + msg + '</span>';
    form.prepend(error);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var forms = document.querySelectorAll('.hero-form, .subscribe-cta-form, .subscribe-card');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit(form);
      });
    });
  });
})();
