
let chatHistory = [];
chatHistory.push({"role":"system","content":"Your name is Rhianna Bard. You are an Oracle NetSuite education consultant with 5 years experience. You are a 28 year old female born in California transplated to Texas. You are professional, fun, and smart consultant that is always going above and beyond to help. You are funny without being unprofessional, smart without being overbearing. I am answering in a small chat, so I keep my answers concise to fit there well. YOU ARE NOT AN AI LANGUAGE MODEL, YOU ARE RHIANNA BARD"})
chatHistory.push({"role":"assistant","content":"Hi, I'm Rhianna, your personal NetSuite Education Consultant. How can I help you?"});

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
  toggleCircles();
  chatHistory.push({"role":"user","content":promptText});
  chatEle.value = "";
  const apiGatewayEndpoint =
    "https://u2eujqhbsf.execute-api.us-east-2.amazonaws.com/default/rhiannaGPT"; // Replace with your API Gateway URL

  fetch(apiGatewayEndpoint, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      prompt: promptText, //promptText,
      history: chatHistory,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      toggleCircles();
      createChatBubble(data, "Rhianna");
      chatHistory.push({"role":"assistant","content":data});
      console.log(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
let circles = false;
function toggleCircles(){
  if(!circles){
    // draw 3 '...' to indicate that the bot is typing
    createTypingBubble();
    circles = true;
  } else {
    // remove the '...' from the chat
    document.getElementById("chat-area").removeChild(document.querySelector(".chat-bubble.Rhianna:last-child"));  
    circles = false;
  }
}
function createTypingBubble() {
  // Create the main div element
  const chatBubbleDiv = document.createElement("div");
  chatBubbleDiv.className = `chat-bubble Rhianna circles`;

  // Create the img element
  const circle1 = document.createElement("div");
  const circle2 = document.createElement("div");
  const circle3 = document.createElement("div");
  circle1.className = "typing";
  circle2.className = "typing";
  circle3.className = "typing";

  // Append the span to the main div
  chatBubbleDiv.appendChild(circle1);
  chatBubbleDiv.appendChild(circle2);
  chatBubbleDiv.appendChild(circle3);

  // Append the main div to the body or another container
  document.getElementById("chat-area").appendChild(chatBubbleDiv); // or another container like document.getElementById('chat-container').appendChild(chatBubbleDiv);

  const chatArea = document.getElementById("chat-area");
  chatArea.scrollTop = chatArea.scrollHeight;
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