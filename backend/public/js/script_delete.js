const deleteModal = document.querySelector(".deleteModal");
const closeModal = document.querySelector(".close");
const cancelDelete = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");
let userId;

closeModal.addEventListener("click", function () {
  deleteModal.classList.add("deactive");
  deleteModal.classList.remove("active");
});

cancelDelete.addEventListener("click", function () {
  deleteModal.classList.add("deactive");
  deleteModal.classList.remove("active");
});

confirmDelete.addEventListener("click", function () {
  const userIdInput = document.getElementById("userId");
  userIdInput.value = userId;

  document.querySelector(".deleteModal form").submit();
  deleteModal.classList.add("deactive");
});
