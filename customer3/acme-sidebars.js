(() => {
  const base = '/MyWxCCDemo';
  const whatsappUrl = 'https://wa.me/12076803454?text=hi';
  const phoneLookup = { Christopher: '6587414102', Shailesh: '6598250480', Joshua: '6591438487', Grace: '6587832760' };
  const templateCopy = {
    Notification: 'Hi {name}, ACME Bank has an important update for you. Reply here to continue with our Contact Center on WhatsApp.',
    Offer: 'Hi {name}, ACME Bank has a new offer available for you. Reply here to connect with our Contact Center on WhatsApp.',
    Reminder: 'Hi {name}, this is an ACME Bank reminder. Reply here if you would like help from our Contact Center on WhatsApp.',
    Chat: 'Hi {name}, tap here to continue your conversation with ACME Bank Contact Center on WhatsApp.'
  };
  const webhookUrls = { sg: 'https://hooks.sg.webexconnect.io/events/CSWMWVJ81X', us: 'https://hooks.us.webexconnect.io/events/K2PYR77SOP' };

  function asset(path) { return `${base}/assets/${path}`; }
  function customer3(path) { return `${base}/customer3/${path}`; }

  function replaceBrandLogo(attempts = 0) {
    const brand = [...document.querySelectorAll('nav span')].find((node) => node.textContent.trim() === 'ACME Bank');
    if (brand) {
      const logo = document.createElement('img');
      logo.src = asset('ACME%20Bank.jpg');
      logo.alt = 'ACME Bank';
      logo.className = 'acme-brand-logo';
      brand.replaceWith(logo);
      return;
    }
    if (attempts < 80) window.setTimeout(() => replaceBrandLogo(attempts + 1), 100);
  }

  function showQrModal() {
    if (document.getElementById('acmeQrModal')) return;
    const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(whatsappUrl)}`;
    const modal = document.createElement('div');
    modal.id = 'acmeQrModal';
    modal.className = 'acme-modal-backdrop';
    modal.innerHTML = `
      <section class="acme-modal" role="dialog" aria-modal="true" aria-labelledby="whatsapp-qr-title">
        <div class="acme-modal-header">
          <h2 id="whatsapp-qr-title">WhatsApp Chat</h2>
          <button type="button" class="acme-icon-button" aria-label="Close">&times;</button>
        </div>
        <div class="acme-qr-content">
          <img src="${qrImage}" alt="WhatsApp chat QR code">
          <p>Scan this QR code to start a WhatsApp chat.</p>
          <a class="acme-primary-action" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
        </div>
      </section>`;
    modal.addEventListener('click', (event) => { if (event.target === modal) modal.remove(); });
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  }

  function addContactSidebar() {
    if (document.getElementById('acmeContactSidebar')) return;
    const sidebar = document.createElement('aside');
    sidebar.id = 'acmeContactSidebar';
    sidebar.className = 'acme-contact-sidebar';
    sidebar.setAttribute('aria-label', 'Contact options');
    sidebar.innerHTML = `
      <button type="button" class="acme-contact-header" aria-expanded="false">
        <span class="acme-contact-icon"><img src="${asset('ContactUs.png')}" alt=""></span>
        <span class="acme-contact-title">Contact Us</span>
      </button>
      <div class="acme-contact-links">
        <a class="acme-contact-link" href="tel:+6560478485" title="Call Us"><img src="${asset('Phone.jpg')}" alt=""><span>+65 6047 8485</span></a>
        <button type="button" class="acme-contact-link" title="WhatsApp QR"><img src="${asset('contact-us-whatsapp.jpeg')}" alt=""><span>+1 (207) 680-3454</span></button>
        <a class="acme-contact-link" href="mailto:cxdemosc@gmail.com" title="Email"><img src="${asset('contact-us-email.jpg')}" alt=""><span>sc01customer@gmail.com</span></a>
        <a class="acme-contact-link" href="#" title="Office Address"><img src="${asset('adresspin.png')}" alt=""><span>80, Pasir Panjang Road</span></a>
        <a class="acme-contact-link" href="https://www.webex.ai/" target="_blank" rel="noopener noreferrer" title="Webex AI"><img src="${asset('webex-logo.png')}" alt=""><span>Webex</span></a>
      </div>`;
    const header = sidebar.querySelector('.acme-contact-header');
    header.addEventListener('click', () => {
      const expanded = sidebar.classList.toggle('expanded');
      header.setAttribute('aria-expanded', String(expanded));
    });
    sidebar.querySelector('button.acme-contact-link').addEventListener('click', showQrModal);
    document.body.appendChild(sidebar);
  }

  function addNotificationSidebar() {
    if (document.getElementById('notificationSidebarIconTrigger')) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <button id="notificationSidebarIconTrigger" type="button" class="acme-notification-trigger" aria-label="Open proactive notification" aria-expanded="false">
        <img src="${asset('informationicon.png')}" alt="">
      </button>
      <div class="acme-notification-scrim"></div>
      <aside class="acme-notification-panel" aria-label="Proactive notification">
        <div class="acme-notification-header"><h2>Proactive Notification</h2><button type="button" class="acme-icon-button light" aria-label="Close">&times;</button></div>
        <form class="acme-notification-form">
          <label for="acme-notification-region"><span>Region</span><select id="acme-notification-region"><option value="sg">Singapore</option><option value="us">USA</option></select></label>
          <label for="acme-notification-customer"><span>Customer</span><select id="acme-notification-customer" required><option value="" disabled selected>Select Customer</option>${Object.keys(phoneLookup).map((name) => `<option value="${name}">${name}</option>`).join('')}</select></label>
          <label for="acme-notification-phone"><span>Phone Number</span><input id="acme-notification-phone" placeholder="Auto-filled" readonly></label>
          <label for="acme-notification-channel"><span>Channel</span><input id="acme-notification-channel" value="WhatsApp" readonly></label>
          <label for="acme-notification-template"><span>Template</span><select id="acme-notification-template" required><option value="" disabled selected>Select Template</option>${Object.keys(templateCopy).map((name) => `<option value="${name}">${name}</option>`).join('')}</select></label>
          <div><span class="acme-form-label">Preview</span><div class="acme-notification-preview">Select a customer and template to preview the WhatsApp notification.</div></div>
          <button type="submit" class="acme-send-button" disabled>Send WhatsApp Notification</button>
        </form>
      </aside>`;
    document.body.append(...wrapper.children);
    const trigger = document.getElementById('notificationSidebarIconTrigger');
    const scrim = document.querySelector('.acme-notification-scrim');
    const panel = document.querySelector('.acme-notification-panel');
    const closeButton = panel.querySelector('.acme-icon-button');
    const form = panel.querySelector('form');
    const region = document.getElementById('acme-notification-region');
    const customer = document.getElementById('acme-notification-customer');
    const phone = document.getElementById('acme-notification-phone');
    const template = document.getElementById('acme-notification-template');
    const preview = panel.querySelector('.acme-notification-preview');
    const sendButton = panel.querySelector('.acme-send-button');

    function openPanel(open) {
      panel.classList.toggle('open', open);
      scrim.classList.toggle('visible', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
    function updateForm() {
      phone.value = phoneLookup[customer.value] || '';
      preview.textContent = customer.value && template.value ? templateCopy[template.value].replace('{name}', customer.value) : 'Select a customer and template to preview the WhatsApp notification.';
      sendButton.disabled = !(customer.value && template.value);
      panel.querySelector('.acme-form-status')?.remove();
    }
    trigger.addEventListener('click', () => openPanel(true));
    closeButton.addEventListener('click', () => openPanel(false));
    scrim.addEventListener('click', () => openPanel(false));
    customer.addEventListener('change', updateForm);
    template.addEventListener('change', updateForm);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sendButton.disabled) return;
      sendButton.disabled = true;
      sendButton.textContent = 'Sending...';
      panel.querySelector('.acme-form-status')?.remove();
      const status = document.createElement('p');
      status.className = 'acme-form-status';
      try {
        const response = await fetch(webhookUrls[region.value] || webhookUrls.sg, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ Name: customer.value, Phone: phone.value, channel: 'WhatsApp', messageType: template.value }) });
        const bodyText = await response.text();
        let data = {};
        try { data = bodyText ? JSON.parse(bodyText) : {}; } catch { data = { message: bodyText }; }
        const result = String(data.status || data.Status || data.result || data.state || '').toLowerCase();
        const message = data.message || data.Message || data.error || data.Error;
        status.classList.add(!response.ok || result.includes('fail') ? 'warning' : result.includes('error') ? 'error' : 'success');
        status.textContent = message || (status.classList.contains('success') ? `WhatsApp notification sent to ${customer.value}. Waiting for customer to respond...` : 'Failed to send WhatsApp notification. Please try again.');
      } catch {
        status.classList.add('error');
        status.textContent = 'Error sending WhatsApp notification. Please check the webhook or network connection.';
      } finally {
        form.appendChild(status);
        sendButton.textContent = 'Send WhatsApp Notification';
        updateForm();
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    replaceBrandLogo();
    addContactSidebar();
    addNotificationSidebar();
  });
})();
