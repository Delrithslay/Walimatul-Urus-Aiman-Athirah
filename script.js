
// --- Custom Toast Notification ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'bg-stone-800 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold toast-enter border border-stone-600';
  toast.innerText = message;
  container.appendChild(toast);
    
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s, transform 0.5s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// --- Intersection Observer for Scroll Animations ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// --- Intersection Observer for Scroll Animations ---

// --- Magical Explosion (Butterflies & Petals) ---
function triggerMagicalExplosion() {
  const container = document.body;
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 30 : 60;
    
  for (let i = 0; i < count; i++) {
    const item = document.createElement('div');
    const isButterfly = Math.random() > 0.4;
    item.className = 'magical-item burst ' + (isButterfly ? 'butterfly' : 'petal');
    if (isButterfly) {
      item.innerHTML = ['🦋', '✨', '🌸'][Math.floor(Math.random() * 3)];
    }
    const distMultiplier = isMobile ? 400 : 800;
    const moveX = (Math.random() - 0.5) * distMultiplier;
    const moveY = (Math.random() - 0.5) * distMultiplier;
    item.style.setProperty('--move-x', moveX + 'px');
    item.style.setProperty('--move-y', moveY + 'px');
    item.style.setProperty('--rot', Math.random() * 720 + 'deg');
    item.style.left = '50%'; item.style.top = '50%';
    if (!isButterfly) {
      item.style.backgroundColor = ['#ffcdd2', '#fce4ec', '#f8bbd0'][Math.floor(Math.random() * 3)];
      item.style.width = isMobile ? '8px' : '12px'; 
      item.style.height = isMobile ? '8px' : '12px';
    }
    container.appendChild(item);
    setTimeout(() => item.remove(), 3000);
  }
}

function openInvitation() {
  document.getElementById('envelope-overlay').classList.add('opened');
  // Aktifkan scroll pada body selepas kad dibuka
  document.body.style.overflowY = 'auto';
  startMusic();
  triggerMagicalExplosion();
    
  // Start continuous petal rain
  setInterval(createPetal, 900);
  // Start continuous butterfly spawn
  setInterval(createButterfly, 2500); 
  // Trigger Dove Animation (Burung Merpati)
  triggerDoves();
}

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'magical-item petal';
  const size = Math.random() * 8 + 6;
  petal.style.width = size + 'px'; petal.style.height = size + 'px';
  petal.style.left = Math.random() * window.innerWidth + 'px'; petal.style.top = '-20px';
  const duration = Math.random() * 3 + 4; // Faster duration: 4s to 7s
  petal.style.animation = `fall ${duration}s linear forwards`;
  petal.style.backgroundColor = ['#ffcdd2', '#fce4ec', '#f8bbd0'][Math.floor(Math.random() * 3)];
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}

function createButterfly() {
  // Create a butterfly element that follows a smooth Bezier path
  const butterfly = document.createElement('div');
  butterfly.className = 'magical-item butterfly-anim flap';
  butterfly.innerHTML = '🦋';
  document.body.appendChild(butterfly);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Start from left or right off-screen
  const fromLeft = Math.random() > 0.5;
  const start = { x: fromLeft ? -60 : vw + 60, y: Math.random() * vh * 0.5 + 50 };
  const end = { x: vw * (0.2 + Math.random() * 0.6), y: Math.random() * vh * 0.6 + 50 };

  // Control points for a smooth curvy path
  const cp1 = { x: start.x + (fromLeft ? 100 : -100) + (Math.random() - 0.5) * 200, y: start.y - 60 + (Math.random() - 0.5) * 120 };
  const cp2 = { x: end.x + (fromLeft ? -100 : 100) + (Math.random() - 0.5) * 200, y: end.y - 60 + (Math.random() - 0.5) * 120 };

  const duration = 8000 + Math.random() * 7000; // 8s - 15s
  const startTime = performance.now();

  function cubic(t, p0, p1, p2, p3) {
    const u = 1 - t;
    return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
  }

  function cubicDeriv(t, p0, p1, p2, p3) {
    const u = 1 - t;
    return 3*u*u*(p1 - p0) + 6*u*t*(p2 - p1) + 3*t*t*(p3 - p2);
  }

  let rafId = null;
  function frame(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const x = cubic(t, start.x, cp1.x, cp2.x, end.x);
    const y = cubic(t, start.y, cp1.y, cp2.y, end.y);

    // orientation based on derivative
    const dx = cubicDeriv(t, start.x, cp1.x, cp2.x, end.x);
    const dy = cubicDeriv(t, start.y, cp1.y, cp2.y, end.y);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    butterfly.style.left = (x - 12) + 'px';
    butterfly.style.top = (y - 12) + 'px';
    butterfly.style.transform = `rotate(${angle}deg)`;

    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      butterfly.remove();
      if (rafId) cancelAnimationFrame(rafId);
    }
  }

  rafId = requestAnimationFrame(frame);
}

