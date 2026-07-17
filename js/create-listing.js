// ===============================
// CREATE LISTING
// ===============================
async function createListing() {
    const fisherId = localStorage.getItem("userId");

    const species = document.getElementById("species").value.trim();
    const location = document.getElementById("location").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const price = document.getElementById("price").value.trim();

    if (!species || !location || !weight || !price) {
        showMessage("All fields are required.", "red");
        return;
    }

    const body = {
        species: species,
        location: location,
        weight: weight,
        pricePerKg: price,
        fisherId: fisherId
    };

    const response = await apiPost("/api/listings", body);

    if (!response.error) {
        showMessage("Listing created successfully!", "green");

        setTimeout(() => {
            window.location.href = "my-listings.html";
        }, 1200);
    } else {
        showMessage("Failed to create listing.", "red");
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
