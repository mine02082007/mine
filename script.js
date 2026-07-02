const CONFIG = {
  senderName: "Baby Shivu😘😘",
  recipientName: "Mera Baccha 🥹😙",
  correctBirthday: "2026-05-16",
  enableMusic: true
};

const params = new URLSearchParams(window.location.search);
const senderName = params.get("from") || CONFIG.senderName;
const recipientName = params.get("to") || CONFIG.recipientName;
const correctBirthday = params.get("birthday") || CONFIG.correctBirthday;

document.querySelectorAll("[data-sender]").forEach((element) => {
  element.textContent = senderName;
});

document.querySelectorAll("[data-recipient]").forEach((element) => {
  element.textContent = recipientName;
});

// Story navigation
const pages = [...document.querySelectorAll(".story-page")];
const progress = document.getElementById("storyProgress");
let currentPage = 0;

pages.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "progress-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to page ${index + 1}`);
  dot.addEventListener("click", () => {
    if (index === 0 || currentPage > 0) showPage(index);
  });
  progress.appendChild(dot);
});

function showPage(index) {
  const safeIndex = Math.max(0, Math.min(index, pages.length - 1));

  pages.forEach((page, pageIndex) => {
    page.classList.toggle("active", pageIndex === safeIndex);
  });

  [...progress.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === safeIndex);
  });

  currentPage = safeIndex;

  if (currentPage === 1) {
    const letter = document.getElementById("paperLetter");
    letter.classList.remove("animate");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => letter.classList.add("animate"));
    });
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".next-page").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage + 1));
});

document.querySelectorAll(".prev-page").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage - 1));
});

showPage(0);

// Birthday heart unlock
const birthdayForm = document.getElementById("birthdayForm");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const birthdayStatus = document.getElementById("birthdayStatus");
const heartInputWrap = document.getElementById("heartInputWrap");
const overlay = document.getElementById("heartOpeningOverlay");

[dayInput, monthInput, yearInput].forEach((input, index, inputs) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    if (input.value.length === input.maxLength && inputs[index + 1]) {
      inputs[index + 1].focus();
    }
  });
});

birthdayForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const day = dayInput.value.padStart(2, "0");
  const month = monthInput.value.padStart(2, "0");
  const year = yearInput.value.padStart(4, "0");
  const enteredDate = `${year}-${month}-${day}`;

  if (enteredDate === correctBirthday) {
    birthdayStatus.textContent = "Mere dil me ghusne ka raaj bas tumhe hi pata hai  ♥";
    birthdayStatus.style.color = "#a84f73";
    softVibrate([50, 35, 90]);
    playSuccessChime();

    overlay.classList.remove("hidden");

    setTimeout(() => {
      showPage(1);
    }, 1700);

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 2600);
  } else {
    birthdayStatus.textContent = "Me galat tha 🥺😭! mujhe laga tumhe meri pasandida chij ki date pata hogi ♡";
    birthdayStatus.style.color = "#b34f72";
    heartInputWrap.classList.remove("shake");
    requestAnimationFrame(() => heartInputWrap.classList.add("shake"));
    softVibrate(35);
  }
});

// Photo carousel
const photoSlides = [...document.querySelectorAll(".photo-slide")];
const photoDots = document.getElementById("photoDots");
const photoStage = document.getElementById("photoStage");
let photoIndex = 0;
let dragStartX = null;

photoSlides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "photo-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show photo ${index + 1}`);
  dot.addEventListener("click", () => showPhoto(index));
  photoDots.appendChild(dot);
});

function showPhoto(index) {
  photoIndex = (index + photoSlides.length) % photoSlides.length;

  photoSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === photoIndex);
  });

  [...photoDots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === photoIndex);
  });
}

document.getElementById("photoPrev").addEventListener("click", () => showPhoto(photoIndex - 1));
document.getElementById("photoNext").addEventListener("click", () => showPhoto(photoIndex + 1));

photoStage.addEventListener("pointerdown", (event) => {
  dragStartX = event.clientX;
});

photoStage.addEventListener("pointerup", (event) => {
  if (dragStartX === null) return;
  const distance = event.clientX - dragStartX;

  if (Math.abs(distance) > 45) {
    showPhoto(distance > 0 ? photoIndex - 1 : photoIndex + 1);
  }

  dragStartX = null;
});

showPhoto(0);

// Final proposal
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const proposalArea = document.getElementById("proposalButtonArea");
const proposalMessage = document.getElementById("proposalMessage");
const proposalContent = document.getElementById("proposalContent");
const successView = document.getElementById("successView");
const celebrationLayer = document.getElementById("celebrationLayer");

