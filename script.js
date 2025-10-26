const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = fileUploadWrapper.querySelector("#file-cancel");

// Vendos URL e backend-it të Render
const API_URL = "https://aichat-sc4w.onrender.com/chat";

// Ruaj mesazhin dhe file
const userData = { message: null, file: { data: null, mime_type: null } };

// Histori chat
const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

// Krijo element mesazhi
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Gjenero përgjigjen e bot-it nga backend
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userData.message }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Gabim API");

    const apiResponseText = data.reply.trim();
    messageElement.innerText = apiResponseText;

    chatHistory.push({ role: "model", parts: [{ text: apiResponseText }] });
  } catch (error) {
    console.error(error);
    messageElement.innerText = error.message || "Gabim gjatë API";
    messageElement.style.color = "#ff0000";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo(
