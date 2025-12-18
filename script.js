document.addEventListener("DOMContentLoaded", () => {

  const tasksData = [
    { id: 1, code: "1234", answer: "Kotek" },
    { id: 2, code: "2345", answer: "Piesek" },
    { id: 3, code: "3456", answer: "Papuga" },
    { id: 4, code: "4567", answer: "Lew" },
    { id: 5, code: "5678", answer: "Tygrys" },
    { id: 6, code: "6789", answer: "Słoń" },
    { id: 7, code: "7890", answer: "Żyrafa" },
    { id: 8, code: "8901", answer: "Zebra" },
    { id: 9, code: "9012", answer: "Wilk" },
    { id: 10, code: "0123", answer: "Lis" }
  ];

  const tasksContainer = document.getElementById("tasks");

  if (!tasksContainer) {
    console.error("❌ Nie znaleziono #tasks w HTML");
    return;
  }

  tasksData.forEach(task => {
    const isDone = localStorage.getItem(`task_${task.id}`) === "done";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (isDone ? " done" : "");

    taskDiv.innerHTML = `
      <h3>Zadanie ${task.id}</h3>
      <input type="text" placeholder="Wpisz kod" ${isDone ? "disabled" : ""}>
      <button ${isDone ? "disabled" : ""}>Sprawdź</button>
      <div class="answer">${isDone ? "✅ " + task.answer : ""}</div>
    `;

    const input = taskDiv.querySelector("input");
    const button = taskDiv.querySelector("button");
    const answerDiv = taskDiv.querySelector(".answer");

    button.addEventListener("click", () => {
      if (input.value === task.code) {
        localStorage.setItem(`task_${task.id}`, "done");
        taskDiv.classList.add("done");
        answerDiv.textContent = "✅ " + task.answer;
        input.disabled = true;
        button.disabled = true;
      } else {
        answerDiv.textContent = "❌ Zły kod";
      }
    });

    tasksContainer.appendChild(taskDiv);
  });

});
