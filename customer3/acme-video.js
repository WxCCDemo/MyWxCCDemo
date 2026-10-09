(() => {
  const videoRequestUrl = 'https://yrirrlfmjjfzcvmkuzpl.supabase.co/functions/v1/video-request';
  // This is the project's public browser key. Instant Connect and WxCC
  // credentials remain private Supabase Edge Function secrets.
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaXJybGZtampmemN2bWt1enBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODk1MzQsImV4cCI6MjA2ODc2NTUzNH0.Iyn8te51bM2e3Pvdjrx3BkG14WcBKuqFhoIq2PSwJ8A';

  function showVideoModal() {
    if (document.getElementById('acmeVideoModal')) return;
    const modal = document.createElement('div');
    modal.id = 'acmeVideoModal';
    modal.className = 'acme-modal-backdrop';
    modal.innerHTML = `<section class="acme-modal acme-video-modal" role="dialog" aria-modal="true" aria-labelledby="video-request-title"><div class="acme-modal-header"><div><h2 id="video-request-title">Video Assistance</h2><p>Connect securely with an ACME Bank video agent.</p></div><button type="button" class="acme-icon-button" aria-label="Close">&times;</button></div><form class="acme-video-form"><label for="acme-video-name"><span>Name</span><input id="acme-video-name" name="customerName" autocomplete="name" maxlength="100" placeholder="Your full name" required></label><label for="acme-video-phone"><span>Mobile number</span><input id="acme-video-phone" name="customerPhone" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="e.g. +65 8741 4102" required></label><label for="acme-video-reason"><span>How can we help?</span><textarea id="acme-video-reason" name="reason" maxlength="250" rows="3" required>Video assistance requested</textarea></label><p class="acme-video-privacy">Your details are used only to route this request to an available agent.</p><button type="submit" class="acme-send-button">Request video call</button><div class="acme-video-result" aria-live="polite"></div></form></section>`;
    const closeButton = modal.querySelector('.acme-icon-button');
    const form = modal.querySelector('form');
    const submitButton = form.querySelector('.acme-send-button');
    const result = form.querySelector('.acme-video-result');
    const close = () => modal.remove();
    closeButton.addEventListener('click', close);
    modal.addEventListener('click', (event) => { if (event.target === modal) close(); });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = 'Creating secure meeting...';
      result.className = 'acme-video-result';
      result.replaceChildren();

      const formData = new FormData(form);
      const requestId = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `web-${Date.now()}`;

      try {
        const response = await fetch(videoRequestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            source: 'web',
            customerName: String(formData.get('customerName') || '').trim(),
            customerPhone: String(formData.get('customerPhone') || '').trim(),
            reason: String(formData.get('reason') || '').trim(),
            requestId
          })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const message = data.error === 'video_service_not_configured'
            ? 'Video assistance is being configured. Please try again shortly.'
            : 'We could not create the video request. Please try again.';
          throw new Error(message);
        }

        const guestUrl = new URL(data.guestUrl);
        if (guestUrl.protocol !== 'https:' || guestUrl.hostname !== 'instant.webex.com') {
          throw new Error('The secure meeting link was not valid. Please try again.');
        }

        const message = document.createElement('p');
        message.textContent = 'Your request is queued. Join the secure meeting and an agent will connect shortly.';
        const joinLink = document.createElement('a');
        joinLink.className = 'acme-primary-action acme-video-join';
        joinLink.href = guestUrl.toString();
        joinLink.target = '_blank';
        joinLink.rel = 'noopener noreferrer';
        joinLink.textContent = 'Join video call';
        result.classList.add('success');
        result.append(message, joinLink);
        submitButton.hidden = true;
        form.querySelectorAll('input, textarea').forEach((field) => { field.disabled = true; });
      } catch (error) {
        const message = document.createElement('p');
        const safeMessages = new Set([
          'Video assistance is being configured. Please try again shortly.',
          'We could not create the video request. Please try again.',
          'The secure meeting link was not valid. Please try again.'
        ]);
        message.textContent = safeMessages.has(error.message)
          ? error.message
          : 'Unable to request video assistance. Please try again.';
        result.classList.add('error');
        result.appendChild(message);
        submitButton.disabled = false;
        submitButton.textContent = 'Request video call';
      }
    });

    document.body.appendChild(modal);
    modal.querySelector('#acme-video-name').focus();
  }

  function addVideoContact() {
    const links = document.querySelector('#acmeContactSidebar .acme-contact-links');
    if (!links || links.querySelector('[data-contact-action="video"]')) return false;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'acme-contact-link acme-video-contact';
    button.dataset.contactAction = 'video';
    button.title = 'Video Assistance';
    button.innerHTML = `<span class="acme-video-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path d="M15 8.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.5l5 3V5.5l-5 3Z"/></svg></span><span>Video Assistance</span>`;
    button.addEventListener('click', showVideoModal);
    links.prepend(button);
    return true;
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (addVideoContact()) return;
    const observer = new MutationObserver(() => {
      if (addVideoContact()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