function triggerDoves() {
  const count = 5; // Bilangan burung
  for(let i=0; i<count; i++) {
    setTimeout(() => {
      const dove = document.createElement('div');
      dove.classList.add('magical-item');
      dove.innerHTML = '🕊️';
      dove.style.fontSize = (Math.random() * 20 + 20) + 'px';
      dove.style.zIndex = '160';
            
      // Arah rawak: Kiri ke Kanan atau Kanan ke Kiri
      const startLeft = Math.random() > 0.5;
      if(startLeft) {
        dove.style.animation = `flyRight ${Math.random() * 3 + 4}s linear forwards`;
        dove.style.left = '-50px';
        dove.style.top = (Math.random() * 50 + 50) + 'vh';
      } else {
        dove.style.animation = `flyLeft ${Math.random() * 3 + 4}s linear forwards`;
        dove.style.left = '100vw';
        dove.style.top = (Math.random() * 50 + 50) + 'vh';
      }
            
      document.body.appendChild(dove);
      setTimeout(() => dove.remove(), 8000);
    }, i * 500);
  }
}

// --- Border leaves: spawn leaves along the envelope card border and drift them away ---
function spawnBorderLeaf(parent) {
  const leaf = document.createElement('div');
  // choose a leaf art variant: fern, vine, or simple leaf
  const variant = Math.random();
  if (variant < 0.35) leaf.className = 'leaf fern wobble';
  else if (variant < 0.7) leaf.className = 'leaf vine wobble';
  else leaf.className = 'leaf leaf-img wobble';

  // Choose a random side: top, right, bottom, left
  const side = ['top','right','bottom','left'][Math.floor(Math.random()*4)];
  const rect = parent.getBoundingClientRect();

  let startX, startY;
  if (side === 'top') {
    startX = Math.random() * rect.width;
    startY = -8;
  } else if (side === 'bottom') {
    startX = Math.random() * rect.width;
    startY = rect.height - 12;
  } else if (side === 'left') {
    startX = -12;
    startY = Math.random() * rect.height;
  } else { // right
    startX = rect.width - 8;
    startY = Math.random() * rect.height;
  }

  // Place relative to parent
  leaf.style.left = startX + 'px';
  leaf.style.top = startY + 'px';

  // Movement vector: biased outward from card center
  const centerX = rect.width/2; const centerY = rect.height/2;
  const dirX = startX - centerX + (Math.random()-0.5)*80;
  const dirY = startY - centerY - (50 + Math.random()*120);

  // set CSS vars for keyframes
  leaf.style.setProperty('--end-x', (dirX + (Math.random()-0.5)*40) + 'px');
  leaf.style.setProperty('--end-y', (dirY + (Math.random()-0.5)*40) + 'px');
  leaf.style.setProperty('--mid-x', (dirX*0.4 + (Math.random()-0.5)*40) + 'px');
  leaf.style.setProperty('--mid-y', (dirY*0.3 + (Math.random()-0.5)*20) + 'px');
  leaf.style.setProperty('--rot', (Math.random()>0.5?1:-1) * (180 + Math.random()*360) + 'deg');

  const dur = 4000 + Math.random()*3000;
  leaf.style.animation = `leafDrift ${dur}ms cubic-bezier(.2,.8,.2,1) forwards`;

  parent.appendChild(leaf);
  // remove after animation finishes
  setTimeout(()=> leaf.remove(), dur + 200);
}

