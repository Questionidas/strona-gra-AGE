document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     KONFIGURACJA ZADAŃ
  ========================== */

  const tasksData = [
    { id: 1, code: "1", points: 10 },
    { id: 2, code: "2", points: 20 },
    { id: 3, code: "3", points: 30 },
    { id: 4, code: "4", points: 40 },
    { id: 5, code: "5", points: 50 },
    { id: 6, code: "6", points: 60 },
    { id: 7, code: "7", points: 70 },
    { id: 8, code: "8", points: 80 },
    { id: 9, code: "9", points: 90 },
    { id: 10, code: "10", points: 100 }
  ];

  /* =========================
     FUNKCJE PUNKTÓW
     (JEDYNE ŹRÓDŁO PRAWDY)
  ========================== */

  function getPoints() {
    return parseInt(localStorage.getItem("totalPoints")) || 0;
  }

  function setPoints(value) {
    localStorage.setItem("totalPoints", value);
    const scoreValue = document.getElementById("scoreValue");
    if (scoreValue) {
      scoreValue.textContent = value;
    }
  }

  function addPoints(amount) {
    setPoints(getPoints() + amount);
  }

  /* =========================
     INICJALIZACJA LICZNIKA
  ========================== */

  setPoints(getPoints());

  /* =========================
     RENDEROWANIE ZADAŃ
  ========================== */

  const tasksContainer = document.getElementById("tasks");

  if (!tasksContainer) {
    console.error("❌ Brak elementu #tasks w HTML");
    return;
  }

  tasksData.forEach(task => {
    const isDone = localStorage.getItem(`task_${task.id}`) === "done";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (isDone ? " done" : "");

    taskDiv.innerHTML = `
      <h3>Zadanie ${task.id} (${task.points} pkt)</h3>
      <input type="text" placeholder="Wpisz kod" ${isDone ? "disabled" : ""}>
      <button ${isDone ? "disabled" : ""}>Sprawdź</button>
      <div class="answer">
        ${isDone ? "✅ Zadanie wykonane" : ""}
      </div>
    `;

    const input = taskDiv.querySelector("input");
    const button = taskDiv.querySelector("button");
    const answerDiv = taskDiv.querySelector(".answer");

    button.addEventListener("click", () => {
      if (input.value === task.code) {

        // 🔒 zabezpieczenie przed ponownym naliczeniem
        if (!localStorage.getItem(`task_${task.id}`)) {
          localStorage.setItem(`task_${task.id}`, "done");
          addPoints(task.points);
        }

        taskDiv.classList.add("done");
        answerDiv.textContent = `🏆 Zdobywasz ${task.points} punktów!`;

        input.disabled = true;
        button.disabled = true;

      } else {
        answerDiv.textContent = "❌ Zły kod";
      }
    });

    tasksContainer.appendChild(taskDiv);
  });

  /* =========================
     RESET PUNKTÓW (SYMULACJA QR)
  ========================== */

  const qrResetBtn = document.getElementById("qrResetBtn");

  if (qrResetBtn) {
    qrResetBtn.addEventListener("click", () => {
      if (confirm("Czy na pewno chcesz wydać wszystkie punkty?")) {
        setPoints(0);
        alert("🪙 Złoto zostało wydane. Sakiewka jest pusta.");
      }
    });
  }

});
