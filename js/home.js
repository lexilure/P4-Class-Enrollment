document.addEventListener('DOMContentLoaded', function() {
    const userNumber = sessionStorage.getItem('userNumber');
    const userRole = sessionStorage.getItem('userRole');
    
    if (!userNumber || !userRole) {
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    document.getElementById('userNumberDisplay').textContent = userNumber;
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
    document.getElementById('logoutButton').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    
        // Add navigation handling
        document.querySelectorAll('.nav-menu a:not(#logoutButton)').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('href').substring(1);
                loadContent(page);
            });
        });
    
        // Load default content
        loadContent('courses');
    });
    
  // ...existing code...

  async function loadContent(page) {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '<div class="loading">Loading...</div>';

    try {
        // Use relative path instead of hardcoded localhost URL
        const response = await fetch(`/pages/${page}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        contentArea.innerHTML = html;
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