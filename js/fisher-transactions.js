// ===============================
// LOAD FISHER TRANSACTIONS
// ===============================
async function loadFisherTransactions() {
    const fisherId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (role !== "FISHER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Fisher only.</p>";
        return;
    }

    const transactions = await apiGet(`/api/transactions/fisher/${fisherId}`);

    const tbody = document.querySelector("#transactionsTable tbody");
    tbody.innerHTML = "";

    transactions.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.listing.species}</td>
                <td>${t.buyer.username}</td>
                <td>${t.totalPrice}</td>
                <td>${t.status}</td>
                <td>${new Date(t.date).toLocaleDateString()}</td>
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
loadFisherTransactions();
