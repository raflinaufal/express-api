document.addEventListener("DOMContentLoaded", () => {
  window.deleteEntity = function (entityType, id) {
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
        fetch(`/admin/${entityType}s/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            Swal.fire(
              "Deleted!",
              `${entityType} has been deleted.`,
              "success"
            ).then(() => {
              location.reload();
            });
          } else {
            Swal.fire("Failed!", `Failed to delete ${entityType}.`, "error");
          }
        });
      }
    });
  };

  window.editEntity = function (entityType, id) {
    fetch(`/admin/${entityType}s/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const modal = $("#editModal");
        modal.find(".modal-title").text(`Edit ${entityType}`);
        modal
          .find("form")
          .attr("action", `/admin/${entityType}s/${id}?_method=PUT`);
        for (const key in data) {
          modal.find(`[name="${key}"]`).val(data[key]);
        }
        modal.modal("show");
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to fetch data for editing.", "error");
      });
  };

  window.showNewEntityModal = function (entityType) {
    const modal = $("#editModal");
    modal.find(".modal-title").text(`Add New ${entityType}`);
    modal.find("form").attr("action", `/admin/${entityType}s`);
    modal.find("input, select").val("");
    modal.modal("show");
  };

  $("#editModal form").on("submit", function (event) {
    event.preventDefault();
    const form = $(this);
    const formData = new URLSearchParams(new FormData(form[0]));
    const action = form.attr("action");

    fetch(action, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Swal.fire("Error!", data.error, "error");
        } else {
          Swal.fire(
            "Success!",
            "Operation completed successfully.",
            "success"
          ).then(() => {
            location.reload();
          });
        }
      })
      .catch((error) => {
        Swal.fire("Error!", "An error occurred.", "error");
      });
  });
});
