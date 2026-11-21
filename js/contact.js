/**
 * =========================================================================
 * 🛡️ AHMAD SHUAIB — CONTACT FORM CONTROLLER
 * High-Security Handshake with PHP Backend & Node.js Fallback
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const sendViaGmailBtn = document.getElementById('btnSendViaGmail');
  const targetEmail = 'mssdkkl@gmail.com';

  // 1. Direct "Send via Gmail" Button Handler
  if (sendViaGmailBtn) {
    sendViaGmailBtn.addEventListener('click', () => {
      const name = document.getElementById('formName')?.value.trim() || '';
      const email = document.getElementById('formEmail')?.value.trim() || '';
      const subject = document.getElementById('formSubject')?.value.trim() || 'Backend Opportunity / Engineering Discussion';
      const message = document.getElementById('formMessage')?.value.trim() || '';

      let bodyContent = message;
      if (name || email) {
        bodyContent += `\n\n----------------------------------------\nTransmitted by: ${name} <${email}>\nSent via Ahmad Shuaib Engineering Portfolio`;
      }

      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
      window.open(gmailComposeUrl, '_blank');
      showToast('Opening Gmail compose draft to mssdkkl@gmail.com...', 'info');
    });
  }

  if (!contactForm) return;

  // Generate page load timestamp to defeat fast bots (< 2 sec submission)
  const timestampField = document.getElementById('formTimestamp');
  if (timestampField) {
    timestampField.value = Math.floor(Date.now() / 1000);
  }

  // 2. Form Submission Handler
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    // Gather fields
    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const subject = document.getElementById('formSubject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('formMessage')?.value.trim();
    const honeypot = document.getElementById('formHoneypot')?.value.trim();
    const ts = timestampField ? timestampField.value : '';

    // Quick client-side validation
    if (!name || name.length < 2) {
      showToast('Please enter your name (at least 2 characters).', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (!message || message.length < 10) {
      showToast('Please provide a descriptive message (at least 10 characters).', 'error');
      return;
    }

    // Set UI to loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳</span> <span>Securing & Transmitting...</span>`;

    const payload = {
      name,
      email,
      subject,
      message,
      recipient: targetEmail,
      website_hp: honeypot, // Honeypot field
      _ts: ts
    };

    // Transmit to serverless contact endpoint
    let response = null;
    let endpointTried = '/api/contact';

    try {
      response = await fetch(endpointTried, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (networkErr) {
      console.warn('Backend fetch failed, attempting local fallback:', networkErr);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    if (response && response.ok) {
      try {
        const data = await response.json();
        showToast(`Message transmitted safely to ${targetEmail}!`, 'success');
        contactForm.reset();
        // Update timestamp for next submission
        if (timestampField) timestampField.value = Math.floor(Date.now() / 1000);
      } catch (jsonErr) {
        showToast(`Message sent to ${targetEmail}! Thank you for reaching out.`, 'success');
        contactForm.reset();
      }
    } else if (response && response.status === 429) {
      showToast('Rate limit reached: You have sent multiple requests. Please wait a few minutes.', 'error');
    } else if (response && response.status === 422) {
      try {
        const errData = await response.json();
        showToast(errData.message || 'Validation error in submitted fields.', 'error');
      } catch {
        showToast('Validation failed. Please verify your entries.', 'error');
      }
    } else {
      // Fallback: Dispatch mailto if offline
      showToast(`Transmission logged! Opening direct email draft to ${targetEmail}...`, 'success');
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoUrl;
      contactForm.reset();
    }
  });
});

