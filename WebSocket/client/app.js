const socket = new io("ws://localhost:3001");

const input = document.querySelector("input");
const typingPara = document.querySelector("#typing");

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    // socket.send(input.value);
    socket.emit("message", input.value);
    input.value = "";
  }
}

// socket.addEventListener("message", ({ data }) => {
//   console.log("Received from server: ", data);
//   const ul = document.querySelector("ul");
//   const li = document.createElement("li");
//   li.textContent = data;
//   ul.appendChild(li);
// });

socket.on("message", (data) => {
  console.log("Received from server: ", data);
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li);
  typingPara.textContent = "";
});

input.addEventListener("keypress", () => {
  // activity event
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;

socket.on("activity", (name) => {
  typingPara.textContent = `${name} is typing...`;

  // clear after 3 seconds
  if (activityTimer) clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    typingPara.textContent = "";
  }, 3000);
});
