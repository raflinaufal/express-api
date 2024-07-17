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
      loadUsers();
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

const loadUsers = async () => {
  try {
    const response = await fetch("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const users = await response.json();
      const tbody = document.getElementById("users-tbody");
      tbody.innerHTML = "";
      users.forEach((user) => {
        tbody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
      });
    } else {
      console.error("Failed to load users");
    }
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

const editUser = (id) => {
  // Fetch user data and open edit form (implementation needed)
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "User Deleted",
        text: "The user has been deleted successfully",
      }).then(() => {
        loadUsers();
      });
    } else {
      console.error("Failed to delete user");
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "An error occurred while deleting the user",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "An error occurred while deleting the user",
    });
  }
};

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

document.getElementById("add-user-button").addEventListener("click", () => {
  // Open add user form (implementation needed)
});