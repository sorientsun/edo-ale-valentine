const correctAnswers = {
  2: "B",
  3: "A",
  4: "B",
  5: "C"
};

const scenes = {
  2: {
    question: "Dove Edo&Ale hanno avuto il loro primo bacio?",
    answers: ["A. Su una panchina", "B. In un parcheggio", "C. Sotto un lampione"]
  },
  3: {
    question: "Cosa hanno mangiato Edo&Ale durante il loro primo San Valentino?",
    answers: ["A. Pizza", "B. Sushi", "C. Panino"]
  },
  4: {
    question: 'A che nota corrisponde il suono "Ping" che genera come risposta "Grrr"?',
    answers: ["A. Sol", "B. Mi", "C. Fa"]
  },
  5: {
    question: "Quanti cornetti hanno mangiato complessivamente Edo&Ale per il loro 2° San Valentino?",
    answers: ["A. 20", "B. 15", "C. 10"]
  }
};

let currentScene = 1;

function playSfx(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.currentTime = 0;
  el.play().catch(()=>{});
}

function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === "kithkith") {
    document.getElementById("password-screen").classList.remove("active");
    document.getElementById("scene1").classList.add("active");
    updateCharacterPosition(1);
  } else {
    document.getElementById("error-message").innerText = "Password sbagliata 💔";
  }
}

function nextScene(number) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  if (number >= 2 && number <= 5) loadScene(number);
  else if (number === 6) showScene6();
  else if (number === 7) showScene7();
  else if (number === 8) showScene8();

  updateCharacterPosition(number);
}

function loadScene(number) {
  currentScene = number;
  const container = document.getElementById("dynamic-scene");

  container.innerHTML = `
    <h2>${scenes[number].question}</h2>
    <div class="button-row">
      ${scenes[number].answers.map(ans =>
        `<button onclick="playSfx('sfx-click'); checkAnswer('${ans[0]}')">${ans}</button>`
      ).join("")}
    </div>
  `;
  container.classList.add("active");
}

function checkAnswer(letter) {
  if (letter === correctAnswers[currentScene]) {
    closePopup();
    if (currentScene === 5) {
      playSfx("sfx-victory");
      nextScene(6);
    } else {
      playSfx("sfx-correct");
      nextScene(currentScene + 1);
    }
  } else {
    playSfx("sfx-wrong");
    showPopup();
  }
}

function showPopup() {
  const messages = [
    "Hmm... risposta sospetta 😏 Riprova!",
    "Ma davvero? Dai che puoi fare meglio 💖",
    "No no no 😄 Ritenta, cuore mio!"
  ];
  document.getElementById("popup-text").innerText =
    messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  playSfx("sfx-click");
}

function showScene6() {
  const container = document.getElementById("dynamic-scene");
  container.innerHTML = `
    <h2>Congratulazioni!</h2>
    <p>Se sei arrivato fin qui è perché hai risposto correttamente a tutte le domande.</p>
    <p>Tuttavia, c'è un'ultima domanda per te...</p>
    <button onclick="playSfx('sfx-click'); nextScene(7)">CONTINUA</button>
  `;
  container.classList.add("active");
  spawnHearts(10);
}

function showScene7() {
  const container = document.getElementById("dynamic-scene");
  container.innerHTML = `
    <h2>Vuoi essere il mio Valentino?</h2>
    <div class="button-row">
      <button onclick="playSfx('sfx-click'); nextScene(8)">Sì</button>
      <button id="noBtn">No</button>
    </div>
  `;
  container.classList.add("active");

  const noBtn = document.getElementById("noBtn");
  noBtn.addEventListener("mouseover", () => moveButton(noBtn));
  noBtn.addEventListener("click", () => moveButton(noBtn));
}

function showScene8() {
  const container = document.getElementById("dynamic-scene");
  container.innerHTML = `
    <div class="ending-block">
      <h1 class="ending-title">EDO&ALE</h1>
      <h2>FOREVER VALENTINES</h2>
      <h3>THE END</h3>
      <p>Thanks for playing 💚</p>
    </div>
  `;
  container.classList.add("active");

  document.getElementById("characters-container").classList.add("hug");
  spawnHearts(26);
}

function moveButton(button) {
  button.style.position = "fixed";
  button.style.top = (10 + Math.random() * 70) + "vh";
  button.style.left = (10 + Math.random() * 70) + "vw";
}

function updateCharacterPosition(sceneNumber) {
  const container = document.getElementById("characters-container");

  if (sceneNumber === 1) container.style.gap = "80px";
  if (sceneNumber === 2) container.style.gap = "60px";
  if (sceneNumber === 3) container.style.gap = "40px";
  if (sceneNumber === 4) container.style.gap = "25px";
  if (sceneNumber === 5) container.style.gap = "15px";
  if (sceneNumber >= 6) container.style.gap = "0px";
}

function spawnHearts(count = 18) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "♥";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = (60 + Math.random() * 60) + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1400);
  }
}
