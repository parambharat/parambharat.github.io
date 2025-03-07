document.addEventListener('DOMContentLoaded', function () {
    // Remove theme toggle setup

    // Initialize typing effects
    initializeTypingEffects();

    /**
     * Initialize typing effects for all terminal-welcome elements
     */
    function initializeTypingEffects() {
        const welcomeMessages = document.querySelectorAll('.terminal-welcome p:first-child');

        welcomeMessages.forEach(function (welcomeMessage) {
            const originalText = welcomeMessage.innerHTML;
            const promptSpan = welcomeMessage.querySelector('.terminal-prompt');
            const commandSpan = welcomeMessage.querySelector('.text-sky-400, .text-sky-300');

            if (promptSpan && commandSpan) {
                const promptHtml = promptSpan.outerHTML;
                const commandHtml = commandSpan.outerHTML;
                const restOfText = originalText.substring(
                    originalText.indexOf(commandHtml) + commandHtml.length
                );

                // Start with just the prompt and command
                welcomeMessage.innerHTML = promptHtml + ' ' + commandHtml;

                // Create a cursor element for typing animation
                const typingCursor = document.createElement('span');
                typingCursor.className = 'typing-cursor';
                typingCursor.innerHTML = '█';
                welcomeMessage.appendChild(typingCursor);

                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < restOfText.length) {
                        // Insert the character before the cursor
                        welcomeMessage.insertBefore(
                            document.createTextNode(restOfText.charAt(i)),
                            typingCursor
                        );
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        });
    }

    // Remove setupThemeToggle function
});