const noMessages = [
  "Bahut khoob mera dil bas tumhare isi jawaab ka wait kar raha tha 😍.",
  "Aew ! ye no butto to loyal hai  mere liye  🙈",
  "Mujhe lagta hai yes kahna hai tumhe 🥹 ♥",
  "NO chutti par hai  🌷",
  "Ab to jhelna hi padega 🥺🥺 ✨",
  "Phir se soch lo 🥺 mera tumhare alawa koi nhi hai 😭"
];

let noAttempts = 0;

function moveNoButton(event) {
  if (event) event.preventDefault();

  noAttempts += 1;
  proposalMessage.textContent = noMessages[(noAttempts - 1) % noMessages.length];

  const areaRect = proposalArea.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const padding = 8;

  const maxX = Math.max(0, areaRect.width - buttonRect.width - padding * 2);
  const maxY = Math.max(0, areaRect.height - buttonRect.height - padding * 2);

  let x = padding + Math.random() * maxX;
  let y = padding + Math.random() * maxY;

  const yesRelative = {
    left: yesRect.left - areaRect.left,
    top: yesRect.top - areaRect.top,
    right: yesRect.right - areaRect.left,
    bottom: yesRect.bottom - areaRect.top
  };

  const overlapsYes =
    x < yesRelative.right + 14 &&
    x + buttonRect.width > yesRelative.left - 14 &&
    y < yesRelative.bottom + 14 &&
    y + buttonRect.height > yesRelative.top - 14;

  if (overlapsYes) {
    x = x < areaRect.width / 2 ? padding : Math.max(padding, maxX);
    y = y < areaRect.height / 2 ? padding : Math.max(padding, maxY);
  }

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;

  const scale = Math.min(1 + noAttempts * 0.1, 1.65);
  yesButton.style.transform = `scale(${scale})`;

  softVibrate(25);
}

["pointerenter", "pointerdown", "touchstart", "click"].forEach((eventName) => {
  noButton.addEventListener(eventName, moveNoButton, { passive: false });
});

yesButton.addEventListener("click", () => {
  proposalContent.classList.add("hidden");
  successView.classList.remove("hidden");
  createCelebration();
  playSuccessChime();
  softVibrate([80, 45, 120]);
});

document.getElementById("restartButton").addEventListener("click", () => {
  successView.classList.add("hidden");
  proposalContent.classList.remove("hidden");
  noAttempts = 0;
  proposalMessage.textContent =
    "Mera dil or me hamesa hamesa tumhare hi hai bas tumhe accept karna hai mujhe apne dil me ghus jane do 🫠🫣🫣.";
  yesButton.style.transform = "";
  noButton.style.left = "18%";
  noButton.style.top = "78px";
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  birthdayStatus.textContent = "YE bah date hai jo mene meri har jagah apply ki hui hai 😘🥹 ✨";
  birthdayStatus.style.color = "";
  showPage(0);
});

function createCelebration() {
  const symbols = ["♥", "♡", "💕", "✨", "🌷", "❀"];
  const count = window.innerWidth < 600 ? 55 : 90;

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${14 + Math.random() * 23}px`;
    piece.style.animationDuration = `${3.2 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.opacity = `${0.45 + Math.random() * 0.5}`;
    celebrationLayer.appendChild(piece);

    setTimeout(() => piece.remove(), 8500);
  }
}

function softVibrate(pattern) {
  if ("vibrate" in navigator) navigator.vibrate(pattern);
}

// Generated romantic melody
const musicButton = document.getElementById("musicButton");
let audioContext = null;
let musicPlaying = false;
let musicTimer = null;
let noteIndex = 0;

const melody = [
  261.63, 329.63, 392.0, 329.63,
  293.66, 349.23, 440.0, 349.23,
  261.63, 329.63, 392.0, 523.25,
  440.0, 392.0, 329.63, 293.66
];

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioContext = new AudioContextClass();
  }
  return audioContext;
}

function playNote(frequency, duration = 0.62, volume = 0.035) {
  const context = getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.05);
}

function startMusic() {
  if (!CONFIG.enableMusic) return;
  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") context.resume();

  musicPlaying = true;
  musicButton.classList.add("playing");

  const playNext = () => {
    if (!musicPlaying) return;
    playNote(melody[noteIndex % melody.length]);
    noteIndex += 1;
  };

  playNext();
  musicTimer = setInterval(playNext, 720);
}

function stopMusic() {
  musicPlaying = false;
  clearInterval(musicTimer);
  musicTimer = null;
  musicButton.classList.remove("playing");
}

musicButton.addEventListener("click", () => {
  musicPlaying ? stopMusic() : startMusic();
});

function playSuccessChime() {
  [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
    setTimeout(() => playNote(note, 0.48, 0.06), index * 120);
  });
}
