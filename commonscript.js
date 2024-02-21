//change theme mode toggle button
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');

    // Check if there is a theme preference stored
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    // Apply the theme preference
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.checked = isDarkMode;

    themeToggle.addEventListener('change', function () {
        // Toggle the dark mode class on the body
        document.body.classList.toggle('dark-mode');

        // Store the theme preference in localStorage
        localStorage.setItem('dark-mode', themeToggle.checked);
    });
});