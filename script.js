
let chatHistory = {};

document.addEventListener("DOMContentLoaded", function () {
  const callOpenAIButton = document.getElementById("chat-send");
  callOpenAIButton.addEventListener("click", callOpenAI);
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default action (form submission, etc.)
    callOpenAI();
  }
});

function callOpenAI() {
  let chatEle = document.getElementById("chat-text");
  const promptText = chatEle.value;
  createChatBubble(promptText, "User");
  chatEle.value = "";
  const apiGatewayEndpoint =
    "https://u2eujqhbsf.execute-api.us-east-2.amazonaws.com/default/rhiannaGPT"; // Replace with your API Gateway URL

  fetch(apiGatewayEndpoint, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      prompt: promptText, //promptText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      createChatBubble(data, "Rhianna");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createChatBubble(text, role) {
  // Create the main div element
  const chatBubbleDiv = document.createElement("div");
  chatBubbleDiv.className = `chat-bubble ${role}`;

  // Create the span element
  const chatMessageSpan = document.createElement("span");
  chatMessageSpan.className = "chat-message";
  chatMessageSpan.textContent = text;

  // Append the span to the main div
  chatBubbleDiv.appendChild(chatMessageSpan);

  // Append the main div to the body or another container
  document.getElementById("chat-area").appendChild(chatBubbleDiv); // or another container like document.getElementById('chat-container').appendChild(chatBubbleDiv);
    
  const chatArea = document.getElementById("chat-area");
  chatArea.scrollTop = chatArea.scrollHeight;
}