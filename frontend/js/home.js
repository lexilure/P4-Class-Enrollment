document.addEventListener('DOMContentLoaded', function () {
    const username = sessionStorage.getItem('username');
    const userRole = sessionStorage.getItem('userRole');
    const token = sessionStorage.getItem('token');

    if (!username || !userRole || !token) {
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    document.getElementById('userNumberDisplay').textContent = username;
    document.getElementById('userRoleDisplay').textContent = userRole.toUpperCase();

    // Show/hide elements based on role
    const studentElements = document.querySelectorAll('.student-only');
    const facultyElements = document.querySelectorAll('.faculty-only');

    if (userRole === 'student') {
        studentElements.forEach(el => el.style.display = 'block');
        facultyElements.forEach(el => el.style.display = 'none');
    } else {
        studentElements.forEach(el => el.style.display = 'none');
        facultyElements.forEach(el => el.style.display = 'block');
    }

    // Add logout handler
    document.getElementById('logoutButton').addEventListener('click', function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Add navigation handling
    document.querySelectorAll('.nav-menu a:not(#logoutButton)').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('href').substring(1);
            loadContent(page);
        });
    });

    // Load default content
    loadContent('courses');
});

async function loadContent(page) {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const response = await fetch(`/pages/${page}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        contentArea.innerHTML = html;

        // Dynamically load associated script if it exists
        const script = document.createElement('script');
        script.src = `js/${page}.js`;
        script.onload = () => console.log(`${page}.js loaded`);
        script.onerror = () => console.warn(`No JS file found for ${page}`);
        document.body.appendChild(script);

    } catch (error) {
        console.error('Error loading content:', error);
        contentArea.innerHTML = `
            <div class="error-message">
                <h3>Error Loading Content</h3>
                <p>Could not load the ${page} page.</p>
                <p class="error-details">${error.message}</p>
            </div>`;
    }
}
