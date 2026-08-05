// ===== BOOT SEQUENCE =====
const bootScreen = document.getElementById('boot-screen');
const bootLog = document.getElementById('boot-log');

const bootLines = [
  '> initializing system...',
  '> loading profile: VRITTI GARG',
  '> mounting module CREATIVE_OPS ... OK',
  '> mounting module SECURITY_OPS ... OK',
  '> status: ALL SYSTEMS OPERATIONAL',
  '> welcome.'
];

function skipBoot(){
  bootScreen.classList.add('hidden');
  document.removeEventListener('keydown', skipBoot);
  bootScreen.removeEventListener('click', skipBoot);
}

// If user has already seen boot this session, skip instantly
if (sessionStorage.getItem('bootSeen')) {
  bootScreen.classList.add('hidden');
} else {
  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function typeBoot(){
    if (lineIndex >= bootLines.length){
      bootLog.innerHTML = output + '<span class="cursor"></span>';
      setTimeout(skipBoot, 700);
      sessionStorage.setItem('bootSeen', '1');
      return;
    }
    const line = bootLines[lineIndex];
    if (charIndex <= line.length){
      bootLog.innerHTML = output + line.slice(0, charIndex) + '<span class="cursor"></span>';
      charIndex++;
      setTimeout(typeBoot, 18);
    } else {
      output += line + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeBoot, 120);
    }
  }
  typeBoot();

  document.addEventListener('keydown', skipBoot);
  bootScreen.addEventListener('click', skipBoot);
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const hudNav = document.querySelector('.hud-nav');
navToggle.addEventListener('click', () => {
  hudNav.classList.toggle('open');
});
document.querySelectorAll('.hud-nav a').forEach(link => {
  link.addEventListener('click', () => hudNav.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== SHARED TYPEWRITER HELPER =====
function typeInto(el, text, speed = 22, onDone) {
  el.innerHTML = '<span class="cursor"></span>';
  let i = 0;
  (function step() {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
      i++;
      setTimeout(step, speed);
    } else if (onDone) {
      onDone();
    }
  })();
}

// ===== FILE EXPLORER ACCORDION =====
function closeFileItem(item) {
  item.classList.remove('is-open');
  item.querySelector('.file-row').setAttribute('aria-expanded', 'false');
  item.querySelector('.file-body').style.maxHeight = null;
}

document.querySelectorAll('.file-list').forEach(list => {
  const items = list.querySelectorAll('.file-item');

  items.forEach(item => {
    const row = item.querySelector('.file-row');
    const body = item.querySelector('.file-body');
    const reading = item.querySelector('.file-reading');
    let hasTyped = false;

    function openFileItem() {
      item.classList.add('is-open');
      row.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
      if (reading && !hasTyped) {
        hasTyped = true;
        typeInto(reading, reading.dataset.text || '', 16);
      }
    }

    row.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach(other => { if (other !== item) closeFileItem(other); });
      if (isOpen) {
        closeFileItem(item);
      } else {
        openFileItem();
      }
    });

    // Keep expanded panel height correct if the window is resized
    window.addEventListener('resize', () => {
      if (item.classList.contains('is-open')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});

// ===== HERO ROLE TYPEWRITER =====
const typedRoleEl = document.getElementById('typed-role');
if (typedRoleEl) {
  const roles = ['Creative Technologist', 'Cybersecurity Builder', 'Digital Problem Solver'];
  let roleIndex = 0;

  function cycleRole() {
    const current = roles[roleIndex];
    let charIndex = 0;

    function typeForward() {
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex <= current.length) {
        charIndex++;
        setTimeout(typeForward, 45);
      } else {
        setTimeout(eraseBackward, 1600);
      }
    }
    function eraseBackward() {
      if (charIndex >= 0) {
        typedRoleEl.textContent = current.slice(0, charIndex);
        charIndex--;
        setTimeout(eraseBackward, 25);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(cycleRole, 300);
      }
    }
    typeForward();
  }
  cycleRole();
}