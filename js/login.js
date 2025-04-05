const sampleCredentials = {
    '12345678': { password: 'password123', role: 'student' },
    'faculty1': { password: 'faculty123', role: 'faculty' }
};

function validateLogin(event) {
    event.preventDefault();
    
    const number = document.querySelector('input[name="Number"]').value;
    const password = document.querySelector('input[name="password"]').value;
    
    const user = sampleCredentials[number];
    
    if (user && user.password === password) {
        // Store user info in session storage
        sessionStorage.setItem('userNumber', number);
        sessionStorage.setItem('userRole', user.role);
        // Redirect to home page
        window.location.href = 'home.html';
        return false;
    } else {
        alert('Invalid credentials. Please try again.');
        return false;
    }
}