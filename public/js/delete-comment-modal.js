function deleteCommentModal(className, uri) {
    return function() {
        function deleteComment(ev) {
            ev.preventDefault();
            let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            let element = ev.target.parentNode;
            let id = element.getAttribute('data-id');
            if (!id) return;
      
            let confirmModal = document.getElementById('deleteCommentModal');
            let btnConfirm = confirmModal.querySelector('#btnDeleteComment');
            let btnCancel = confirmModal.querySelector('#btnCancelDelete');
            let iconCancel = confirmModal.querySelector('span.close');
            let confirm = () => {
              fetch(uri, {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                  'CSRF-Token': token,
                  'content-type': 'application/json'
                }
              }).then(response => {
                if (response.status === 201) {
                  document.location = document.location;
                  return;
                }
                console.error(response.status);
                confirmModal.style.display = 'none';
              });
            };
            let cancel = () => {
              btnConfirm.removeEventListener('click', confirm);
              btnCancel.removeEventListener('click', cancel);
              iconCancel.removeEventListener('click', cancel);
              confirmModal.style.display = 'none';
            }
      
            btnConfirm.addEventListener('click', confirm);
            btnCancel.addEventListener('click', cancel);
            iconCancel.addEventListener('click', cancel);
      
            confirmModal.style.display = 'block';
        }
      
        document.querySelectorAll(className).forEach(el => {
          el.addEventListener('click', deleteComment);
        });
    }
}