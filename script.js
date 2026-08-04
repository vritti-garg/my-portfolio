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
document.getElementById('year').textContent = new Date().getFullYear();