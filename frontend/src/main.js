import { askGemini } from "./api.js";

const input = document.querySelector("#input");
const chat = document.querySelector("#chat");
const button = document.querySelector("#send");

button.addEventListener("click", async () => {
  const userText = input.value.trim();
  chat.appendChild(createMessageLi(userText, "sent"));

  const katText = await askGemini(userText);
  chat.appendChild(createMessageLi(katText, "received"));
});

function createMessageLi(message, cls) {
  const li = document.createElement("li")
  li.classList.add(cls)
  li.textContent = message
  return li
}
