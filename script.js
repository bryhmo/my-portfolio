// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── MOBILE MENU ───
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.nav-burger');
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ─── PAYMENT ───
let selectedPayment = 'flutterwave';

function selectPayment(method) {
  selectedPayment = method;
  document.getElementById('opt-flutterwave').style.borderColor = method === 'flutterwave' ? 'var(--accent)' : 'var(--border)';
  document.getElementById('opt-paystack').style.borderColor = method === 'paystack' ? 'var(--accent)' : 'var(--border)';
}

selectPayment('flutterwave');

function initiatePayment() {
  const amount = document.getElementById('amount-input').value;
  const name = document.getElementById('payer-name').value;
  const email = document.getElementById('payer-email').value;

  if (!amount || amount < 1000) { alert('Please enter a valid amount (minimum ₦1,000)'); return; }
  if (!name) { alert('Please enter your name'); return; }
  if (!email) { alert('Please enter your email'); return; }

  if (selectedPayment === 'flutterwave') {
    alert(`Flutterwave payment of ₦${Number(amount).toLocaleString()} will be initiated.\n\nTo go live: Replace with your Flutterwave public key in the script.`);
    // FlutterwaveCheckout({
    //   public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    //   tx_ref: "TX-" + Date.now(),
    //   amount: amount,
    //   currency: "NGN",
    //   customer: { email, name },
    //   callback: (res) => console.log(res),
    // });
  } else {
    alert(`Paystack payment of ₦${Number(amount).toLocaleString()} will be initiated.\n\nTo go live: Replace with your Paystack public key in the script.`);
    // const handler = PaystackPop.setup({
    //   key: "YOUR_PAYSTACK_PUBLIC_KEY",
    //   email, amount: amount * 100,
    //   currency: "NGN",
    //   callback: (res) => console.log(res),
    // });
    // handler.openIframe();
  }
}

// ─── CONTACT FORM ───
function handleContactForm(e) {
  e.preventDefault();
  document.getElementById('form-success').style.display = 'block';
  e.target.reset();
  setTimeout(() => document.getElementById('form-success').style.display = 'none', 4000);
}

// ─── NAV SCROLL EFFECT ───
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.background =
    window.scrollY > 50 ? 'rgba(8,12,16,0.97)' : 'rgba(8,12,16,0.85)';
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
