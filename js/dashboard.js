// ===============================
// LOAD ADMIN DASHBOARD
// ===============================
async function loadAdminDashboard() {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (role !== "ADMIN") {
        document.querySelector(".main").innerHTML =
            "<p>Access denied. Admin only.</p>";
        return;
    }

    document.getElementById("welcomeUser").innerText = username;

    try {
        const stats = await apiGet("/api/dashboard/admin");

        document.getElementById("totalUsers").innerText = stats.totalUsers;
        document.getElementById("totalListings").innerText = stats.totalListings;
        document.getElementById("totalTransactions").innerText = stats.totalTransactions;
        document.getElementById("totalRevenue").innerText = stats.totalRevenue + " TZS";

    } catch (err) {
        document.getElementById("error").innerText = "Failed to load dashboard.";
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
loadAdminDashboard();
