document.getElementById("delete-btn").addEventListener("click", function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Post will be deleted Permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fe424d', 
        cancelButtonColor: '#222222',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("delete-form").submit();
        }
    })
});