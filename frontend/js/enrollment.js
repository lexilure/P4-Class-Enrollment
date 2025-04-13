document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const course = document.getElementById('course').value;
        const section = document.getElementById('section').value;

        const token = sessionStorage.getItem('token'); // Get the JWT token from session storage

        if (!token) {
            alert('Please login first!');
            return;
        }

        const enrollmentData = {
            courseCode: course,
            section: section,
            username: sessionStorage.getItem('username')
        };

        // Enroll the student in the course
        fetch('http://localhost:8080/enrollments/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(enrollmentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Successfully enrolled!');
        })
        .catch(error => {
            console.error('Error enrolling in course:', error);
            alert('Error enrolling in course!');
        });
    });
});
