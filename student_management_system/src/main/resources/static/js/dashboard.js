window.onload = function () {

    loadDashboard();

    loadRecentStudents();

};

function loadDashboard() {

    fetch("http://localhost:8080/api/dashboard/summary")
        .then(response => response.json())
        .then(data => {

            document.getElementById("studentsCount").innerHTML = data.students;

            document.getElementById("facultyCount").innerHTML = data.faculty;

            document.getElementById("coursesCount").innerHTML = data.courses;

            document.getElementById("attendanceCount").innerHTML = data.attendance;

            document.getElementById("marksCount").innerHTML = data.marks;

            document.getElementById("departmentCount").innerHTML = data.departments;

        });

}

function loadRecentStudents() {

    fetch("http://localhost:8080/api/dashboard/recentStudents")
        .then(response => response.json())
        .then(data => {

            let table = "";

            data.forEach(student => {

                table += `
                <tr>
                    <td>${student.studentId}</td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.department}</td>
                </tr>
                `;

            });

            document.getElementById("recentStudents").innerHTML = table;

        });

}