document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have successfully logged in.",
          }).then(() => {
            if (data.role === "admin") {
              window.location.href = "/dashboard";
            } else {
              window.location.href = "/";
            }
          });
        } else {
          const errorMessages = data.errors
            .map((err) => `<p>${err.msg}</p>`)
            .join("");
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            html: errorMessages,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "An error occurred while logging in",
        });
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You have successfully registered.",
          }).then(() => {
            window.location.href = "/auth/login";
          });
        } else {
          const errorMessages = data.errors
            .map((err) => `<p>${err.msg}</p>`)
            .join("");
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            html: errorMessages,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "An error occurred while registering",
        });
      }
    });
  }
});
