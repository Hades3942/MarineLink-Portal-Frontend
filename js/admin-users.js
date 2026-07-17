// ===============================
// GLOBAL STORAGE FOR FILTERING
// ===============================
let allUsers = []; 
let editUserId = null;
let deleteUserId = null;


// ===============================
// LOAD ALL USERS
// ===============================
async function loadUsers() {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        document.getElementById("usersTableBody").innerHTML =
            "<tr><td colspan='7'>Access denied. Admin only.</td></tr>";
        return;
    }

    const response = await apiGet("/api/admin/dashboard/users");

    allUsers = response; // store full list
    renderUsers(allUsers); // initial render
}


// ===============================
// RENDER USERS (supports filtering)
// ===============================
function renderUsers(users) {
    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = "";

    users.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.zanzibarId || "-"}</td>
                <td>${u.fullName}</td>
                <td>${u.email}</td>
                <td>${u.username}</td>
                <td>${u.role}</td>
                <td>
                    <button class="edit-btn" onclick="openEditModal(${u.id},
                        '${u.zanzibarId || ""}',
                        '${u.fullName || ""}',
                        '${u.email || ""}',
                        '${u.username || ""}',
                        '${u.role}')">Edit</button>

                    <button class="delete-btn" onclick="openDeleteModal(${u.id}, '${u.username}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// SEARCH + FILTER
// ===============================
function filterUsers() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const roleTerm = document.getElementById("roleFilter").value;

    const filtered = allUsers.filter(u => {
        const matchesSearch =
            u.fullName.toLowerCase().includes(searchTerm) ||
            u.email.toLowerCase().includes(searchTerm) ||
            u.username.toLowerCase().includes(searchTerm) ||
            (u.zanzibarId && u.zanzibarId.toLowerCase().includes(searchTerm));

        const matchesRole = roleTerm === "" || u.role === roleTerm;

        return matchesSearch && matchesRole;
    });

    renderUsers(filtered);
}


// ===============================
// EDIT USER
// ===============================
function openEditModal(id, zanzibarId, fullName, email, username, role) {
    editUserId = id;

    document.getElementById("editZanzibarId").value = zanzibarId;
    document.getElementById("editFullName").value = fullName;
    document.getElementById("editEmail").value = email;
    document.getElementById("editUsername").value = username;
    document.getElementById("editRole").value = role;

    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("editMessage").innerText = "";
}

async function confirmEdit() {
    const updatedUser = {
        id: editUserId,
        zanzibarId: document.getElementById("editZanzibarId").value,
        fullName: document.getElementById("editFullName").value,
        email: document.getElementById("editEmail").value,
        username: document.getElementById("editUsername").value,
        role: document.getElementById("editRole").value
    };

    const response = await apiPut(`/api/admin/dashboard/users/${editUserId}`, updatedUser);

    if (!response.error) {
        document.getElementById("editMessage").innerText = "User updated successfully!";
        document.getElementById("editMessage").style.color = "green";

        setTimeout(() => {
            closeEditModal();
            loadUsers();
            setTimeout(filterUsers, 200); // keep filtered view
        }, 1000);
    } else {
        document.getElementById("editMessage").innerText = "Failed to update user.";
        document.getElementById("editMessage").style.color = "red";
    }
}


// ===============================
// DELETE USER
// ===============================
function openDeleteModal(id, username) {
    UserId = id;
    document.getElementById("deleteUserName").innerText =
        `Are you sure you want to delete user: ${username}?`;
    document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
    document.getElementById("deleteMessage").innerText = "";
}

async function confirmDelete() {
    const response = await apiDelete(`/api/admin/dashboard/users/${UserId}`);

    if (!response.error) {
        document.getElementById("deleteMessage").innerText =
            "User deleted successfully!";
        document.getElementById("deleteMessage").style.color = "green";

        setTimeout(() => {
            closeDeleteModal();
            loadUsers();
            setTimeout(filterUsers, 200);
        }, 1000);
    } else {
        document.getElementById("deleteMessage").innerText =
            "Failed to delete user.";
        document.getElementById("deleteMessage").style.color = "red";
    }
}


// ===============================
// NAVIGATION + LOGOUT
// ===============================
function navigate(page) {
    window.location.href = page + ".html";
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ===============================
// ROLE-AWARE DASHBOARD
// ===============================
function goDashboard() {
    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
        window.location.href = "dashboard.html";
    } else if (role === "FISHER") {
        window.location.href = "fisher_dashboard.html";
    } else if (role === "BUYER") {
        window.location.href = "buyer_dashboard.html";
    } else if (role === "REGULATOR") {
        window.location.href = "regulator_dashboard.html";
    }
}



// ===============================
// EVENT LISTENERS FOR SEARCH + FILTER
// ===============================
document.getElementById("searchInput").addEventListener("input", filterUsers);
document.getElementById("roleFilter").addEventListener("change", filterUsers);


// ===============================
// INITIAL LOAD
// ===============================
loadUsers();
