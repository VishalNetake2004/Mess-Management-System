let members = JSON.parse(
    localStorage.getItem("messMembers")
) || [];

let editIndex = -1;

// =====================================
// TOAST MESSAGE
// =====================================

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "toast";

    if (type === "error") {
        toast.classList.add("error");
    }

    toast.style.display = "block";

    setTimeout(function() {
        toast.style.display = "none";
    }, 2500);

}


// =====================================
// OPEN FORM
// =====================================

function openMemberForm() {

    document.getElementById("memberForm").style.display = "block";

}


// =====================================
// CLOSE FORM
// =====================================

function closeMemberForm() {

    document.getElementById("memberForm").style.display = "none";

    document.getElementById("memberFormData").reset();

    editIndex = -1;

    document.getElementById("formTitle").innerText =
        "Add New Member";

}


// =====================================
// SAVE MEMBER
// =====================================

document
    .getElementById("memberFormData")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("memberName").value.trim();

        const mobile =
            document.getElementById("memberMobile").value.trim();

        const room =
            document.getElementById("memberRoom").value.trim();

        const date =
            document.getElementById("memberDate").value;

        const payment =
            document.getElementById("memberPayment").value;


        // =====================================
        // FORM VALIDATION
        // =====================================

        if (name === "") {

            showToast("Please enter member name.", "error");
            document.getElementById("memberName").focus();

            return;
        }


        // Mobile number validation
        if (!/^[6-9]\d{9}$/.test(mobile)) {

            showToast(
            "Please enter a valid 10-digit mobile number.",
            "error" 
        );
            document.getElementById("memberMobile").focus();

            return;
        }


        if (room === "") {

            showToast("Please enter room number.", "error");

            document.getElementById("memberRoom").focus();

            return;
        }


        if (date === "") {

            showToast("Please select joining date.", "error");

            document.getElementById("memberDate").focus();

            return;
        }


        // =====================================
        // CHECK DUPLICATE MOBILE
        // =====================================

        const duplicateMobile = members.some(
            function(member, index) {

                return (
                    member.mobile === mobile &&
                    index !== editIndex
                );

            }
        );


        if (duplicateMobile) {

            showToast(
                "This mobile number is already registered.",
                "error"
        );

            document.getElementById("memberMobile").focus();

            return;
        }


        // =====================================
        // CREATE MEMBER
        // =====================================

        const member = {

            name: name,

            mobile: mobile,

            room: room,

            date: date,

            payment: payment

        };


        // =====================================
        // EDIT EXISTING MEMBER
        // =====================================

        if (editIndex !== -1) {

            members[editIndex] = member;

            showToast ("Member updated successfully.");

            editIndex = -1;

        }


        // =====================================
        // ADD NEW MEMBER
        // =====================================

        else {

            members.push(member);

            showToast("Member added successfully.");
        }


        // =====================================
        // SAVE TO LOCAL STORAGE
        // =====================================

        localStorage.setItem(
            "messMembers",
            JSON.stringify(members)
        );


        closeMemberForm();

        displayMembers();

    });


// =====================================
// DISPLAY MEMBERS
// =====================================

function displayMembers() {

    const table =
        document.getElementById("membersTable");


    table.innerHTML = "";


    members.forEach(function(member, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>MEM${String(index + 1).padStart(3, "0")}</td>

            <td>
                <strong>${member.name}</strong>
            </td>

            <td>${member.mobile}</td>

            <td>${member.room}</td>

            <td>${member.date}</td>

            <td>

                <span class="${
                    member.payment === "Paid"
                    ? "status-paid"
                    : "status-pending"
                }">

                    ${member.payment}

                </span>

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editMember(${index})"
                >
                    ✏️
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMember(${index})"
                >
                    🗑️
                </button>

            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("totalMembers").innerText =
        `${members.length} Members`;

}


// =====================================
// EDIT MEMBER
// =====================================

function editMember(index) {

    const member = members[index];


    document.getElementById("memberName").value =
        member.name;

    document.getElementById("memberMobile").value =
        member.mobile;

    document.getElementById("memberRoom").value =
        member.room;

    document.getElementById("memberDate").value =
        member.date;

    document.getElementById("memberPayment").value =
        member.payment;


    editIndex = index;


    document.getElementById("formTitle").innerText =
        "Edit Member";


    openMemberForm();

}


// =====================================
// DELETE MEMBER
// =====================================

function deleteMember(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this member?"
        );


    if (confirmDelete) {

        members.splice(index, 1);


        localStorage.setItem(
            "messMembers",
            JSON.stringify(members)
        );


        displayMembers();

        showToast("Member deleted successfully.");
    }

}


// =====================================
// SEARCH MEMBER
// =====================================

document
    .getElementById("searchMember")
    .addEventListener("input", function() {

        const search =
            this.value.toLowerCase();


        const rows =
            document.querySelectorAll(
                "#membersTable tr"
            );


        rows.forEach(function(row) {

            const text =
                row.innerText.toLowerCase();


            row.style.display =
                text.includes(search)
                ? ""
                : "none";

        });

    });


// =====================================
// LOAD MEMBERS
// =====================================

displayMembers();