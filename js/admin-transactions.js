// ===============================
// LOAD ALL TRANSACTIONS (ADMIN)
// ===============================
async function loadAdminTransactions() {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Admin only.</p>";
        return;
    }

    const transactions = await apiGet("/api/transactions");

    const tbody = document.querySelector("#adminTransactionsTable tbody");
    tbody.innerHTML = "";

    transactions.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.listing.species}</td>
                <td>${t.fisher.username}</td>
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
loadAdminTransactions();
