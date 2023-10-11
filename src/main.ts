import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Feed sharky";
let counter: number = 0.0;
let currentTimestamp = performance.now();

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// creating the button
const button = document.createElement("button");
button.type = "button";
button.innerText = "🦈";

// adding the counter
const showCounter = document.createElement("div");
showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
app.append(showCounter);

// adding the interval
// setInterval(() => {
//   counter++;
//   showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
// }, 1000);

function updateCounter() {
  const nowTime = performance.now();
  const deltaTime = (nowTime - currentTimestamp) / 1000;
  counter += deltaTime;
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

requestAnimationFrame(updateCounter);
