let editListingId = null;
let deleteListingId = null;

// ===============================
// LOAD MY LISTINGS
// ===============================
async function loadMyListings() {
    const fisherId = localStorage.getItem("userId");

    const listings = await apiGet(`/api/listings/fisher/${fisherId}`);

    const tbody = document.querySelector("#myListingsTable tbody");
    tbody.innerHTML = "";

    listings.forEach(l => {
        tbody.innerHTML += `
            <tr>
                <td>${l.id}</td>
                <td>${l.species}</td>
                <td>${l.location}</td>
                <td>${l.weight}</td>
                <td>${l.pricePerKg}</td>
                <td>${l.status}</td>
                <td>
                    <button class="edit-btn" onclick="openEditModal(${l.id}, '${l.species}', '${l.location}', '${l.weight}', '${l.pricePerKg}')">Edit</button>
                    <button class="delete-btn" onclick="openDeleteModal(${l.id}, '${l.species}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// OPEN EDIT MODAL
// ===============================
function openEditModal(id, species, location, weight, price) {
    editListingId = id;

    document.getElementById("editSpecies").value = species;
    document.getElementById("editLocation").value = location;
    document.getElementById("editWeight").value = weight;
    document.getElementById("editPrice").value = price;

    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("editMessage").innerText = "";
}


// ===============================
// SAVE EDIT
// ===============================
async function saveListingEdit() {
    const body = {
        species: document.getElementById("editSpecies").value,
        location: document.getElementById("editLocation").value,
        weight: document.getElementById("editWeight").value,
        pricePerKg: document.getElementById("editPrice").value
    };

    const response = await apiPut(`/api/listings/${editListingId}`, body);

    if (!response.error) {
        document.getElementById("editMessage").innerText = "Listing updated!";
        document.getElementById("editMessage").style.color = "green";

        setTimeout(() => {
            closeEditModal();
            loadMyListings();
        }, 1000);
    } else {
        document.getElementById("editMessage").innerText = "Failed to update.";
        document.getElementById("editMessage").style.color = "red";
    }
}


// ===============================
// DELETE LISTING
// ===============================
function openDeleteModal(id, species) {
    deleteListingId = id;
    document.getElementById("deleteListingText").innerText =
        `Are you sure you want to delete listing: ${species}?`;
    document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
    document.getElementById("deleteMessage").innerText = "";
}

async function confirmDelete() {
    const response = await apiDelete(`/api/listings/${deleteListingId}`);

    if (!response.error) {
        document.getElementById("deleteMessage").innerText = "Listing deleted!";
        document.getElementById("deleteMessage").style.color = "green";

        setTimeout(() => {
            closeDeleteModal();
            loadMyListings();
        }, 1000);
    } else {
        document.getElementById("deleteMessage").innerText = "Failed to delete.";
        document.getElementById("deleteMessage").style.color = "red";
    }
}


// ===============================
// NAVIGATION
// ===============================
function navigate(page) {
    window.location.href = page + ".html";
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
// LOGOUT
// ===============================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ===============================
// INITIAL LOAD
// ===============================
loadMyListings();
