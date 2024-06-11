const kevinButton = document.getElementById("kevin-button");
const kevBucksElement = document.getElementById("kevin-count");
const resetButton = document.getElementById("reset-button");
const muteButton = document.getElementById("mute-button");

const kevinButtonImage = document.getElementById("kev-image");
const kevCurrencyText = document.getElementById("kev-currency");
const kevPerSecText = document.getElementById("kps");
const kevPerSecCurrencyText = document.getElementById("kps-currency");

const cueOrigin = document.getElementById("cue-origin");
const cueTemplate = document.getElementById("template-cue");

const upgradeOrigin = document.getElementById("upgrade-origin");
const upgradeTemplate = document.getElementById("template-upgrade");

const xpElement = document.getElementById("xp");
const xpMaxElement = document.getElementById("xp_max");
const levelElement = document.getElementById("level-count");
const progressBarElement = document.getElementById("xp_progress");

const audio = document.getElementById("audio");

const jsConfetti = new JSConfetti()

const background_images = ["bg_morning.png", "bg_sunset.png", "bg_nighttime.png"]
let background_index = 0

// upgrades
const upgrades_content = [
  {
    id: "poolcue",
    name: "poolcue",
    description: "Prods Kevster to make passive KevBucks!",
    image: "assets/icon_poolcue.png",
    price: (level) => 50 + (level * 5),
    kps: (level) => level,
    effects: (level) => {
      showCues(level);
    },
  },
  {
    id: "localbank",
    name: "local bank",
    description: "Small local Bank to produce some additional Bucks!",
    image: "assets/icon_localbank.png",
    price: (level) => 250 + (level * 10),
    kps: (level) => level * 5,
  },
  {
    id: "5coursemeal",
    name: "5 course meal",
    description:
      "Keeping Kevster fed is a great way to keep him producing, huh?",
    image: "assets/icon_fivecourse.png",
    price: (level) => 500 + (level * 25),
    kps: (level) => level * 10,
  },
];

let upgrades = [];

// cookie mode scripts
let cookieMode = false;
window.addEventListener("keypress", (event) => {
  if (event.keyCode === 32) {
    cookieMode = !cookieMode;
    event.preventDefault();
  }
  updateUI();
});

// Main variables
let kevBucks = 0;
let kps = 0;
let pkps = 0;
let kevThicc= 2;
let previous_pkps = 0;
let cueCount = 0;
let timeStart = Date.now();
let xp = 0;

// level and experience
let level_constant = 0.07;
function getLevelFromXP(xp) {
  return level_constant * Math.sqrt(xp)
}
function getXPFromLevel(level) {
  return Math.round((level / level_constant) ** 2)
}

// Update all ui elements
function updateUI() {
  level = Math.floor(getLevelFromXP(xp));
  current_level_xp = getXPFromLevel(level)
  next_level_xp = getXPFromLevel(level + 1);
  progress_percentage = (xp - current_level_xp) / (next_level_xp - current_level_xp);

  document.querySelector("body").style.backgroundImage = `url(assets/${background_images[Math.floor(level / 5) % 3]})`;
  
  kevBucksElement.innerText = kevBucks;
  levelElement.innerText = level;
  xpElement.innerText = xp - current_level_xp;
  xpMaxElement.innerText = next_level_xp - current_level_xp;
  progressBarElement.style.setProperty(
    "--progress-percentage",
    progress_percentage,
  );

  muteButton.innerText = audio.muted ? "Unmute" : "Mute";

  if (cookieMode) {
    kevinButtonImage.style.backgroundImage = "url(assets/cookie.png)";
    kevCurrencyText.textContent = "CookieBucks";
    kevPerSecCurrencyText.textContent = "CookieBucks/s";
  } else {
    kevinButtonImage.style.backgroundImage =
      "url(assets/kevster_heaven.png)";
    kevCurrencyText.textContent = "KevBucks";
    kevPerSecCurrencyText.textContent = "KevBucks/s";
  }

  // kevinButtonImage.style.scale = `scale(${kevThicc}, 0)`

  while (upgradeOrigin.firstChild) {
    upgradeOrigin.firstChild.remove();
  }
  kps = 0;
  upgrades.forEach((upgrade, i, a) => {
    let previous_upgrade = a[i-1]
    if (!previous_upgrade) {
      upgrade.unlocked = true;
      return;
    }

    if (previous_upgrade.level >= 10) {
      upgrade.unlocked = true
    }
  })
  
  upgrades.forEach((upgrade) => {
    let upgradeElement = upgradeTemplate.cloneNode(true);
    upgradeElement.id = "upgrade";
    upgradeElement.querySelector("#upgrade-name").innerText = upgrade.name;
    upgradeElement.querySelector("#upgrade-level").innerText = upgrade.level;
    upgradeElement.querySelector("#upgrade-image").src = upgrade.image;
    upgradeElement.querySelector("#upgrade-description").innerText =
      upgrade.description;
    upgradeElement.querySelector("#upgrade-price").innerText = upgrade.price(
      upgrade.level,
    );
    upgradeElement.querySelector("#kps-level").innerText = upgrade.kps(
      upgrade.level,
    );
    upgradeElement.disabled = !upgrade.unlocked;
    upgradeOrigin.appendChild(upgradeElement);
    upgradeElement.onclick = () => buyUpgrade(upgrade.id);
    kps += upgrade.kps(upgrade.level);
  });
}
setInterval(() => {
  kevPerSecText.textContent = Math.floor(pkps - previous_pkps) + kps;
  previous_pkps = pkps
  kevBucks += kps;
  updateUI()
}, 1000);

