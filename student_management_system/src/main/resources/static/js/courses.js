let currentCourseId = null;

loadCourses();

function loadCourses() {

    fetch("http://localhost:8080/api/courses")
        .then(response => response.json())
        .then(data => {

            let rows = "";

            data.forEach(course => {

                rows += `
                <tr>

                    <td>${course.courseId}</td>

                    <td>${course.courseCode}</td>

                    <td>${course.courseName}</td>

                    <td>${course.department}</td>

                    <td>${course.credits}</td>

                    <td>${course.semester}</td>

                    <td>${course.faculty ? course.faculty.facultyName : ""}</td>

                    <td>

                        <button class="edit-btn"
                        onclick="editCourse(${course.courseId})">
                            Edit
                        </button>

                        <button class="delete-btn"
                        onclick="deleteCourse(${course.courseId})">
                            Delete
                        </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("courseTable").innerHTML = rows;

        })
        .catch(error => console.log(error));

}

function addCourse() {

    const course = {

        courseCode: document.getElementById("courseCode").value,

        courseName: document.getElementById("courseName").value,

        department: document.getElementById("department").value,

        credits: parseInt(document.getElementById("credits").value),

        semester: parseInt(document.getElementById("semester").value),

        faculty: {
            facultyId: parseInt(document.getElementById("facultyId").value)
        }

    };

    const url = currentCourseId
        ? `http://localhost:8080/api/courses/${currentCourseId}`
        : "http://localhost:8080/api/courses";

    const method = currentCourseId
        ? "PUT"
        : "POST";

    fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(course)

    })

        .then(response => response.json())

        .then(data => {

            alert(
                currentCourseId
                    ? "Course Updated Successfully"
                    : "Course Added Successfully"
            );

            currentCourseId = null;

            clearForm();

            loadCourses();

        })

        .catch(error => console.log(error));

}

function editCourse(id) {

    fetch(`http://localhost:8080/api/courses/${id}`)

        .then(response => response.json())

        .then(course => {

            document.getElementById("courseCode").value =
                course.courseCode;

            document.getElementById("courseName").value =
                course.courseName;

            document.getElementById("department").value =
                course.department;

            document.getElementById("credits").value =
                course.credits;

            document.getElementById("semester").value =
                course.semester;

            document.getElementById("facultyId").value =
                course.faculty.facultyId;

            currentCourseId = id;

        })

        .catch(error => console.log(error));

}

function deleteCourse(id) {

    if (!confirm("Are you sure you want to delete this course?")) {

        return;

    }

    fetch(`http://localhost:8080/api/courses/${id}`, {

        method: "DELETE"

    })

        .then(() => {

            alert("Course Deleted Successfully");

            loadCourses();

        })

        .catch(error => console.log(error));

}

function clearForm() {

    document.getElementById("courseCode").value = "";

    document.getElementById("courseName").value = "";

    document.getElementById("department").value = "";

    document.getElementById("credits").value = "";

    document.getElementById("semester").value = "";

    document.getElementById("facultyId").value = "";

}