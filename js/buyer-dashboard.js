// ===============================
// LOAD BUYER DASHBOARD
// ===============================
async function loadBuyerDashboard() {
    const role = localStorage.getItem("role");
    const buyerId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (role !== "BUYER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Buyer only.</p>";
        return;
    }

    document.getElementById("welcomeBuyer").innerText = username;

    try {
        const stats = await apiGet(`/api/transactions/buyer/stats/${buyerId}`);
        const orders = await apiGet(`/api/transactions/buyer/${buyerId}`);

        document.getElementById("totalOrders").innerText = stats.totalOrders;
        document.getElementById("completedOrders").innerText = stats.completed;
        document.getElementById("pendingOrders").innerText = stats.pending;
        document.getElementById("totalSpent").innerText = stats.totalSpent + " TZS";

        const tbody = document.querySelector("#buyerOrdersTable tbody");
        tbody.innerHTML = "";

        orders.slice(0, 5).forEach(o => {
            tbody.innerHTML += `
                <tr>
                    <td>${o.id}</td>
                    <td>${o.listing.species}</td>
                    <td>${o.fisher.username}</td>
                    <td>${o.totalPrice}</td>
                    <td>${o.status}</td>
                    <td>${new Date(o.date).toLocaleDateString()}</td>
                </tr>
            `;
        });

    } catch (e) {
        document.getElementById("error").innerText = "Failed to load buyer dashboard.";
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
loadBuyerDashboard();
