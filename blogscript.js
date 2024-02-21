document.addEventListener('DOMContentLoaded', function () {
    // Load and display existing articles from localStorage during page load
    const left = document.getElementById('left');
    const existingArticlesContainer = document.querySelector('.existing');

    for (let i = 0; i < localStorage.length; i++) {
        const articleData = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const article = document.createElement('article');
        article.innerHTML = `
            <h2>${articleData.title}</h2>
            <p>Published on: ${articleData.publishedDate}</p>
            <p>${articleData.content}</p>
        `;

        existingArticlesContainer.appendChild(article);
    }
});

function validateForm() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Check if either the title or content is empty
    if (title.trim() === '' || content.trim() === '') {
        alert('Please fill in both title and content fields.');
        return false; // Prevent the form from submitting
    }

    // If validation passes, the form will submit
    submitArticle();

    // Prevent the default form submission behavior
    return false;
}

function submitArticle() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Create a unique ID for each article
    const articleId = 'article_' + Date.now();

    // Create an object with the article data
    const articleData = {
        id: articleId,
        title: title,
        content: content,
        publishedDate: new Date().toLocaleDateString(),
    };

    // Save the article data to localStorage
    localStorage.setItem(articleId, JSON.stringify(articleData));

    // Update the webpage with the new article dynamically
    const existingArticlesContainer = document.querySelector('.new');

    const article = document.createElement('article');
    article.innerHTML = `
        <h2>${articleData.title}</h2>
        <p>Published on: ${articleData.publishedDate}</p>
        <p>${articleData.content}</p>
    `;

    existingArticlesContainer.appendChild(article);

    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}

function deleteAllArticles() {
    // Clear all articles from localStorage
    localStorage.clear();

    // Clear articles from the webpage, excluding the form
    const existingArticlesContainer = document.querySelector('.new');
    existingArticlesContainer.innerHTML = ''; // Clear all child elements

    // Reload and display existing articles from localStorage during page load
    for (let i = 0; i < localStorage.length; i++) {
        const articleData = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const article = document.createElement('article');
        article.innerHTML = `
            <h2>${articleData.title}</h2>
            <p>Published on: ${articleData.publishedDate}</p>
            <p>${articleData.content}</p>
        `;

        existingArticlesContainer.appendChild(article);
    }

    // You may want to reload the page or provide some feedback to the user
    alert('Confirm? All your articles will be deleted ');
}
