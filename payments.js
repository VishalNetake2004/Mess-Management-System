// Get members

let members = JSON.parse(
    localStorage.getItem("messMembers")
) || [];


// Get payments

let payments = JSON.parse(
    localStorage.getItem("messPayments")
) || [];


// Edit index

let editPaymentIndex = -1;


// Today's date

const today =
    new Date().toISOString().split("T")[0];


// Set today's date

document.getElementById(
    "paymentDate"
).value = today;


// Load Members into dropdown

function loadMembers() {

    const select =
        document.getElementById(
            "paymentMember"
        );


    select.innerHTML =
        `<option value="">Select Member</option>`;


    members.forEach(function(member, index) {

        const option =
            document.createElement("option");


        option.value = index;


        option.textContent =
            `MEM${String(index + 1).padStart(3, "0")} - ${member.name}`;


        select.appendChild(option);

    });

}


// Open Form

function openPaymentForm() {

    document.getElementById(
        "paymentForm"
    ).style.display = "block";

}


// Close Form

function closePaymentForm() {

    document.getElementById(
        "paymentForm"
    ).style.display = "none";


    document.getElementById(
        "paymentFormData"
    ).reset();


    document.getElementById(
        "paymentDate"
    ).value = today;


    editPaymentIndex = -1;


    document.getElementById(
        "paymentFormTitle"
    ).innerText =
        "Add New Payment";

}


// Save Payment

document.getElementById(
    "paymentFormData"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const memberId =
            Number(
                document.getElementById(
                    "paymentMember"
                ).value
            );


        const amount =
            Number(
                document.getElementById(
                    "paymentAmount"
                ).value
            );


        const date =
            document.getElementById(
                "paymentDate"
            ).value;


        const month =
            document.getElementById(
                "paymentMonth"
            ).value;


        const method =
            document.getElementById(
                "paymentMethod"
            ).value;


        const status =
            document.getElementById(
                "paymentStatus"
            ).value;


        const payment = {

            memberId: memberId,

            amount: amount,

            date: date,

            month: month,

            method: method,

            status: status

        };


        // Edit

        if (editPaymentIndex !== -1) {

            payments[
                editPaymentIndex
            ] = payment;


            editPaymentIndex = -1;

        }


        // Add

        else {

            payments.push(payment);

        }


        // Save

        localStorage.setItem(
            "messPayments",
            JSON.stringify(payments)
        );


        closePaymentForm();

        displayPayments();

    }
);


// Display Payments

function displayPayments() {

    const table =
        document.getElementById(
            "paymentsTable"
        );


    table.innerHTML = "";


    payments.forEach(
        function(payment, index) {


            const member =
                members[payment.memberId];


            const memberName =
                member
                    ? member.name
                    : "Unknown Member";


            const memberId =
                `MEM${String(
                    payment.memberId + 1
                ).padStart(3, "0")}`;


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    PAY${String(
                        index + 1
                    ).padStart(3, "0")}
                </td>


                <td>

                    <strong>
                        ${memberName}
                    </strong>

                    <br>

                    <small>
                        ${memberId}
                    </small>

                </td>


                <td>
                    ₹${payment.amount}
                </td>


                <td>
                    ${payment.date}
                </td>


                <td>
                    ${payment.month}
                </td>


                <td>
                    ${payment.method}
                </td>


                <td>

                    <span class="${
                        payment.status === "Paid"
                            ? "status-paid"
                            : "status-pending"
                    }">

                        ${payment.status}

                    </span>

                </td>


                <td>

                    <button
                        class="edit-btn"
                        onclick="editPayment(${index})"
                    >
                        ✏️
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deletePayment(${index})"
                    >
                        🗑️
                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );


    document.getElementById(
        "paymentRecordCount"
    ).innerText =
        `${payments.length} Records`;


    updatePaymentSummary();

}


// Update Summary

function updatePaymentSummary() {

    let totalCollected = 0;

    let pendingAmount = 0;


    payments.forEach(function(payment) {

        if (payment.status === "Paid") {

            totalCollected +=
                Number(payment.amount);

        }


        if (payment.status === "Pending") {

            pendingAmount +=
                Number(payment.amount);

        }

    });


    const paidMemberIds =
        new Set();


    payments.forEach(function(payment) {

        if (payment.status === "Paid") {

            paidMemberIds.add(
                payment.memberId
            );

        }

    });


    document.getElementById(
        "totalCollected"
    ).innerText =
        `₹${totalCollected.toLocaleString("en-IN")}`;


    document.getElementById(
        "pendingAmount"
    ).innerText =
        `₹${pendingAmount.toLocaleString("en-IN")}`;


    document.getElementById(
        "totalPayments"
    ).innerText =
        payments.length;


    document.getElementById(
        "paidMembers"
    ).innerText =
        paidMemberIds.size;

}


// Edit Payment

function editPayment(index) {

    const payment =
        payments[index];


    document.getElementById(
        "paymentMember"
    ).value =
        payment.memberId;


    document.getElementById(
        "paymentAmount"
    ).value =
        payment.amount;


    document.getElementById(
        "paymentDate"
    ).value =
        payment.date;


    document.getElementById(
        "paymentMonth"
    ).value =
        payment.month;


    document.getElementById(
        "paymentMethod"
    ).value =
        payment.method;


    document.getElementById(
        "paymentStatus"
    ).value =
        payment.status;


    editPaymentIndex = index;


    document.getElementById(
        "paymentFormTitle"
    ).innerText =
        "Edit Payment";


    openPaymentForm();

}


// Delete Payment

function deletePayment(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this payment?"
        );


    if (confirmDelete) {

        payments.splice(
            index,
            1
        );


        localStorage.setItem(
            "messPayments",
            JSON.stringify(payments)
        );


        displayPayments();

    }

}


// Search Payments

document.getElementById(
    "searchPayment"
).addEventListener(
    "input",
    function() {

        const search =
            this.value.toLowerCase();


        const rows =
            document.querySelectorAll(
                "#paymentsTable tr"
            );


        rows.forEach(function(row) {

            const text =
                row.innerText.toLowerCase();


            row.style.display =
                text.includes(search)
                    ? ""
                    : "none";

        });

    }
);


// Initial Load

loadMembers();

displayPayments();