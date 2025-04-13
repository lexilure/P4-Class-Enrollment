document.addEventListener('DOMContentLoaded', function() {
    const gradeUploadForm = document.getElementById('gradeUploadForm');
    const courseSelect = document.getElementById('uploadCourse');

    // Fetch available courses dynamically and populate the dropdown
    fetch('http://localhost:8080/courses')
        .then(response => response.json())
        .then(courses => {
            // Clear existing options
            courseSelect.innerHTML = '<option value="">Choose a course</option>';

            // Populate the course options dynamically
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.courseCode;
                option.textContent = `${course.courseCode} - ${course.section}`;
                courseSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            alert('Failed to load courses');
        });

    // Handle form submission
    gradeUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const course = document.getElementById('uploadCourse').value;
        const gradeFile = document.getElementById('gradeFile').files[0];
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');

        if (!token) {
            alert('Please login first!');
            return;
        }

        if (!gradeFile) {
            alert('Please select a grade file!');
            return;
        }

        if (!course) {
            alert('Please select a course!');
            return;
        }

        // Create FormData object to send the file and course data
        const formData = new FormData();
        formData.append('file', gradeFile);
        formData.append('courseCode', course);
        formData.append('uploadedBy', username);

        // Send the grade upload request
        fetch('http://localhost:8080/grades/upload-excel', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Grades uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading grades:', error);
            alert('Error uploading grades!');
        });
    });
});
