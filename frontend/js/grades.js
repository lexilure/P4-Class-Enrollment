document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');

    if (!token) {
        alert('Please login first!');
        return;
    }

    fetch(`http://localhost:8080/grades/student/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(grades => {
        const gradesTable = document.querySelector('.grades-table tbody');
        gradesTable.innerHTML = '';
        
        grades.forEach(grade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade.courseCode}</td>
                <td>${grade.courseName}</td>
                <td>${grade.section}</td>
                <td>${grade.grade}</td>
                <td>${grade.term}</td>
            `;
            gradesTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching grades:', error);
    });
});
