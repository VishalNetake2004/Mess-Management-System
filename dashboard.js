// =====================================
// GET DATA FROM LOCAL STORAGE
// =====================================

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


// =====================================
// TODAY'S DATE
// =====================================

const today =
    new Date()
        .toISOString()
        .split("T")[0];


// =====================================
// TOTAL MEMBERS
// =====================================

document.getElementById(
    "dashboardMembers"
).innerText =
    members.length;


// =====================================
// TODAY'S MEALS
// =====================================

const todayMeals =
    meals.filter(function(meal) {

        return meal.date === today;

    });


let totalMealsToday = 0;


todayMeals.forEach(function(meal) {

    totalMealsToday +=
        Number(meal.quantity) || 0;

});


document.getElementById(
    "dashboardMeals"
).innerText =
    totalMealsToday;


// =====================================
// DISPLAY TODAY'S MEALS
// =====================================

const mealList =
    document.getElementById(
        "dashboardMealList"
    );


mealList.innerHTML = "";


if (todayMeals.length === 0) {

    mealList.innerHTML = `
        <p class="empty-message">
            No meals recorded today.
        </p>
    `;

} else {

    todayMeals.forEach(function(meal) {

        const mealItem =
            document.createElement("div");


        mealItem.className =
            "dashboard-meal-item";


        mealItem.innerHTML = `

            <div>

                <strong>
                    ${meal.type}
                </strong>

                <p>
                    ${meal.menu || "Menu not available"}
                </p>

            </div>

            <span>
                ${meal.quantity || 0}
            </span>

        `;


        mealList.appendChild(
            mealItem
        );

    });

}


// =====================================
// TODAY'S ATTENDANCE
// =====================================

const todayAttendance =
    attendance.filter(function(record) {

        return record.date === today;

    });


let present = 0;
let absent = 0;


todayAttendance.forEach(function(record) {

    if (record.present === true) {

        present++;

    } else {

        absent++;

    }

});


const attendanceRecords =
    present + absent;


let attendancePercentage = 0;


if (attendanceRecords > 0) {

    attendancePercentage =
        Math.round(
            (present / attendanceRecords) * 100
        );

}


document.getElementById(
    "dashboardAttendance"
).innerText =
    attendancePercentage + "%";


document.getElementById(
    "dashboardAttendanceTotal"
).innerText =
    attendanceRecords;


document.getElementById(
    "dashboardPresent"
).innerText =
    present;


document.getElementById(
    "dashboardAbsent"
).innerText =
    absent;


// =====================================
// PAYMENTS
// =====================================

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


document.getElementById(
    "dashboardCollection"
).innerText =
    `₹${paidAmount.toLocaleString("en-IN")}`;


document.getElementById(
    "dashboardPaid"
).innerText =
    `₹${paidAmount.toLocaleString("en-IN")}`;


document.getElementById(
    "dashboardPending"
).innerText =
    `₹${pendingAmount.toLocaleString("en-IN")}`;


// =====================================
// DARK MODE
// =====================================

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


const savedTheme =
    localStorage.getItem(
        "messTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeBtn.innerText = "☀️";

}


themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "messTheme",
            isDark
                ? "dark"
                : "light"
        );


        themeBtn.innerText =
            isDark
                ? "☀️"
                : "🌙";

    }
);