// cues
function showCues(amount) {
  cueCount = 0;
  while (cueOrigin.firstChild) {
    cueOrigin.firstChild.remove();
  }
  while (cueCount < amount) {
    const cue = cueTemplate.cloneNode(true);
    cue.id = "cue";
    cueOrigin.appendChild(cue);
    cueCount++;
  }
}
let cueRotation = 0;
let animationIndex = 0;
function animateCues() {
  const cues = document.querySelectorAll("#cue");
  cues.forEach((cue, i, a) => {
    cue.style.rotate = `${(360 / 75) * i + cueRotation}deg`;
    cue.querySelector("#cue-image").style.transform =
      `translate(50%, ${Math.floor(i / 75) * 4 + 10 - (Math.abs(i - animationIndex) < 5 ? (10 - Math.abs(i - animationIndex) * 2) * 0.1 : 0)}rem) rotate(-90deg)`;
  });
  animationIndex++;
  if (animationIndex >= cues.length) animationIndex = 0;
  cueRotation++;
}
setInterval(() => animateCues(), 50);

// Main kevin button
kevinButton.addEventListener("click", () => {
  kevBucks++;
  pkps++;

  updateUI();
});

// level and experience
function gainXP(amount) {
  xp += Math.round(amount);

  if (Math.floor(getLevelFromXP(xp)) > Math.floor(getLevelFromXP(xp - Math.round(amount)))) {
    jsConfetti.addConfetti()
  }
  
  updateUI()
}

// init upgrades
function buyUpgrade(id) {
  const index = upgrades.findIndex((upgrade) => upgrade.id === id);
  let upgrade = upgrades[index];
  let price = upgrade.price(upgrade.level);

  if (price > kevBucks) return;

  kevBucks -= price;
  upgrade.level += 1;
  gainXP(price * 0.25);

  if (typeof upgrade.effects === "function") upgrade.effects(upgrade.level);

  updateUI();
}

// upgrades loading
function loadUpgrades() {
  const gameSave = JSON.parse(localStorage.getItem("kevAutoSave"));
  if (!gameSave) saveandreload()
  const up = gameSave.upgrades;

  upgrades_content.forEach((upgrade, i, a) => {
    let upgrade_level = up?.[upgrade?.id] ?? 0;

    if (typeof upgrade.effects === "function") upgrade.effects(upgrade_level);

    upgrades.push({
      ...upgrade,
      level: upgrade_level,
    });
  });

  upgrades.forEach((upgrade, i, a) => {
    let previous_upgrade = a[i-1]
    if (!previous_upgrade) {
      upgrade.unlocked = true;
      return;
    }

    if (previous_upgrade.level >= 10) {
      upgrade.unlocked = true
    }
  })
}
loadUpgrades();

// Reset progress button
resetButton.addEventListener("click", () => {
  let text = "Are you sure you want to reset your progress?";
  if (confirm(text) == true) {
    kevBucks = 0;
    xp = 0;
    max_xp = 50;
    upgrades = [];

    save();
    updateUI();
    window.location.reload();
  } else {
  }
});

function saveandreload() {
  save()
  window.location.reload()
}

// Auto save script
function save() {
  localStorage.setItem(
    "kevAutoSave",
    JSON.stringify({
      kevBucks,
      xp,
      muted: audio.muted,
      upgrades: Object.fromEntries(
        upgrades.map((upgrade) => [upgrade.id, upgrade.level]),
      ),
    }),
  );
}
setInterval(save, 2000);

window.addEventListener("load", () => {
  let autoSave = localStorage.getItem("kevAutoSave");
  if (!autoSave) return;
  let autoSaveData = JSON.parse(autoSave);

  kevBucks = autoSaveData.kevBucks;
  xp = autoSaveData.xp;
  audio.muted = autoSaveData.muted;

  updateUI();
});

// credits
function displayCredits() {
  window.alert(
    [
      "Programming: David Fiddes", 
      "Assets & Music: Rishabh Sandhu", 
      "Concepts/Additional Help: Leon Carpin",
      "",
      "Playtesters: Daniels, Josh, Harry",
      "Big Shoutouts: God Emperor Kevster II",
      "Thanks for playing!",
    ].join("\n"),
  );
}

// audio
muteButton.addEventListener("click", () => {
  audio.muted = !audio.muted;
  updateUI();
});
