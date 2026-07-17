// ===============================
// LOAD ALL LISTINGS FOR BUYER
// ===============================
async function loadBuyerListings() {
    const role = localStorage.getItem("role");

    if (role !== "BUYER") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Buyer only.</p>";
        return;
    }

    const listings = await apiGet("/api/listings");

    const tbody = document.querySelector("#buyerListingsTable tbody");
    tbody.innerHTML = "";

    listings.forEach(l => {
        const disabled = l.status !== "AVAILABLE" ? "disabled" : "";

        tbody.innerHTML += `
            <tr>
                <td>${l.id}</td>
                <td>${l.species}</td>
                <td>${l.location}</td>
                <td>${l.weight}</td>
                <td>${l.pricePerKg}</td>
                <td>${l.status}</td>
                <td>
                    <button class="purchase-btn" onclick="purchaseListing(${l.id})" ${disabled}>
                        Purchase
                    </button>
                </td>
            </tr>
        `;
    });
}


// ===============================
// PURCHASE LISTING
// ===============================
async function purchaseListing(listingId) {
    const buyerId = localStorage.getItem("userId");

    const body = {
        listingId: listingId,
        buyerId: buyerId
    };

    const response = await apiPost("/api/transactions", body);

    if (!response.error) {
        showMessage("Purchase successful!", "green");

        setTimeout(() => {
            window.location.href = "buyer_orders.html";
        }, 1200);
    } else {
        showMessage("Purchase failed.", "red");
    }
}


// ===============================
// HELPER: SHOW MESSAGE
// ===============================
function showMessage(text, color) {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.style.color = color;
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

    if (role === "ADMIN") window.location.href = "dashboard.html";
    if (role === "FISHER") window.location.href = "fisher_dashboard.html";
    if (role === "BUYER") window.location.href = "buyer_dashboard.html";
    if (role === "REGULATOR") window.location.href = "regulator_dashboard.html";
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
loadBuyerListings();
