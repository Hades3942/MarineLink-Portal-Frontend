// ===============================
// LOAD ALL LISTINGS
// ===============================
async function loadAllListings() {
    const role = localStorage.getItem("role");

    if (role !== "FISHER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Fisher only.</p>";
        return;
    }

    const listings = await apiGet("/api/listings");

    const tbody = document.querySelector("#allListingsTable tbody");
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
loadAllListings();
