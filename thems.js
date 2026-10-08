// =====================================
// COMMON DARK MODE
// =====================================

const themeBtn = document.getElementById("themeBtn");


// Apply saved theme when page opens

const savedTheme = localStorage.getItem("messTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeBtn) {
        themeBtn.innerText = "☀️";
    }
}


// Dark mode button

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "messTheme",
            isDark ? "dark" : "light"
        );

        themeBtn.innerText =
            isDark ? "☀️" : "🌙";

    });

}