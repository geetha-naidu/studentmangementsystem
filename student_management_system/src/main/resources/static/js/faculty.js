let currentFacultyId = null;

loadFaculty();

function loadFaculty() {

    fetch("http://localhost:8080/api/faculty")
        .then(response => response.json())
        .then(data => {

            let rows = "";

            data.forEach(faculty => {

                rows += `
                <tr>

                    <td>${faculty.facultyId}</td>

                    <td>${faculty.facultyName}</td>

                    <td>${faculty.department}</td>

                    <td>${faculty.designation}</td>

                    <td>${faculty.email}</td>

                    <td>${faculty.phone}</td>

                    <td>

                        <button class="edit-btn"
                        onclick="editFaculty(${faculty.facultyId})">
                        Edit
                        </button>

                        <button class="delete-btn"
                        onclick="deleteFaculty(${faculty.facultyId})">
                        Delete
                        </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("facultyTable").innerHTML = rows;

        })
        .catch(error => console.log(error));

}

function addFaculty() {

    const faculty = {

        facultyName: document.getElementById("facultyName").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        department: document.getElementById("department").value,

        designation: document.getElementById("designation").value,

        joiningDate: document.getElementById("joiningDate").value

    };

    const url = currentFacultyId
        ? `http://localhost:8080/api/faculty/${currentFacultyId}`
        : "http://localhost:8080/api/faculty";

    const method = currentFacultyId
        ? "PUT"
        : "POST";

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(faculty)

    })

        .then(response => response.json())

        .then(data => {

            alert(currentFacultyId
                ? "Faculty Updated Successfully"
                : "Faculty Added Successfully");

            clearForm();

            currentFacultyId = null;

            loadFaculty();

        })

        .catch(error => console.log(error));

}

function editFaculty(id) {

    fetch(`http://localhost:8080/api/faculty/${id}`)

        .then(response => response.json())

        .then(faculty => {

            document.getElementById("facultyName").value =
                faculty.facultyName;

            document.getElementById("email").value =
                faculty.email;

            document.getElementById("phone").value =
                faculty.phone;

            document.getElementById("department").value =
                faculty.department;

            document.getElementById("designation").value =
                faculty.designation;

            document.getElementById("joiningDate").value =
                faculty.joiningDate;

            currentFacultyId = id;

        })

        .catch(error => console.log(error));

}

function deleteFaculty(id) {

    if (!confirm("Are you sure you want to delete this faculty?")) {

        return;

    }

    fetch(`http://localhost:8080/api/faculty/${id}`, {

        method: "DELETE"

    })

        .then(() => {

            alert("Faculty Deleted Successfully");

            loadFaculty();

        })

        .catch(error => console.log(error));

}

function clearForm() {

    document.getElementById("facultyName").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("department").value = "";

    document.getElementById("designation").value = "";

    document.getElementById("joiningDate").value = "";

}