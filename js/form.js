const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');

const rules = {
  name: (v) => v.trim().length >= 2 || 'Please enter your name (2+ characters).',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email.',
  message: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters.',
};

function validateField(field) {
  const result = rules[field.name](field.value);
  const wrapper = field.closest('.field');
  const errorEl = wrapper.querySelector('.error');

  if (result === true) {
    wrapper.classList.remove('invalid');
    errorEl.textContent = '';
    return true;
  }
  wrapper.classList.add('invalid');
  errorEl.textContent = result;
  return false;
}

form.addEventListener('input', (e) => {
  if (e.target.matches('input, textarea')) validateField(e.target);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const valid = fields.map(validateField).every(Boolean);

  if (!valid) {
    status.textContent = 'Please fix the errors above.';
    status.className = 'form-status error';
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio contact from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;

  status.textContent = 'Opening your email app…';
  status.className = 'form-status success';
  form.reset();
});