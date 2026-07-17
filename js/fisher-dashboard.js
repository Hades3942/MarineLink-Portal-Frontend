// ===============================
// LOAD FISHER DASHBOARD
// ===============================
async function loadFisherDashboard() {
    const role = localStorage.getItem("role");
    const fisherId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (role !== "FISHER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Fisher only.</p>";
        return;
    }

    document.getElementById("fisherName").innerText = username;

    // Fetch stats
    const stats = await apiGet("/api/dashboard/fisher/{id}");
    if (!stats.error) {
        document.getElementById("totalListings").innerText = stats.totalListings;
        document.getElementById("totalTransactions").innerText = stats.totalTransactions;
        document.getElementById("totalRevenue").innerText = stats.totalRevenue + " TZS";
        document.getElementById("pendingOrders").innerText = stats.pending;
        document.getElementById("completedOrders").innerText = stats.completed;
    }

    // Fetch recent listings
    const listings = await apiGet(`/api/listings/fisher/${fisherId}`);

    const tbody = document.querySelector("#myListingsTable tbody");
    tbody.innerHTML = "";

    listings.slice(0, 5).forEach(l => {
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
// LOGOUT
// ===============================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ===============================
// INITIAL LOAD
// ===============================
loadFisherDashboard();
