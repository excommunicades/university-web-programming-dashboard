async function loadData(period = "weekly") {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    const container = document.querySelector(".cards-container");
    container.innerHTML = "";

    data.forEach((item) => {
      const { title, timeframes } = item;
      const current = timeframes[period].current;
      const previous = timeframes[period].previous;
      const className = title.replace(/\s/g, "");

      const card = document.createElement("div");
      card.className = `card ${className}`;
      card.innerHTML = `
        <div class="card-content">
          <h3>${title}</h3>
          <p class="hours">${current}hrs</p>
          <p class="previous">${
            period === "daily" ? "Yesterday" : "Last Week"
          } - ${previous}hrs</p>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Помилка завантаження даних:", error);
  }
}

document.querySelectorAll(".period-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".period-btn").forEach((b) =>
      b.classList.remove("active")
    );
    e.target.classList.add("active");
    loadData(e.target.dataset.period);
  });
});

loadData("weekly");
