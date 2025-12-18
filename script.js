document.addEventListener("DOMContentLoaded", () => {

  const tasksData = [
    { id: 1, code: "1234", points: 10 },
    { id: 2, code: "2345", points: 20 },
    { id: 3, code: "3456", points: 30 },
    { id: 4, code: "4567", points: 40 },
    { id: 5, code: "5678", points: 50 },
    { id: 6, code: "6789", points: 60 },
    { id: 7, code: "7890", points: 70 },
    { id: 8, code: "8901", points: 80 },
    { id: 9, code: "9012", points: 90 },
    { id: 10, code: "0123", points: 100 }
  ];

  const tasksContainer = document.getElementById("tasks");
  const scoreValue = document.getElementById("scoreValue");

  function updateScore() {
    let total = 0;
    tasksData.forEach(task => {
      const pts = localStorage.getItem(`task_${task.id}_points`);
      if (pts) total += parseInt(pts);
    });
    scoreValue.textContent = total;
  }

  updateScore();

  tasksData.forEach(task => {
    const isDone = localStorage.getItem(`task_${task.id}`) === "done";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (isDone ? " done" : "");

    taskDiv.innerHTML = `
      <h3>Zadanie ${task.id} (${task.points} pkt)</h3>
      <input type="text" placeholder="Wpisz kod" ${isDone ? "disabled" : ""}>
      <button ${isDone ? "disabled" : ""}>Sprawdź</button>
      <div class="answer">
        ${isDone ? `✅ Zdobyto ${task.points} punktów` : ""}
      </div>
    `;

    const input = taskDiv.querySelector("input");
    const button = taskDiv.querySelector("button");
    const answerDiv = taskDiv.querySelector(".answer");

    button.addEventListener("click", () => {
      if (input.value === task.code) {
        localStorage.setItem(`task_${task.id}`, "done");
        localStorage.setItem(`task_${task.id}_points`, task.points);

        taskDiv.classList.add("done");
        answerDiv.textContent = `🏆 Zdobywasz ${task.points} punktów!`;

        input.disabled = true;
        button.disabled = true;

        updateScore();
      } else {
        answerDiv.textContent = "❌ Zły kod";
      }
    });

    tasksContainer.appendChild(taskDiv);
  });

});
