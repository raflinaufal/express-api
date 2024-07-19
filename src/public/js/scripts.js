// Hapus Entity
function deleteEntity(entityType, id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/${entityType}s/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire('Deleted!', `${entityType} has been deleted.`, 'success')
                    .then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire('Failed!', `Failed to delete ${entityType}.`, 'error');
                }
            });
        }
    });
}