function startBorderLeaves() {
  const parent = document.querySelector('.envelope-card');
  if (!parent) return;
  // spawn an initial group
  for (let i=0;i<6;i++) setTimeout(()=> spawnBorderLeaf(parent), i*400);
  // periodic gentle spawns
  return setInterval(()=> spawnBorderLeaf(parent), 3000 + Math.random()*3000);
}

// start leaf spawns while envelope overlay is visible
let _leafInterval = null;
document.addEventListener('DOMContentLoaded', ()=>{
  const overlay = document.getElementById('envelope-overlay');
  if (overlay) {
    // spawn leaves on load
    _leafInterval = startBorderLeaves();
  }
});

// --- Audio Logic ---
const audio = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

function startMusic() {
  audio.play().then(() => {
    isPlaying = true;
    updateMusicIcon();
  }).catch(e => {
    console.log("Audio autoplay prevented. User interaction required.");
  });
}

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updateMusicIcon();
}

function updateMusicIcon() {
  if (isPlaying) {
    musicIcon.classList.add('text-amber-600');
    musicIcon.classList.remove('text-stone-400');
    // Optional: add spin effect logic here if desired
  } else {
    musicIcon.classList.remove('text-amber-600');
    musicIcon.classList.add('text-stone-400');
  }
}

// --- Countdown alarm (beep) using Web Audio API ---
const alarmThresholdSec = 5; // seconds before target to start alarms
let _audioCtx = null;
let _alarmActive = false;
let _alarmIntervalId = null;

function ensureAudioContext() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('WebAudio not supported:', e);
    }
  }
  return _audioCtx;
}

function playBeep(freq = 880, duration = 0.18) {
  const ctx = ensureAudioContext();
  if (!ctx) return;
  // resume context if suspended (user interaction required in some browsers)
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + duration + 0.02);
}

function startAlarmLoop() {
  if (_alarmActive) return;
  _alarmActive = true;
  // beep immediately, then every 1s
  playBeep(880, 0.18);
  _alarmIntervalId = setInterval(() => playBeep(880, 0.18), 1000);
}

function stopAlarmLoop() {
  _alarmActive = false;
  if (_alarmIntervalId) { clearInterval(_alarmIntervalId); _alarmIntervalId = null; }
}

// =========================================================================
// Image loading: try `assets/images/index.json` first (recommended),
// otherwise probe sequential filenames like assets/images/1.jpg, 2.jpg, ...
// NOTE: probing requires a web server (fetch/HEAD won't work over file:// in many browsers).
// =========================================================================

const SUMBER_ASSETS = {
  slideshow: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&w=800&q=80"
  ]
};

let slideImages = [];
let currentSlide = 0;

