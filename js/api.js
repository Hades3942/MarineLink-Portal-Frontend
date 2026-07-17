// ================================
// BASE API URL
// ================================
const BASE_URL = "http://localhost:8080";


// ================================
// GET REQUEST
// ================================
async function apiGet(url) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(BASE_URL + url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            console.error("GET error:", response.status, response.statusText);
            return { error: true };
        }

        return await response.json();

    } catch (error) {
        console.error("GET exception:", error);
        return { error: true };
    }
}


// ================================
// POST REQUEST
// ================================
async function apiPost(url, body) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(BASE_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error("POST error:", response.status, response.statusText);
            return { error: true };
        }

        return await response.json();

    } catch (error) {
        console.error("POST exception:", error);
        return { error: true };
    }
}


// ================================
// PUT REQUEST
// ================================
async function apiPut(url, body) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(BASE_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("PUT error:", response.status, text);
      return { error: true };
    }

    return await response.json();

  } catch (error) {
    console.error("PUT exception:", error);
    return { error: true };
  }
}
// ================================
// DELETE REQUEST
// ================================
async function apiDelete(url) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(BASE_URL + url, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            console.error("DELETE error:", response.status, response.statusText);
            return { error: true };
        }

        return await response.json();

    } catch (error) {
        console.error("DELETE exception:", error);
        return { error: true };
    }
}
