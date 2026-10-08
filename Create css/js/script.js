// Theme Button

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});


// Quick Actions

function addMember() {
    alert("Add Member feature will be available soon!");
}

function recordMeal() {
    alert("Meal recording feature will be available soon!");
}

function addPayment() {
    alert("Payment feature will be available soon!");
}

function viewReport() {
    alert("Reports feature will be available soon!");
}
