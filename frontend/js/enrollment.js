document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const courseSelect = document.getElementById('course');
    const sectionSelect = document.getElementById('section');

    // Fetch available courses from backend or fallback to localStorage
    fetch('http://localhost:8080/courses')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('courses', JSON.stringify(data)); // Cache the data
            populateDropdowns(data);
        })
        .catch(error => {
            console.error('Failed to fetch courses. Loading from localStorage...', error);
            const cached = localStorage.getItem('courses');
            if (cached) {
                populateDropdowns(JSON.parse(cached));
                alert('Loaded courses from saved data.');
            } else {
                alert('Unable to load courses. No offline data available.');
            }
        });

    function populateDropdowns(courses) {
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.courseCode;
            option.textContent = course.courseCode;
            courseSelect.appendChild(option);

            const secOption = document.createElement('option');
            secOption.value = course.section;
            secOption.textContent = course.section;
            sectionSelect.appendChild(secOption);
        });
    }

    // Enrollment form submission
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const course = courseSelect.value;
        const section = sectionSelect.value;
        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('Please login first!');
            return;
        }

        const enrollmentData = {
            courseCode: course,
            section: section,
            username: sessionStorage.getItem('username')
        };

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