async function fetchJsonIfExists(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function probeNumberedImages(limit = 100, stopAfterMisses = 8) {
  const exts = ['jpg','jpeg','png','webp','gif'];
  const found = [];
  let consecutiveMiss = 0;
  for (let i = 1; i <= limit && consecutiveMiss < stopAfterMisses; i++) {
    let hit = false;
    for (const ext of exts) {
      const path = `assets/images/${i}.${ext}`;
      try {
        const res = await fetch(path, { method: 'HEAD' });
        if (res.ok) { found.push(path); hit = true; break; }
      } catch (e) {
        // fetch may fail on file:// or CORS; ignore and continue
      }
    }
    if (hit) consecutiveMiss = 0; else consecutiveMiss++;
  }
  return found;
}

async function findImagesInAssets() {
  // 1) index.json / manifest recommended
  const manifest = await fetchJsonIfExists('assets/images/index.json') || await fetchJsonIfExists('assets/images/manifest.json');
  // If manifest explicitly requests clear, return empty list
  if (manifest && typeof manifest === 'object' && manifest.clear === true) return [];
  if (manifest && Array.isArray(manifest) && manifest.length) return manifest;

  // 2) probe numbered filenames (1.jpg, 2.jpg, ...)
  const probed = await probeNumberedImages(100, 8);
  if (probed.length) return probed;

  // 3) fallback to bundled remote assets
  return SUMBER_ASSETS.slideshow;
}

function changeSlide(direction) {
  if (!slideImages || slideImages.length === 0) return;
  currentSlide += direction;
  if (currentSlide >= slideImages.length) currentSlide = 0;
  else if (currentSlide < 0) currentSlide = slideImages.length - 1;
  document.getElementById('slideshowImage').src = slideImages[currentSlide];
}

async function initImagesAndGallery() {
  const images = await findImagesInAssets();
  slideImages = images.slice();
  // show first slide (slideshow only) — gallery/live-feed disabled
  const slideEl = document.getElementById('slideshowImage');
  if (slideEl) slideEl.src = slideImages[0] || '';
}

// start image discovery
initImagesAndGallery();

// --- Countdown Timer ---
const targetDate = new Date("Oct 3, 2026 11:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) {
    // countdown finished
    stopAlarmLoop();
    document.getElementById("days").innerText = '00';
    document.getElementById("hours").innerText = '00';
    document.getElementById("minutes").innerText = '00';
    document.getElementById("seconds").innerText = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, '0');
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

  // Trigger alarm loop when remaining seconds reach threshold
  const remainingSec = Math.ceil(distance / 1000);
  if (remainingSec <= alarmThresholdSec && remainingSec > 0) {
    startAlarmLoop();
  } else {
    stopAlarmLoop();
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Live feed / gallery upload features removed: guest image upload and on-site gallery disabled.
// Slideshow asset discovery and slideshow functionality remain unchanged.

// --- RSVP Combined ---
import { saveRSVP } from './firebase-init.js';

document.getElementById('rsvpFormCombined').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('rsvpName').value.trim();
  const wish = document.getElementById('rsvpWish').value.trim();
  const count = document.getElementById('rsvpCount').value;

  // Optimistically add to UI
  const card = document.createElement('div');
  card.className = 'bg-pink-50 p-4 md:p-5 rounded-2xl border border-pink-100 mb-4 toast-enter shadow-sm';
  card.innerHTML = `<p class="font-bold text-amber-800 text-[11px] md:text-sm">${name} (${count} pax)</p><p class="text-stone-600 mt-1 italic text-[10px] md:text-xs leading-relaxed">"${wish}"</p>`;
  document.getElementById('wishesContainer').prepend(card);

  showToast(`Mencuba menyimpan maklum balas anda...`);

  try {
    const res = await saveRSVP({ name, count, wish });
    showToast(`Terima kasih ${name}! Maklum balas disimpan (id: ${res.id}).`);
    this.reset();
  } catch (err) {
    console.error('Failed saving RSVP:', err);
    showToast('Terdapat masalah menyimpan maklum balas — cuba lagi.');
    // leave the optimistic card so user doesn't lose text; optionally mark failed
    card.classList.add('opacity-60');
  }
});

// Expose commonly-used functions to the global `window` so inline HTML
// `onclick` attributes continue to work when this script is loaded as a module.
// Inline handlers in `index.html` call `openInvitation()`, `toggleMusic()` and
// `changeSlide(...)` so expose those here.
try {
  window.openInvitation = openInvitation;
  window.toggleMusic = toggleMusic;
  window.changeSlide = changeSlide;
} catch (e) {
  // If `window` is not writable for some reason, silently ignore.
}

// Image viewer functionality removed — clicking slideshow no longer opens a modal.

