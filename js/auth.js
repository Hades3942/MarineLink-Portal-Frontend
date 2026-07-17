// ===============================
// REGISTER
// ===============================
async function register() {
    const fullName = document.getElementById("reg_fullName").value.trim();
    const username = document.getElementById("reg_username").value.trim();
    const email = document.getElementById("reg_email").value.trim();
    const password = document.getElementById("reg_password").value.trim();
    const zanzibarId = document.getElementById("reg_zanzibarId").value.trim();
    const role = document.getElementById("reg_role").value;

    if (!fullName || !username || !email || !password || !zanzibarId) {
        document.getElementById("error").innerText = "All fields are required";
        return;
    }

    const body = {
        fullName,
        username,
        email,
        password,
        zanzibarId,
        role
    };

    const response = await apiPost("/api/auth/register", body);

    if (!response || response.error) {
        document.getElementById("error").innerText = "Registration failed";
        return;
    }

    alert("Registration successful! Please login.");
    window.location.href = "index.html";
}


// ===============================
// LOGIN
// ===============================
async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showError("Enter username and password");
        return;
    }

    const response = await apiPost("/api/auth/login", { username, password });

    if (!response || response.error) {
        showError("Invalid username or password");
        return;
    }

    // Save token & user info
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    localStorage.setItem("userId", response.userId);
    localStorage.setItem("username", response.username);

    window.location.href = "dashboard.html";
}


// ===============================
// ERROR HANDLER
// ===============================
function showError(msg) {
    document.getElementById("error").innerText = msg;
}
