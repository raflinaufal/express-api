document.addEventListener("DOMContentLoaded", async () => {
  loadUsers();

  document
    .getElementById("logout-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          Swal.fire({
            icon: "success",
            title: "Logged Out",
            text: data.message,
          }).then(() => {
            window.location.href = "/auth/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Logout Failed",
            text: "An error occurred while logging out",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "An error occurred while logging out",
        });
      }
    });

  document
    .getElementById("user-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const userId = document.getElementById("user-id").value;
      const email = document.getElementById("user-email").value;
      const name = document.getElementById("user-name").value;
      const role = document.getElementById("user-role").value;
      const password = document.getElementById("user-password").value;

      const method = userId ? "PUT" : "POST";
      const url = userId ? `/users/${userId}` : "/users";

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, role, password }),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "User Saved",
            text: "User information has been saved successfully.",
          }).then(() => {
            loadUsers();
            $("#userModal").modal("hide");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Save Failed",
            text: "An error occurred while saving the user information.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: "An error occurred while saving the user information.",
        });
      }
    });

  document.getElementById("add-user-button").addEventListener("click", () => {
    document.getElementById("user-id").value = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-name").value = "";
    document.getElementById("user-role").value = "user";
    document.getElementById("user-password").value = "";
    document.getElementById("userModalLabel").innerText = "Add User";
  });
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
      Swal.fire({
        icon: "error",
        title: "Load Failed",
        text: "Failed to load users.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Load Failed",
      text: "An error occurred while loading users.",
    });
  }
};

const editUser = async (id) => {
  try {
    const response = await fetch(`/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const user = await response.json();
      document.getElementById("user-id").value = user.id;
      document.getElementById("user-email").value = user.email;
      document.getElementById("user-name").value = user.name;
      document.getElementById("user-role").value = user.role;
      document.getElementById("user-password").value = "";
      document.getElementById("userModalLabel").innerText = "Edit User";
      $("#userModal").modal("show");
    } else {
      Swal.fire({
        icon: "error",
        title: "Load Failed",
        text: "Failed to load user information.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Load Failed",
      text: "An error occurred while loading user information.",
    });
  }
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
        text: "User has been deleted successfully.",
      }).then(() => {
        loadUsers();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete user.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "An error occurred while deleting the user.",
    });
  }
};
