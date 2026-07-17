// ===============================
// LOAD ALL LISTINGS (ADMIN)
// ===============================
async function loadAdminListings() {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Admin only.</p>";
        return;
    }

    const listings = await apiGet("/api/listings");

    const tbody = document.querySelector("#adminListingsTable tbody");
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
                <td>${l.fisher.username}</td>
            </tr>
        `;
    });
}


// ===============================
// NAVIGATION
// ===============================
function navigate(page) {
    window.location.href = page + ".html";
}

function goDashboard() {
    const role = localStorage.getItem("role");

    if (role === "ADMIN") window.location.href = "dashboard.html";
    if (role === "FISHER") window.location.href = "fisher_dashboard.html";
    if (role === "BUYER") window.location.href = "buyer_dashboard.html";
    if (role === "REGULATOR") window.location.href = "regulator_dashboard.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ===============================
// INITIAL LOAD
// ===============================
loadAdminListings();
