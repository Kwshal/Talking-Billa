export async function askGemini(userText) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userText })
  });

  const data = await response.json();
  return data.reply;
}
