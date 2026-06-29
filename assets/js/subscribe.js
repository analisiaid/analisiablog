const subscribeForm = document.getElementById('hero-subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[name="email"]').value;
    // Placeholder: POST to /api/subscribe once Worker is deployed
    alert('Thanks! Subscribe endpoint coming in Phase 2.');
  });
}
