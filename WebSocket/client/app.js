const socket = new WebSocket("ws://localhost:3001");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.send(input.value);
    input.value = "";
  }
}

socket.addEventListener("message", ({ data }) => {
  console.log("Received from server: ", data);
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li);
});
