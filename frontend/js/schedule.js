document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');

    if (!token) {
        alert('Please login first!');
        return;
    }

    fetch(`http://localhost:8080/schedule/student/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(schedule => {
        const scheduleTableBody = document.getElementById('scheduleBody');
        scheduleTableBody.innerHTML = '';

        schedule.forEach(classItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${classItem.time}</td>
                <td>${classItem.monday}</td>
                <td>${classItem.tuesday}</td>
                <td>${classItem.wednesday}</td>
                <td>${classItem.thursday}</td>
                <td>${classItem.friday}</td>
            `;
            scheduleTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching schedule:', error);
    });
});
