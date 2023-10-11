import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Feed sharky";
let counter: number = 0.0;
let currentTimestamp = performance.now();
let growthrate: number = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// creating the button
const button = document.createElement("button");
button.type = "button";
button.innerText = "🦈";

// creating a new purchasable item button
const firstUpgradeButton = document.createElement("button");
firstUpgradeButton.className = "upgrade-button";
// firstUpgradeButton.type = "button"
firstUpgradeButton.innerText = "🦐 not filling";

firstUpgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthrate += 1 / 50;

    showCounter.innerHTML = `${counter.toFixed(2)} Shark Food (he hungy)`;
    firstUpgradeButton.innerText = "🦐 ok...";

    firstUpgradeButton.disabled = counter < 10;
  }
});

// adding the counter
const showCounter = document.createElement("div");
showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
app.append(showCounter);

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

app.append(button);
app.append(firstUpgradeButton);

requestAnimationFrame(updateCounter);
