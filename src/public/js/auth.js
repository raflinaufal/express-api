document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded - Fetching user data");
  try {
    const response = await fetch("/dashboard/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (response.status === 401) {
      const data = await response.json();
      console.log("Response 401 - Data:", data);
      if (data.error === "Token expired" || data.error === "Session expired") {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please login again.",
        }).then(() => {
          window.location.href = "/auth/login";
        });
      }
    } else if (response.ok) {
      const data = await response.json();
      console.log("Response OK - Data:", data);
      document.getElementById("user-info").innerHTML = `
                        <p>User ID: ${data.user.userId}</p>
                        <p>Email: ${data.user.email}</p>
                        <p>Name: ${data.user.name}</p>
                        <p>Role: ${data.user.role}</p>
                    `;
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

document.getElementById("logout-button").addEventListener("click", async () => {
  console.log("Logout button clicked");
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Logout successful - Data:", data);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: data.message,
      }).then(() => {
        window.location.href = "/auth/login";
      });
    } else {
      console.error("Logout failed");
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out",
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    Swal.fire({
      icon: "error",
      title: "Logout Failed",
      text: "An error occurred while logging out",
    });
  }
});
