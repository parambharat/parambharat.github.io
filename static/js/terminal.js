document.addEventListener('DOMContentLoaded', function () {
    // Set up dark mode toggle
    setupThemeToggle();

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

    /**
     * Set up theme toggle button
     */
    function setupThemeToggle() {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }

        // Create theme toggle button if it doesn't exist
        if (!document.getElementById('theme-toggle')) {
            const themeToggle = document.createElement('div');
            themeToggle.id = 'theme-toggle';
            themeToggle.setAttribute('role', 'button');
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            `;

            document.body.appendChild(themeToggle);

            // Add click event to toggle theme
            themeToggle.addEventListener('click', function () {
                const html = document.documentElement;
                const isDark = html.classList.contains('dark');

                console.log('Toggle theme called. Current dark mode:', isDark);

                if (isDark) {
                    html.classList.remove('dark');
                    document.body.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                    console.log('Switched to light mode');
                } else {
                    html.classList.add('dark');
                    document.body.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                    console.log('Switched to dark mode');
                }

                // Force a repaint to ensure styles are applied
                void document.documentElement.offsetHeight;

                // Apply dark mode to all elements with transition-colors class
                const transitionElements = document.querySelectorAll('.transition-colors');
                transitionElements.forEach(element => {
                    // Force a repaint on each element
                    void element.offsetHeight;
                });
            });
        }
    }
});