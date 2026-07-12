let currentAttendanceId = null;

loadAttendance();

function loadAttendance() {

    fetch("http://localhost:8080/api/attendance")
        .then(response => response.json())
        .then(data => {

            let rows = "";

            data.forEach(attendance => {

                rows += `
                <tr>

                    <td>${attendance.attendanceId}</td>

                    <td>${attendance.student.firstName}</td>

                    <td>${attendance.course.courseName}</td>

                    <td>${attendance.attendanceDate}</td>

                    <td>${attendance.status}</td>

                    <td>

                        <button class="edit-btn"
                        onclick="editAttendance(${attendance.attendanceId})">
                        Edit
                        </button>

                        <button class="delete-btn"
                        onclick="deleteAttendance(${attendance.attendanceId})">
                        Delete
                        </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("attendanceTable").innerHTML = rows;

        });

}

function saveAttendance() {

    const attendance = {

        student: {
            studentId: parseInt(document.getElementById("studentId").value)
        },

        course: {
            courseId: parseInt(document.getElementById("courseId").value)
        },

        attendanceDate:
        document.getElementById("attendanceDate").value,

        status:
        document.getElementById("status").value

    };

    const url = currentAttendanceId
        ? `http://localhost:8080/api/attendance/${currentAttendanceId}`
        : "http://localhost:8080/api/attendance";

    const method = currentAttendanceId
        ? "PUT"
        : "POST";

    fetch(url, {

        method: method,

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(attendance)

    })

        .then(response=>response.json())

        .then(data=>{

            alert(currentAttendanceId
                ? "Attendance Updated Successfully"
                : "Attendance Saved Successfully");

            currentAttendanceId = null;

            clearAttendanceForm();

            loadAttendance();

        });

}

function editAttendance(id){

    fetch(`http://localhost:8080/api/attendance/${id}`)

        .then(response=>response.json())

        .then(attendance=>{

            document.getElementById("studentId").value =
                attendance.student.studentId;

            document.getElementById("courseId").value =
                attendance.course.courseId;

            document.getElementById("attendanceDate").value =
                attendance.attendanceDate;

            document.getElementById("status").value =
                attendance.status;

            currentAttendanceId=id;

        });

}

function deleteAttendance(id){

    if(!confirm("Delete Attendance?"))
        return;

    fetch(`http://localhost:8080/api/attendance/${id}`,{

        method:"DELETE"

    })

        .then(()=>{

            alert("Attendance Deleted");

            loadAttendance();

        });

}

function clearAttendanceForm(){

    document.getElementById("studentId").value="";

    document.getElementById("courseId").value="";

    document.getElementById("attendanceDate").value="";

    document.getElementById("status").value="Present";

}