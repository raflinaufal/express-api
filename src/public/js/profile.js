document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("edit-form");

  if (editForm) {
    editForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new URLSearchParams(new FormData(editForm)).toString();

      try {
        const response = await axios.post(editForm.action, formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (response.data.error) {
          Swal.fire("Error!", response.data.error, "error");
        } else {
          Swal.fire(
            "Success!",
            "Operation completed successfully.",
            "success"
          ).then(() => {
            location.reload();
          });
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred.", "error");
      }
    });
  }

  window.deleteEntity = function (id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/admin/profiles/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                "Deleted!",
                "Profile has been deleted.",
                "success"
              ).then(() => {
                location.reload();
              });
            } else {
              Swal.fire("Failed!", "Failed to delete profile.", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Failed!", "Failed to delete profile.", "error");
          });
      }
    });
  };

  window.editEntity = function (id) {
    axios
      .get(`/admin/profiles/${id}`)
      .then((response) => {
        const data = response.data;
        const modal = $("#editModal");
        modal.find(".modal-title").text(`Edit Profile`);
        modal.find("form").attr("action", `/admin/profiles/${id}?_method=PUT`);
        for (const key in data) {
          modal.find(`[name="${key}"]`).val(data[key]);
        }
        modal.modal("show");
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to fetch data for editing.", "error");
      });
  };
});
