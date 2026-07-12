let currentMarksId = null;

loadMarks();

function loadMarks() {

    fetch("http://localhost:8080/api/marks")
        .then(response => response.json())
        .then(data => {

            let rows = "";

            data.forEach(mark => {

                rows += `
                <tr>

                    <td>${mark.markId}</td>

                    <td>${mark.student.firstName}</td>

                    <td>${mark.course.courseName}</td>

                    <td>${mark.internalMarks}</td>

                    <td>${mark.externalMarks}</td>

                    <td>${mark.totalMarks}</td>

                    <td>${mark.grade}</td>

                    <td>

                        <button class="edit-btn"
                        onclick="editMarks(${mark.markId})">
                        Edit
                        </button>

                        <button class="delete-btn"
                        onclick="deleteMarks(${mark.markId})">
                        Delete
                        </button>

                    </td>

                </tr>
                `;

            });

            document.getElementById("marksTable").innerHTML = rows;

        });

}

function saveMarks() {

    const internal =
        parseFloat(document.getElementById("internalMarks").value);

    const external =
        parseFloat(document.getElementById("externalMarks").value);

    const total = internal + external;

    let grade = "";

    if(total >= 90)
        grade = "A+";
    else if(total >= 80)
        grade = "A";
    else if(total >= 70)
        grade = "B";
    else if(total >= 60)
        grade = "C";
    else
        grade = "F";

    const marks = {

        student:{
            studentId:parseInt(document.getElementById("studentId").value)
        },

        course:{
            courseId:parseInt(document.getElementById("courseId").value)
        },

        internalMarks:internal,

        externalMarks:external,

        totalMarks:total,

        grade:grade

    };

    const url = currentMarksId
        ? `http://localhost:8080/api/marks/${currentMarksId}`
        : "http://localhost:8080/api/marks";

    const method = currentMarksId
        ? "PUT"
        : "POST";

    fetch(url,{

        method:method,

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(marks)

    })

        .then(response=>response.json())

        .then(data=>{

            alert(currentMarksId
                ? "Marks Updated Successfully"
                : "Marks Added Successfully");

            currentMarksId = null;

            clearMarksForm();

            loadMarks();

        });

}

function editMarks(id){

    fetch(`http://localhost:8080/api/marks/${id}`)

        .then(response=>response.json())

        .then(mark=>{

            document.getElementById("studentId").value =
                mark.student.studentId;

            document.getElementById("courseId").value =
                mark.course.courseId;

            document.getElementById("internalMarks").value =
                mark.internalMarks;

            document.getElementById("externalMarks").value =
                mark.externalMarks;

            currentMarksId=id;

        });

}

function deleteMarks(id){

    if(!confirm("Delete Marks?"))
        return;

    fetch(`http://localhost:8080/api/marks/${id}`,{

        method:"DELETE"

    })

        .then(()=>{

            alert("Marks Deleted Successfully");

            loadMarks();

        });

}

function clearMarksForm(){

    document.getElementById("studentId").value="";

    document.getElementById("courseId").value="";

    document.getElementById("internalMarks").value="";

    document.getElementById("externalMarks").value="";

}