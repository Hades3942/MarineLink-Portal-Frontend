async function loadBuyerOrders() {
    const role = localStorage.getItem("role");
    const buyerId = localStorage.getItem("userId");

    if (role !== "BUYER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Buyer only.</p>";
        return;
    }

    const orders = await apiGet(`/api/transactions/buyer/${buyerId}`);

    const tbody = document.querySelector("#buyerOrdersTable tbody");
    tbody.innerHTML = "";

    orders.forEach(o => {
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
}

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

loadBuyerOrders();
