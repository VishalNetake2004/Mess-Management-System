let meals = JSON.parse(
    localStorage.getItem("messMeals")
) || [];

let editMealIndex = -1;


// Open Form

function openMealForm() {

    document.getElementById("mealForm").style.display =
        "block";

}


// Close Form

function closeMealForm() {

    document.getElementById("mealForm").style.display =
        "none";

    document.getElementById("mealFormData").reset();

    editMealIndex = -1;

    document.getElementById("mealFormTitle").innerText =
        "Add New Meal";

}


// Save Meal

document
    .getElementById("mealFormData")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const date =
            document.getElementById("mealDate").value;

        const type =
            document.getElementById("mealType").value;

        const menu =
            document.getElementById("mealMenu").value;

        const quantity =
            document.getElementById("mealQuantity").value;


        const meal = {

            date: date,

            type: type,

            menu: menu,

            quantity: quantity

        };


        if (editMealIndex !== -1) {

            meals[editMealIndex] = meal;

            editMealIndex = -1;

        } else {

            meals.push(meal);

        }


        localStorage.setItem(
            "messMeals",
            JSON.stringify(meals)
        );


        closeMealForm();

        displayMeals();

    });


// Display Meals

function displayMeals() {

    const table =
        document.getElementById("mealsTable");

    table.innerHTML = "";


    meals.forEach(function(meal, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                MEAL${String(index + 1).padStart(3, "0")}
            </td>

            <td>
                ${meal.date}
            </td>

            <td>
                <strong>${meal.type}</strong>
            </td>

            <td>
                ${meal.menu}
            </td>

            <td>
                ${meal.quantity}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editMeal(${index})"
                >
                    ✏️
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMeal(${index})"
                >
                    🗑️
                </button>

            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("totalMeals").innerText =
        `${meals.length} Records`;

}


// Edit Meal

function editMeal(index) {

    const meal = meals[index];


    document.getElementById("mealDate").value =
        meal.date;

    document.getElementById("mealType").value =
        meal.type;

    document.getElementById("mealMenu").value =
        meal.menu;

    document.getElementById("mealQuantity").value =
        meal.quantity;


    editMealIndex = index;


    document.getElementById("mealFormTitle").innerText =
        "Edit Meal";


    openMealForm();

}


// Delete Meal

function deleteMeal(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this meal record?"
        );


    if (confirmDelete) {

        meals.splice(index, 1);


        localStorage.setItem(
            "messMeals",
            JSON.stringify(meals)
        );


        displayMeals();

    }

}


// Date Filter

document
    .getElementById("searchDate")
    .addEventListener("change", function() {

        const selectedDate = this.value;

        const rows =
            document.querySelectorAll(
                "#mealsTable tr"
            );


        rows.forEach(function(row, index) {

            if (!selectedDate) {

                row.style.display = "";

                return;

            }


            if (meals[index].date === selectedDate) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });


// Load Records

displayMeals();