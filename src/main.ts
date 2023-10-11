import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ashley's game :D";
let counter: number = 0;

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
setInterval(() => {
  counter++;
  showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
}, 1000);

button.addEventListener("mousedown", () => {
  console.log("click registered");
  counter++;
  showCounter.innerHTML = `${counter} Shark Food (he hungy)`;
});

app.append(button);
