import { askGemini } from "./api.js";

const input = document.querySelector("#input");
const chat = document.querySelector("#chat");
const button = document.querySelector("#send");

button.addEventListener("click", async () => {
  const userText = input.value.trim();
  chat.appendChild(createMessageLi(userText, "sent"));
  input.value = "";
  chat.appendChild(createMessageLi("Thinking...", "received"));
  const katText = await askGemini(userText);
  chat.replaceChild(createMessageLi(katText, "received"), chat.lastChild);
});

function createMessageLi(message, cls) {
  const li = document.createElement("li")
  li.classList.add(cls)
  li.textContent = message
  return li
}
