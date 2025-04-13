document.addEventListener('DOMContentLoaded', function() {
    const gradeUploadForm = document.getElementById('gradeUploadForm');

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

        const formData = new FormData();
        formData.append('file', gradeFile);
        formData.append('courseCode', course);
        formData.append('uploadedBy', username);

        fetch('http://localhost:8080/grades/upload', {
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
