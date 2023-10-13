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

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "🌿 kelp... ",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "vegan moment",
  },
  {
    name: "🦐 shrimpy :| ",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "he's watching his figure",
  },
  {
    name: "🐟 fish :) ",
    cost: 1000,
    rate: 50.0,
    count: 0,
    description: "ok, out of the trenches now",
  },
  {
    name: "🦭 seal :0 ",
    cost: 5000,
    rate: 100.0,
    count: 0,
    description: "lots of nutritional value",
  },
  {
    name: "🧍‍♂️ man :D ",
    cost: 15000,
    rate: 500.0,
    count: 0,
    description: "'I USED TO PRAY FOR TIMES LIKE THIS'",
  },
];

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.type = "button";
  upgradeButton.innerText = `${item.name}: Buy for ${item.cost} braincells`;
  upgradeButton.className = "upgrade-button";

  const upgradeDescription = document.createElement("div");
  upgradeDescription.innerText = item.description;

  const upgradeCountDisplay = document.createElement("div");

  upgradeCountDisplay.innerHTML = `${item.name}: ${item.count} purchased`;

  app.append(upgradeButton);
  app.append(upgradeDescription);
  app.append(upgradeCountDisplay);

  upgradeButton.addEventListener("mousedown", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count!++;

      item.cost *= 1.15;
      item.cost = Math.round(item.cost * 100) / 100;

      growthrate += item.rate;

      showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
      upgradeCountDisplay.innerHTML = `${item.name}: ${item.count} purchased`;
      growthRateDisplay.innerHTML = `${growthrate.toFixed(2)} food/sec`;
      upgradeButton.innerText = `${item.name}: Buy for ${item.cost} braincells`;
    }
  });
});

function updateCounter() {
  const nowTime = performance.now();
  const deltaTime = (nowTime - currentTimestamp) / 1000;
  counter += deltaTime * growthrate;
  if (counter >= 1000 && counter <= 3000) {
    showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (ok...)`;
  } else if (counter >= 3000 && counter <= 5000) {
    showCounter.innerHTML = `${counter.toFixed(
      2,
    )} Shark Food (ok now we're cooking)`;
  } else if (counter >= 7500) {
    showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (big chonk)`;
  } else {
    showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
  }
  currentTimestamp = nowTime;
  requestAnimationFrame(updateCounter);
}

button.addEventListener("mousedown", () => {
  console.log("click registered");
  counter++;
  showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
});

requestAnimationFrame(updateCounter);
