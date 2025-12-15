const correctCode = "1234";

const input = document.getElementById("codeInput");
const button = document.getElementById("checkBtn");
const error = document.getElementById("error");
const success = document.getElementById("success");

// Sprawdź przy starcie, czy zadanie było już rozwiązane
if (localStorage.getItem("task1") === "done") {
  showSuccess();
}

button.addEventListener("click", () => {
  if (input.value === correctCode) {
    localStorage.setItem("task1", "done");
    showSuccess();
  } else {
    error.classList.remove("hidden");
  }
});

function showSuccess() {
  success.classList.remove("hidden");
  error.classList.add("hidden");
  input.style.display = "none";
  button.style.display = "none";
}
