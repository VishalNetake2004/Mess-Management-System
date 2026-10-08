// =====================================
// LOAD SETTINGS
// =====================================

const settings =
    JSON.parse(
        localStorage.getItem("messSettings")
    ) || {};


document.getElementById("messName").value =
    settings.messName || "";


document.getElementById("managerName").value =
    settings.managerName || "";


document.getElementById("monthlyFee").value =
    settings.monthlyFee || "";


// =====================================
// SAVE SETTINGS
// =====================================

document
    .getElementById("saveSettings")
    .addEventListener("click", function() {

        const newSettings = {

            messName:
                document.getElementById("messName").value,

            managerName:
                document.getElementById("managerName").value,

            monthlyFee:
                document.getElementById("monthlyFee").value

        };


        localStorage.setItem(
            "messSettings",
            JSON.stringify(newSettings)
        );


        alert("Settings saved successfully!");
    });


// =====================================
// DARK MODE
// =====================================

const themeBtn =
    document.getElementById("themeBtn");


const darkModeToggle =
    document.getElementById(
        "darkModeToggle"
    );


function applyTheme() {

    const theme =
        localStorage.getItem("messTheme");


    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        themeBtn.innerText = "☀️";

        darkModeToggle.innerText =
            "☀️ Light Mode";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        themeBtn.innerText = "🌙";

        darkModeToggle.innerText =
            "🌙 Dark Mode";
    }
}


applyTheme();


themeBtn.addEventListener(
    "click",
    function() {

        const isDark =
            document.body.classList.toggle(
                "dark-mode"
            );


        localStorage.setItem(
            "messTheme",
            isDark ? "dark" : "light"
        );


        applyTheme();
    }
);


darkModeToggle.addEventListener(
    "click",
    function() {

        const isDark =
            document.body.classList.toggle(
                "dark-mode"
            );


        localStorage.setItem(
            "messTheme",
            isDark ? "dark" : "light"
        );


        applyTheme();
    }
);


// =====================================
// RESET DATA
// =====================================

document
    .getElementById("resetData")
    .addEventListener("click", function() {

        const confirmReset =
            confirm(
                "Are you sure you want to delete all project data?"
            );


        if (!confirmReset) {

            return;

        }


        localStorage.removeItem(
            "messMembers"
        );

        localStorage.removeItem(
            "messMeals"
        );

        localStorage.removeItem(
            "messAttendance"
        );

        localStorage.removeItem(
            "messPayments"
        );


        alert(
            "All demo data has been reset."
        );


        location.reload();

    });