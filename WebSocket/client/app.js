const socket = new io("ws://localhost:3001");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
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
});
