let currentStudentId = null;

// ===============================
// Load Students when page opens
// ===============================
window.onload = function () {
    loadStudents();
};

// ===============================
// Load All Students
// ===============================
function loadStudents() {

    fetch("http://localhost:8080/api/students")
        .then(response => response.json())
        .then(data => {

            let rows = "";

            data.forEach(student => {

                rows += `
                <tr>

                    <td>${student.studentId}</td>

                    <td>${student.rollNumber}</td>

                    <td>${student.firstName} ${student.lastName}</td>

                    <td>${student.department}</td>

                    <td>${student.yearOfStudy}</td>

                    <td>${student.email}</td>

                    <td>${student.phone}</td>

                    <td>

                        <button class="edit-btn"
                                onclick="editStudent(${student.studentId})">
                            Edit
                        </button>

                        <button class="delete-btn"
                                onclick="deleteStudent(${student.studentId})">
                            Delete
                        </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("studentTable").innerHTML = rows;

        })
        .catch(error => console.error(error));

}

// ===============================
// Add / Update Student
// ===============================
function addStudent() {

    const student = {

        rollNumber: document.getElementById("rollNumber").value,

        firstName: document.getElementById("firstName").value,

        lastName: document.getElementById("lastName").value,

        gender: document.getElementById("gender").value,

        dateOfBirth: document.getElementById("dateOfBirth").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        department: document.getElementById("department").value,

        yearOfStudy: document.getElementById("yearOfStudy").value,

        admissionDate: "2023-06-01"

    };

    const url = currentStudentId
        ? `http://localhost:8080/api/students/${currentStudentId}`
        : "http://localhost:8080/api/students";

    const method = currentStudentId
        ? "PUT"
        : "POST";

    fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })
        .then(response => response.json())
        .then(() => {

            alert(
                currentStudentId
                    ? "Student Updated Successfully"
                    : "Student Added Successfully"
            );

            clearForm();

            currentStudentId = null;

            loadStudents();

        })
        .catch(error => console.error(error));

}

// ===============================
// Edit Student
// ===============================
function editStudent(id) {

    fetch(`http://localhost:8080/api/students/${id}`)
        .then(response => response.json())
        .then(student => {

            document.getElementById("rollNumber").value =
                student.rollNumber;

            document.getElementById("firstName").value =
                student.firstName;

            document.getElementById("lastName").value =
                student.lastName;

            document.getElementById("gender").value =
                student.gender;

            document.getElementById("dateOfBirth").value =
                student.dateOfBirth;

            document.getElementById("email").value =
                student.email;

            document.getElementById("phone").value =
                student.phone;

            document.getElementById("address").value =
                student.address;

            document.getElementById("department").value =
                student.department;

            document.getElementById("yearOfStudy").value =
                student.yearOfStudy;

            currentStudentId = id;

        })
        .catch(error => console.error(error));

}

// ===============================
// Delete Student
// ===============================
function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch(`http://localhost:8080/api/students/${id}`, {

        method: "DELETE"

    })
        .then(() => {

            alert("Student Deleted Successfully");

            loadStudents();

        })
        .catch(error => console.error(error));

}

// ===============================
// Clear Form
// ===============================
function clearForm() {

    document.getElementById("rollNumber").value = "";

    document.getElementById("firstName").value = "";

    document.getElementById("lastName").value = "";

    document.getElementById("gender").value = "";

    document.getElementById("dateOfBirth").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("address").value = "";

    document.getElementById("department").value = "";

    document.getElementById("yearOfStudy").value = "";

    currentStudentId = null;

}