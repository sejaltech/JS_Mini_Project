
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');


const botResponses = {

    "hello": "Hi there! How can I assist you today?",
    "hi": "Hello! Welcome to our support. What can I help you with?",
    "hey": "Hey! How can I help you?",


    "order": "To check your order, please provide your order number from your confirmation email.",
    "track": "You can track your order in 'My Account' or use the tracking link in your email.",
    "status": "Your order is being processed. You will receive tracking details soon.",
    "delivered": "Great! Your order has been marked as delivered. Need help with anything else?",
    "cancel": "To cancel your order, please contact us within 1 hour of placing it.",


    "shipping": "We offer free shipping on orders over 1500 rupees. Delivery takes 3-5 business days.",
    "where": "We ship across India. International shipping is also available.",
    "when": "Orders are usually delivered within 3-5 business days.",
    "delivery": "Standard delivery takes 3-5 business days. Express delivery is available for 2-day shipping.",
    "express": "Express shipping costs 150 rupees and delivers within 2 business days.",
    "international": "International shipping is available to 50+ countries. Delivery takes 7-14 business days.",
    "cost": "Shipping is free for orders above 1500 rupees. Below that, standard shipping costs 50 rupees.",
    "delayed": "Sorry for the delay! Please share your order number and we will check the status for you.",



    "refund": "Refunds are processed within 5-7 business days after we receive your return.",
    "return": "To return an item, go to 'My Orders' and click 'Return Item'.",
    "exchange": "We offer exchanges within 7 days. Please contact support.",


    "price": "Check our website for current prices and deals!",
    "discount": "Use code SAVE10 for 10% off your first order!",
    "size": "Check our size guide on the product page for help.",
    "available": "Most items are in stock. Which product are you looking for?",


    "payment": "We accept Visa, debit card, credit card, and UPI .",
    "account": "Manage your account by clicking 'My Account' after logging in.",
    "password": "Click 'Forgot Password' on the login page to reset it.",


    "contact": "Email us at support@example.com or call 7575757575.",
    "hours": "We're available Monday to Friday, 9 AM to 6 PM.",
    "help": "I can help you with orders, shipping, refunds, or general inquiries.",
    "how": "Let me know what you need help with and I'll guide you!",


    "problem": "Sorry to hear that! Please describe your issue and I'll help.",
    "issue": "I understand. Please tell me more about the problem.",
    "not received": "Sorry for the delay! Please share your order number to check status.",
    "wrong": "We apologize! Please contact support and we'll fix it right away.",
    "damaged": "Sorry about that! Please email photos to support@example.com for a replacement.",


    "thanks": "You're welcome! Anything else I can help with?",
    "thank you": "My pleasure! Let me know if you need anything else.",
    "bye": "Goodbye! Have a great day!",
    "ok": "Great! Let me know if you need anything else.",
    "yes": "Sure! What would you like to know?",
    "no": "No problem! Feel free to ask if you have other questions."
};


function isOrderNumber(message) {
    return /^\d+$/.test(message.trim());
}


const defaultResponse = "I'm sorry, I didn't quite understand that. You can ask me about orders, shipping, refunds, or contact support.";


function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + minutes + ' ' + ampm;
}


function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'msg ' + (isUser ? 'msg-user' : 'msg-bot');
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'timestamp';
    timeSpan.textContent = getCurrentTime();
    
    messageDiv.appendChild(messageText);
    messageDiv.appendChild(timeSpan);
    chatMessages.appendChild(messageDiv);
    

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}


function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    const trimmedMessage = userMessage.trim();
    

    if (isOrderNumber(trimmedMessage)) {
        return "Thank you! Your order #" + trimmedMessage + " is being processed. Expected delivery in 3-5 business days. Need anything else?";
    }
    
  
    const keywords = Object.keys(botResponses).sort((a, b) => b.length - a.length);
    
    for (let i = 0; i < keywords.length; i++) {
        if (lowerMessage.includes(keywords[i])) {
            return botResponses[keywords[i]];
        }
    }
    

    return defaultResponse;
}


function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') {
        return;
    }
    

    addMessage(message, true);
    

    userInput.value = '';
    

    showTypingIndicator();
    

    setTimeout(function() {
        removeTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 1000);
}


sendBtn.addEventListener('click', sendMessage);


userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
userInput.focus();
