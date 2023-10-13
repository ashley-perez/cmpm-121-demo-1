import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Feed sharky";
let counter: number = 0.0;
let currentTimestamp = performance.now();
let growthrate: number = 0.0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// creating the main button
const button = document.createElement("button");
button.type = "button";
button.innerText = "🦈";
app.append(button);

const showCounter = document.createElement("div");
showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
app.append(showCounter);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthrate.toFixed(2)} food/sec`;
app.append(growthRateDisplay);

const upgrades = [
  { id: "🌿 kelp... ", cost: 10, rate: 0.1, count: 0 },
  { id: "🦐 shrimpy :| ", cost: 100, rate: 2.0, count: 0 },
  { id: "🐟 fish :) ", cost: 1000, rate: 50.0, count: 0 },
];

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.type = "button";
  upgradeButton.innerText = `${upgrade.id}: Buy for ${upgrade.cost} braincells`;
  upgradeButton.className = "upgrade-button";

  const upgradeCountDisplay = document.createElement("div");
  upgradeCountDisplay.innerHTML = `${upgrade.id}: ${upgrade.count} purchased`;

  app.append(upgradeButton);
  app.append(upgradeCountDisplay);

  upgradeButton.addEventListener("mousedown", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;

      // update the upgrade cost
      upgrade.cost *= 1.15;
      upgrade.cost = Math.round(upgrade.cost * 100) / 100;
      upgradeButton.innerText = `${upgrade.id}: Buy for ${upgrade.cost} braincells`;

      growthrate += upgrade.rate;
      showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
      upgradeCountDisplay.innerHTML = `${upgrade.id}: ${upgrade.count} purchased`;
      growthRateDisplay.innerHTML = `${growthrate.toFixed(2)} units/sec`;
    }
  });
});

function updateCounter() {
  const nowTime = performance.now();
  const deltaTime = (nowTime - currentTimestamp) / 1000;
  counter += deltaTime * growthrate;
  showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
  currentTimestamp = nowTime;
  requestAnimationFrame(updateCounter);
}

button.addEventListener("mousedown", () => {
  console.log("click registered");
  counter++;
  showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
});

requestAnimationFrame(updateCounter);
