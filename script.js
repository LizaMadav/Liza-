const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("hide"), 500);
});

// Smooth section navigation
$$("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.scroll);
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

// Floating hearts
function makeHeart() {
  const container = $("#hearts");
  if (!container) return;
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > .2 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 15}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 11000);
}
setInterval(makeHeart, 900);

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

// Music button — add your own legally obtained copy of alag-aasmaan.mp3
const audio = $("#ourSong");
const musicBtn = $("#musicBtn");

musicBtn?.addEventListener("click", async () => {
  if (!audio) return;
  try {
    if (audio.paused) {
      await audio.play();
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = "♫ <span>Playing our song</span>";
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = "♫ <span>Our song</span>";
    }
  } catch (err) {
    alert("Add your own 'alag-aasmaan.mp3' file to this website folder first, then tap the music button.");
  }
});

// Secret smooch memory
const secretBtn = $("#secretBtn");
const secretText = $("#secretText");

secretBtn?.addEventListener("click", () => {
  secretText.innerHTML = "You gave me my first little smooch on the lips... and then casually waved bye like you hadn't just completely ruined my ability to behave normally. 💋😂";
  secretBtn.textContent = "I remember it too ♥";
  burstHearts(14);
});

// Reasons popup
const reasonMessages = {
  "01": "Because your kindness feels effortless. You're genuinely one of the sweetest people I know.",
  "02": "You somehow manage to handle me, my moods, my overthinking and all the chaos that comes with loving me.",
  "03": "It's the caring little things — the gentle touch, the quiet concern, the way you make me feel safe.",
  "04": "The cheek, arm, waist touches... those tiny affectionate habits became some of my favourite things.",
  "05": "You love me in a way that makes me feel wanted, cared for and understood.",
  "06": "And yes, Sarvesh, you're ridiculously attractive. I said what I said. ♥"
};

$$(".reason").forEach(card => {
  card.addEventListener("click", () => {
    const popup = $("#reasonPopup");
    popup.textContent = reasonMessages[card.dataset.reason];
    popup.animate(
      [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 350, fill: "forwards" }
    );
  });
});

// Photo lightbox
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCaption = $("#lightboxCaption");

$$(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.img;
    lightboxCaption.textContent = card.dataset.caption;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}
$("#closeLightbox")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// Envelope letter
const envelope = $("#envelope");
const letterContent = $("#letterContent");

envelope?.addEventListener("click", () => {
  envelope.classList.toggle("open");
  if (envelope.classList.contains("open")) {
    setTimeout(() => {
      letterContent.classList.add("show");
      letterContent.scrollIntoView({ behavior: "smooth", block: "center" });
      burstHearts(12);
    }, 650);
  }
});

// Final surprise
const surprise = $("#surprise");
$("#foreverBtn")?.addEventListener("click", () => {
  surprise.classList.add("show");
  burstHearts(35);
});

$("#closeSurprise")?.addEventListener("click", () => {
  surprise.classList.remove("show");
});

surprise?.addEventListener("click", e => {
  if (e.target === surprise) surprise.classList.remove("show");
});

// Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
    surprise?.classList.remove("show");
  }
});

// Small celebration
function burstHearts(count = 10) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => makeHeart(), i * 70);
  }
}
