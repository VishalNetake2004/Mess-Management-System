// Get Members from LocalStorage

let members = JSON.parse(
    localStorage.getItem("messMembers")
) || [];


// Attendance data

let attendance = JSON.parse(
    localStorage.getItem("messAttendance")
) || [];


// Today's date

const today =
    new Date().toISOString().split("T")[0];


document.getElementById(
    "attendanceDate"
).value = today;


// Display Members

function displayAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    table.innerHTML = "";


    const selectedDate =
        document.getElementById(
            "attendanceDate"
        ).value;


    const selectedMeal =
        document.getElementById(
            "attendanceMeal"
        ).value;


    document.getElementById(
        "selectedMeal"
    ).innerText =
        selectedMeal;


    document.getElementById(
        "attendanceTotal"
    ).innerText =
        members.length;


    members.forEach(function(member, index) {


        // Check previous attendance

        const existing =
            attendance.find(function(record) {

                return (
                    record.memberId === index &&
                    record.date === selectedDate &&
                    record.meal === selectedMeal
                );

            });


        const isPresent =
            existing
                ? existing.present
                : false;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                MEM${String(index + 1).padStart(3, "0")}
            </td>

            <td>
                <strong>
                    ${member.name}
                </strong>
            </td>

            <td>
                ${member.mobile}
            </td>

            <td>

                <label class="attendance-switch">

                    <input
                        type="checkbox"
                        class="attendance-checkbox"
                        data-member="${index}"
                        ${isPresent ? "checked" : ""}
                    >

                    <span>
                        ${isPresent ? "Present" : "Absent"}
                    </span>

                </label>

            </td>

        `;


        table.appendChild(row);

    });


    updateSummary();

}


// Update Summary

function updateSummary() {

    const checkboxes =
        document.querySelectorAll(
            ".attendance-checkbox"
        );


    let present = 0;


    checkboxes.forEach(function(checkbox) {

        if (checkbox.checked) {

            present++;

        }

    });


    const total =
        members.length;


    const absent =
        total - present;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (present / total) * 100
            );

    }


    document.getElementById(
        "presentCount"
    ).innerText = present;


    document.getElementById(
        "absentCount"
    ).innerText = absent;


    document.getElementById(
        "attendancePercentage"
    ).innerText =
        percentage + "%";


    // Update text beside checkbox

    document
        .querySelectorAll(
            ".attendance-checkbox"
        )
        .forEach(function(checkbox) {

            const label =
                checkbox.parentElement;


            const text =
                label.querySelector("span");


            if (checkbox.checked) {

                text.innerText =
                    "Present";

            } else {

                text.innerText =
                    "Absent";

            }

        });

}


// Save Attendance

function saveAttendance() {

    const selectedDate =
        document.getElementById(
            "attendanceDate"
        ).value;


    const selectedMeal =
        document.getElementById(
            "attendanceMeal"
        ).value;


    const checkboxes =
        document.querySelectorAll(
            ".attendance-checkbox"
        );


    // Remove old records
    // for this date and meal

    attendance =
        attendance.filter(function(record) {

            return !(
                record.date === selectedDate &&
                record.meal === selectedMeal
            );

        });


    checkboxes.forEach(function(checkbox) {

        const memberId =
            Number(
                checkbox.dataset.member
            );


        attendance.push({

            memberId: memberId,

            date: selectedDate,

            meal: selectedMeal,

            present: checkbox.checked

        });

    });


    localStorage.setItem(
        "messAttendance",
        JSON.stringify(attendance)
    );


    alert(
        "Attendance saved successfully!"
    );


    updateSummary();

}


// Change Date

document.getElementById(
    "attendanceDate"
).addEventListener(
    "change",
    displayAttendance
);


// Change Meal

document.getElementById(
    "attendanceMeal"
).addEventListener(
    "change",
    displayAttendance
);


// Checkbox change

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.classList.contains(
                "attendance-checkbox"
            )
        ) {

            updateSummary();

        }

    }
);


// Initial Load

displayAttendance();