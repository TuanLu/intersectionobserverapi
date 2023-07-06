const HOW_MANY_ROW = 10000;

const demoIntersectionObserverTable = () => {
  const table = document.createElement("table");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const colElement = entry.target;
          colElement.renderColumn();
          colElement.classList.add("blue");
          observer.unobserve(colElement);
        }
      });
    },
    {
      root: document.getElementById("wrap"),
      threshold: 0
      // rootMargin: '-100px'
    }
  );

  for (let i = 0; i < HOW_MANY_ROW; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const col = document.createElement("td");
      col.renderColumn = function () {
        setTimeout(() => {
          this.textContent = `Row ${i + 1} - Col ${j + 1}`;
        }, 10);
      };
      // col.renderColumn();
      row.appendChild(col);
      observer.observe(col);
    }
    table.appendChild(row);
  }

  const app = document.getElementById("app");

  app.appendChild(table);
};

export { demoIntersectionObserverTable };
