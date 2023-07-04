import { getRandomInt } from "./utils.js";
const HOW_MANY_ROW = 1000;

const demoIntersectionObserverTable = () => {
  const table = document.createElement("table");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const colElement = entry.target;
          colElement.renderColumn();
          colElement.classList.add("blue");
          // colElement.style.color = '#' + (Math.random()*0xFFFFFF<<0).toString(16);
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
      col.renderColumn();
      row.appendChild(col);
      // observer.observe(col);
    }
    table.appendChild(row);
  }

  const app = document.getElementById("app");

  app.appendChild(table);
};

const demoIntersectionObserver = () => {
  const list = document.createElement("ul");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const listItem = entry.target;
          listItem.renderItem();
          observer.unobserve(listItem);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "300px"
    }
  );

  for (let i = 0; i < HOW_MANY_ROW; i++) {
    const item = document.createElement("li");
    item.renderItem = function () {
      const image = document.createElement("img");
      image.src = `https://picsum.photos/${getRandomInt(
        100,
        150
      )}/${getRandomInt(200, 250)}`;
      image.onload = function () {
        item.appendChild(image);
      };
    };
    list.appendChild(item);
    observer.observe(item);
  }

  const app = document.getElementById("app");

  app.appendChild(list);
};

export { demoIntersectionObserver, demoIntersectionObserverTable };
