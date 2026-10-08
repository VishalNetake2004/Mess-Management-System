// Get data from LocalStorage

const members =
    JSON.parse(
        localStorage.getItem("messMembers")
    ) || [];


const meals =
    JSON.parse(
        localStorage.getItem("messMeals")
    ) || [];


const attendance =
    JSON.parse(
        localStorage.getItem("messAttendance")
    ) || [];


const payments =
    JSON.parse(
        localStorage.getItem("messPayments")
    ) || [];


// ==============================
// MEMBERS
// ==============================

document.getElementById(
    "reportMembers"
).innerText =
    members.length;


// ==============================
// MEALS
// ==============================

let breakfast = 0;
let lunch = 0;
let dinner = 0;


meals.forEach(function(meal) {

    const quantity =
        Number(meal.quantity) || 0;


    if (meal.type === "Breakfast") {

        breakfast += quantity;

    }


    if (meal.type === "Lunch") {

        lunch += quantity;

    }


    if (meal.type === "Dinner") {

        dinner += quantity;

    }

});


const totalMeals =
    breakfast +
    lunch +
    dinner;


document.getElementById(
    "reportMeals"
).innerText =
    totalMeals;


document.getElementById(
    "breakfastTotal"
).innerText =
    breakfast;


document.getElementById(
    "lunchTotal"
).innerText =
    lunch;


document.getElementById(
    "dinnerTotal"
).innerText =
    dinner;


document.getElementById(
    "mealGrandTotal"
).innerText =
    totalMeals;


// ==============================
// PAYMENTS
// ==============================

let paidAmount = 0;
let pendingAmount = 0;


payments.forEach(function(payment) {

    const amount =
        Number(payment.amount) || 0;


    if (payment.status === "Paid") {

        paidAmount += amount;

    }


    if (payment.status === "Pending") {

        pendingAmount += amount;

    }

});


const totalPaymentAmount =
    paidAmount +
    pendingAmount;


document.getElementById(
    "reportCollection"
).innerText =
    `₹${paidAmount.toLocaleString("en-IN")}`;


document.getElementById(
    "paidTotal"
).innerText =
    `₹${paidAmount.toLocaleString("en-IN")}`;


document.getElementById(
    "pendingTotal"
).innerText =
    `₹${pendingAmount.toLocaleString("en-IN")}`;


document.getElementById(
    "paymentTotal"
).innerText =
    payments.length;


document.getElementById(
    "paymentGrandTotal"
).innerText =
    `₹${totalPaymentAmount.toLocaleString("en-IN")}`;


// ==============================
// ATTENDANCE
// ==============================

let present = 0;
let absent = 0;


attendance.forEach(function(record) {

    if (record.present === true) {

        present++;

    } else {

        absent++;

    }

});


const attendanceTotal =
    present + absent;


let attendancePercentage = 0;


if (attendanceTotal > 0) {

    attendancePercentage =
        Math.round(
            (present / attendanceTotal) * 100
        );

}


document.getElementById(
    "attendanceRecords"
).innerText =
    attendanceTotal;


document.getElementById(
    "attendancePresent"
).innerText =
    present;


document.getElementById(
    "attendanceAbsent"
).innerText =
    absent;


document.getElementById(
    "overallAttendance"
).innerText =
    `${attendancePercentage}%`;


document.getElementById(
    "reportAttendance"
).innerText =
    `${attendancePercentage}%`;


// ==============================
// MEMBER PAYMENT REPORT
// ==============================

const reportTable =
    document.getElementById(
        "memberReportTable"
    );


members.forEach(function(member, index) {


    let memberPaid = 0;
    let memberPending = 0;


    payments.forEach(function(payment) {

        if (
            payment.memberId === index
        ) {

            const amount =
                Number(payment.amount) || 0;


            if (
                payment.status === "Paid"
            ) {

                memberPaid += amount;

            }


            if (
                payment.status === "Pending"
            ) {

                memberPending += amount;

            }

        }

    });


    let status = "No Payment";


    if (memberPending > 0) {

        status = "Pending";

    }


    if (
        memberPaid > 0 &&
        memberPending === 0
    ) {

        status = "Paid";

    }


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            MEM${String(
                index + 1
            ).padStart(3, "0")}
        </td>

        <td>
            <strong>
                ${member.name}
            </strong>
        </td>

        <td>
            ₹${memberPaid.toLocaleString("en-IN")}
        </td>

        <td>
            ₹${memberPending.toLocaleString("en-IN")}
        </td>

        <td>

            <span class="${
                status === "Paid"
                    ? "status-paid"
                    : status === "Pending"
                    ? "status-pending"
                    : ""
            }">

                ${status}

            </span>

        </td>

    `;


    reportTable.appendChild(row);

});