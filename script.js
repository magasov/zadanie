const cargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];

const cargoTable = document.getElementById("cargoTable");
const addCargoForm = document.getElementById("addCargoForm");
const statusFilter = document.getElementById("statusFilter");

// Функция для отображения грузов
function displayCargo(filter = "all") {
  cargoTable.innerHTML = "";
  const filteredList = cargoList.filter(
    (cargo) => filter === "all" || cargo.status === filter
  );
  filteredList.forEach((cargo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${cargo.id}</td>
            <td>${cargo.name}</td>
            <td>
                <select class="form-select" onchange="updateStatus('${
                  cargo.id
                }', this.value)">
                    <option value="Ожидает отправки" ${
                      cargo.status === "Ожидает отправки" ? "selected" : ""
                    }>Ожидает отправки</option>
                    <option value="В пути" ${
                      cargo.status === "В пути" ? "selected" : ""
                    }>В пути</option>
                    <option value="Доставлен" ${
                      cargo.status === "Доставлен" ? "selected" : ""
                    }>Доставлен</option>
                </select>
            </td>
            <td>${cargo.origin}</td>
            <td>${cargo.destination}</td>
            <td>${cargo.departureDate}</td>
        `;
    row.classList.add(getStatusClass(cargo.status));
    cargoTable.appendChild(row);
  });
}

// Классы для статусов
function getStatusClass(status) {
  switch (status) {
    case "Ожидает отправки":
      return "table-warning";
    case "В пути":
      return "table-primary";
    case "Доставлен":
      return "table-success";
    default:
      return "";
  }
}

// Обновление статуса
function updateStatus(id, newStatus) {
  const cargo = cargoList.find((item) => item.id === id);
  const currentDate = new Date();
  const departureDate = new Date(cargo.departureDate);

  if (newStatus === "Доставлен" && departureDate > currentDate) {
    alert("Ошибка: Нельзя установить статус 'Доставлен' до даты отправления.");
    displayCargo(statusFilter.value);
    return;
  }

  cargo.status = newStatus;
  displayCargo(statusFilter.value);
}

// Добавление нового груза
addCargoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("cargoName").value;
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departureDate").value;

  if (!name || !origin || !destination || !departureDate) {
    alert("Ошибка: Все поля формы должны быть заполнены.");
    return;
  }

  const newCargo = {
    id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
    name,
    status: "Ожидает отправки",
    origin,
    destination,
    departureDate,
  };

  cargoList.push(newCargo);
  displayCargo(statusFilter.value);
  addCargoForm.reset();
});

// Фильтрация грузов
statusFilter.addEventListener("change", function () {
  displayCargo(statusFilter.value);
});

// Первоначальная отрисовка
displayCargo();
