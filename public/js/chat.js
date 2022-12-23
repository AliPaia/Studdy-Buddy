const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
const socket = io();
const username = prompt("Please enter a nickname: ", "");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    addMessage(username + ": " + input.value);

    socket.emit("chatMessage", {
        message: input.value
    });

    input.value = "";
    return false;
}, false);

socket.on("chatMessage", function (data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("userJoin", function (data) {
    addMessage(data + " just joined the chat!");
});

socket.on("userLeave", function (data) {
    addMessage(data + " has left the chat.");
});

addMessage("You have joined the chat as '" + username + "'.");
socket.emit("userJoin", username);

function addMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}