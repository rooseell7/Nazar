const defaultData = {
  kpis: [
    { label: "Своєчасні поставки", value: "96%", trend: "+2%" },
    { label: "Економія бюджету", value: "₴1,24 млн", trend: "-0,4%" },
    { label: "Активні RFQ", value: "12", trend: "+3" },
    { label: "Середній цикл", value: "8,4 дні", trend: "-1,2 дні" },
  ],
  process: [
    { title: "Потреби", detail: "14 нових потреб узгоджено" },
    { title: "RFQ", detail: "5 тендерів у роботі" },
    { title: "Замовлення", detail: "9 замовлень у виконанні" },
    { title: "Поставка", detail: "3 ризикові поставки" },
  ],
  suppliers: [
    { name: "ТОВ БудМаркет", rating: "4.8", status: "Сертифікати актуальні" },
    { name: "Індустріал Поставка", rating: "4.5", status: "Стабільні строки" },
    { name: "ПрофМатеріали", rating: "4.2", status: "Потрібна звірка SLA" },
  ],
  rfq: [
    { name: "Арматура A500", site: "ЖК Грінвуд", budget: "₴1 200 000", status: "Пропозиції" },
    { name: "Фасадні роботи", site: "ТРЦ Північ", budget: "₴860 000", status: "Оцінка" },
    { name: "Пісок/щебінь", site: "Логістичний парк", budget: "₴540 000", status: "Контракт" },
  ],
  deliveries: [
    { name: "Бетон М350", date: "14.06", status: "В дорозі" },
    { name: "Металоконструкції", date: "16.06", status: "Приймання" },
    { name: "Віконні блоки", date: "20.06", status: "Заплановано" },
  ],
  invoices: [
    { name: "Інвойс #4821", site: "ЖК Грінвуд", amount: "₴320 000", status: "Верифікація" },
    { name: "Інвойс #4822", site: "ТРЦ Північ", amount: "₴210 000", status: "Оплата" },
    { name: "Інвойс #4823", site: "Логістичний парк", amount: "₴180 000", status: "Заблоковано" },
  ],
  contracts: [
    { name: "Складські послуги", vendor: "Індустріал Поставка", status: "Діє до 31.12" },
    { name: "Постачання арматури", vendor: "ТОВ БудМаркет", status: "Перегляд SLA" },
    { name: "Фасадні роботи", vendor: "ПрофМатеріали", status: "Пролонгація" },
  ],
  budgets: [
    { site: "ЖК Грінвуд", planned: 12.4, spent: 8.9 },
    { site: "ТРЦ Північ", planned: 18.2, spent: 10.7 },
    { site: "Логістичний парк", planned: 9.6, spent: 6.1 },
  ],
  needs: [
    { title: "Гідроізоляція", detail: "Етап: фундамент, дедлайн: 22.06" },
    { title: "Електрощити", detail: "Етап: інженерні мережі, дедлайн: 28.06" },
    { title: "Плитка фасадна", detail: "Етап: фасад, дедлайн: 02.07" },
  ],
  compliance: [
    { title: "3-way match", detail: "9/12 рахунків підтверджено" },
    { title: "Сертифікати", detail: "2 сертифікати оновити до 25.06" },
    { title: "Ризики", detail: "1 критичний постачальник" },
  ],
  tasks: [
    { title: "Перевірити сертифікати сталі", owner: "Олена", done: false },
    { title: "Погодити графік фасадних робіт", owner: "Ігор", done: false },
    { title: "Підписати акт приймання бетону", owner: "Сергій", done: true },
  ],
  risks: [
    { title: "Зрив поставки бетону", level: "Високий", status: "Ескалація" },
    { title: "Зміна ціни на метал", level: "Середній", status: "Моніторинг" },
    { title: "Недостатній запас щебеню", level: "Низький", status: "Заплановано" },
  ],
  chat: [
    { author: "Система", text: "Виявлено відхилення по поставці бетону." },
    { author: "Менеджер", text: "Запитала оновлення графіку у постачальника." },
  ],
};

const storageKey = "srm-demo-state";
const loadState = () => {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return { ...defaultData };
  try {
    return { ...defaultData, ...JSON.parse(saved) };
  } catch (error) {
    return { ...defaultData };
  }
};

const data = loadState();

const saveState = () => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

const elements = {
  kpiGrid: document.getElementById("kpi-grid"),
  processTimeline: document.getElementById("process-timeline"),
  supplierList: document.getElementById("supplier-list"),
  supplierFilter: document.getElementById("supplier-filter"),
  rfqList: document.getElementById("rfq-list"),
  rfqFilter: document.getElementById("rfq-filter"),
  deliveryList: document.getElementById("delivery-list"),
  invoiceList: document.getElementById("invoice-list"),
  contractList: document.getElementById("contract-list"),
  budgetTable: document.getElementById("budget-table"),
  needsList: document.getElementById("needs-list"),
  complianceList: document.getElementById("compliance-list"),
  taskList: document.getElementById("task-list"),
  riskList: document.getElementById("risk-list"),
  chatWindow: document.getElementById("chat-window"),
  chatInput: document.getElementById("chat-input"),
  sendMessage: document.getElementById("send-message"),
  modal: document.getElementById("modal"),
  modalForm: document.getElementById("modal-form"),
  modalTitle: document.getElementById("modal-title"),
  createRfq: document.getElementById("create-rfq"),
  addRfq: document.getElementById("add-rfq"),
  addSupplier: document.getElementById("add-supplier"),
  addDelivery: document.getElementById("add-delivery"),
  addInvoice: document.getElementById("add-invoice"),
  addTask: document.getElementById("add-task"),
  closeModal: document.getElementById("close-modal"),
  exportData: document.getElementById("export-data"),
  exportZip: document.getElementById("export-zip"),
};

const renderKpis = () => {
  elements.kpiGrid.innerHTML = data.kpis
    .map(
      (kpi) => `
      <div class="kpi">
        <span>${kpi.label}</span>
        <strong>${kpi.value}</strong>
        <small>${kpi.trend}</small>
      </div>
    `
    )
    .join("");
};

const renderProcess = () => {
  elements.processTimeline.innerHTML = data.process
    .map(
      (item) => `
      <div class="timeline__item">
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </div>
    `
    )
    .join("");
};

const renderSuppliers = (filter = "") => {
  const filtered = data.suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(filter.toLowerCase())
  );
  elements.supplierList.innerHTML = filtered
    .map(
      (supplier) => `
      <div class="list__item">
        <div>
          <strong>${supplier.name}</strong>
          <p>Рейтинг: ${supplier.rating}</p>
        </div>
        <span class="tag tag--success">${supplier.status}</span>
      </div>
    `
    )
    .join("");
};

const statusTag = (status) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("контракт") || normalized.includes("оплата")) {
    return "tag--success";
  }
  if (normalized.includes("оцінка") || normalized.includes("пропозиції")) {
    return "tag--warning";
  }
  return "tag--danger";
};

const renderRfq = (filter = "all") => {
  const filtered =
    filter === "all" ? data.rfq : data.rfq.filter((item) => item.status === filter);
  elements.rfqList.innerHTML = filtered
    .map(
      (item) => `
      <div class="list__item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.site} · ${item.budget}${item.deadline ? ` · до ${item.deadline}` : ""}</p>
        </div>
        <span class="tag ${statusTag(item.status)}">${item.status}</span>
      </div>
    `
    )
    .join("");
};

const renderDeliveries = () => {
  elements.deliveryList.innerHTML = data.deliveries
    .map(
      (item) => `
      <div class="list__item">
        <div>
          <strong>${item.name}</strong>
          <p>Дата: ${item.date}</p>
        </div>
        <span class="tag tag--warning">${item.status}</span>
      </div>
    `
    )
    .join("");
};

const renderInvoices = () => {
  elements.invoiceList.innerHTML = data.invoices
    .map(
      (item) => `
      <div class="list__item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.site} · ${item.amount}</p>
        </div>
        <span class="tag ${statusTag(item.status)}">${item.status}</span>
      </div>
    `
    )
    .join("");
};

const renderContracts = () => {
  elements.contractList.innerHTML = data.contracts
    .map(
      (item) => `
      <div class="list__item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.vendor}</p>
        </div>
        <span class="tag tag--warning">${item.status}</span>
      </div>
    `
    )
    .join("");
};

const renderBudgets = () => {
  elements.budgetTable.innerHTML = data.budgets
    .map((item) => {
      const percent = Math.min(100, Math.round((item.spent / item.planned) * 100));
      return `
      <div class="budget__row">
        <strong>${item.site}</strong>
        <div class="progress">
          <div class="progress__bar" style="width: ${percent}%"></div>
        </div>
        <span>${item.spent} / ${item.planned} млн</span>
      </div>
    `;
    })
    .join("");
};

const renderNeeds = () => {
  elements.needsList.innerHTML = data.needs
    .map(
      (item) => `
      <div class="needs__item">
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </div>
    `
    )
    .join("");
};

const renderCompliance = () => {
  elements.complianceList.innerHTML = data.compliance
    .map(
      (item) => `
      <div class="compliance__item">
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </div>
    `
    )
    .join("");
};

const renderTasks = () => {
  elements.taskList.innerHTML = data.tasks
    .map(
      (item, index) => `
      <div class="task ${item.done ? "task--done" : ""}">
        <label>
          <input type="checkbox" data-index="${index}" ${item.done ? "checked" : ""} />
          <div>
            <strong>${item.title}</strong>
            <p class="muted">Відповідальний: ${item.owner}</p>
          </div>
        </label>
        <span class="tag ${item.done ? "tag--success" : "tag--warning"}">${
        item.done ? "Готово" : "В роботі"
      }</span>
      </div>
    `
    )
    .join("");
};

const renderRisks = () => {
  elements.riskList.innerHTML = data.risks
    .map(
      (item) => `
      <div class="list__item">
        <div>
          <strong>${item.title}</strong>
          <p>Рівень: ${item.level}</p>
        </div>
        <span class="tag tag--danger">${item.status}</span>
      </div>
    `
    )
    .join("");
};

const renderChat = () => {
  elements.chatWindow.innerHTML = data.chat
    .map(
      (item) => `
      <div class="chat__bubble ${item.author === "Я" ? "chat__bubble--me" : ""}">
        <strong>${item.author}:</strong> ${item.text}
      </div>
    `
    )
    .join("");
  elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
};

const openModal = () => {
  elements.modal.classList.add("is-open");
  elements.modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  elements.modal.classList.remove("is-open");
  elements.modal.setAttribute("aria-hidden", "true");
};

const modalTemplates = {
  rfq: [
    { id: "name", label: "Назва", type: "text" },
    { id: "site", label: "Об'єкт", type: "text" },
    { id: "budget", label: "Бюджет, грн", type: "number" },
    { id: "deadline", label: "Дедлайн", type: "date" },
  ],
  supplier: [
    { id: "name", label: "Назва постачальника", type: "text" },
    { id: "rating", label: "Рейтинг", type: "number", step: "0.1", min: "1", max: "5" },
    { id: "status", label: "Статус", type: "text" },
  ],
  invoice: [
    { id: "name", label: "Номер інвойсу", type: "text" },
    { id: "site", label: "Об'єкт", type: "text" },
    { id: "amount", label: "Сума, грн", type: "number" },
    { id: "status", label: "Статус", type: "text" },
  ],
  task: [
    { id: "title", label: "Завдання", type: "text" },
    { id: "owner", label: "Відповідальний", type: "text" },
  ],
};

let currentModalType = "rfq";

const buildModalForm = (type) => {
  currentModalType = type;
  elements.modalTitle.textContent =
    type === "rfq"
      ? "Створити RFQ"
      : type === "supplier"
      ? "Додати постачальника"
      : type === "invoice"
      ? "Додати інвойс"
      : "Додати завдання";
  elements.modalForm.innerHTML = modalTemplates[type]
    .map((field) => {
      const extra = field.step ? ` step="${field.step}"` : "";
      const min = field.min ? ` min="${field.min}"` : "";
      const max = field.max ? ` max="${field.max}"` : "";
      return `
      <label>
        ${field.label}
        <input class="input" name="${field.id}" type="${field.type}"${extra}${min}${max} required />
      </label>
    `;
    })
    .join("");
  elements.modalForm.innerHTML += `<button class="btn btn--primary" type="submit">Зберегти</button>`;
};

const appendRfq = (payload) => {
  data.rfq.unshift(payload);
  saveState();
  renderRfq(elements.rfqFilter?.value || "all");
};

const appendDelivery = () => {
  const nextNumber = data.deliveries.length + 1;
  data.deliveries.unshift({
    name: `Нова поставка #${nextNumber}`,
    date: "25.06",
    status: "Підтвердження",
  });
  renderDeliveries();
  saveState();
};

const appendSupplier = (payload) => {
  data.suppliers.unshift(payload);
  saveState();
  renderSuppliers(elements.supplierFilter?.value || "");
};

const appendInvoice = (payload) => {
  data.invoices.unshift(payload);
  saveState();
  renderInvoices();
};

const appendTask = (payload) => {
  data.tasks.unshift({ ...payload, done: false });
  saveState();
  renderTasks();
};

const exportData = () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "srm-demo-data.json";
  anchor.click();
  URL.revokeObjectURL(url);
};

const exportZip = () => {
  const message =
    "Щоб отримати ZIP, відкрийте README та виконайте команду zip або використайте архіватор на ПК.";
  alert(message);
};

renderKpis();
renderProcess();
renderSuppliers();
renderRfq(elements.rfqFilter?.value || "all");
renderDeliveries();
renderInvoices();
renderContracts();
renderBudgets();
renderNeeds();
renderCompliance();
renderTasks();
renderRisks();
renderChat();

if (elements.supplierFilter) {
  elements.supplierFilter.addEventListener("input", (event) => {
    renderSuppliers(event.target.value);
  });
}

if (elements.rfqFilter) {
  elements.rfqFilter.addEventListener("change", (event) => {
    renderRfq(event.target.value);
  });
}

if (elements.createRfq) {
  elements.createRfq.addEventListener("click", () => {
    buildModalForm("rfq");
    openModal();
  });
}

if (elements.addRfq) {
  elements.addRfq.addEventListener("click", () => {
    buildModalForm("rfq");
    openModal();
  });
}

if (elements.addSupplier) {
  elements.addSupplier.addEventListener("click", () => {
    buildModalForm("supplier");
    openModal();
  });
}

if (elements.closeModal) {
  elements.closeModal.addEventListener("click", closeModal);
}

if (elements.modal) {
  elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) {
      closeModal();
    }
  });
}

if (elements.modalForm) {
  elements.modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(elements.modalForm);
    const entries = Object.fromEntries(formData.entries());
    if (currentModalType === "rfq") {
      appendRfq({
        name: entries.name,
        site: entries.site,
        budget: `₴${Number(entries.budget).toLocaleString("uk-UA")}`,
        status: "Пропозиції",
        deadline: entries.deadline,
      });
    }
    if (currentModalType === "supplier") {
      appendSupplier({
        name: entries.name,
        rating: Number(entries.rating).toFixed(1),
        status: entries.status,
      });
    }
    if (currentModalType === "invoice") {
      appendInvoice({
        name: entries.name,
        site: entries.site,
        amount: `₴${Number(entries.amount).toLocaleString("uk-UA")}`,
        status: entries.status,
      });
    }
    if (currentModalType === "task") {
      appendTask({ title: entries.title, owner: entries.owner });
    }
    elements.modalForm.reset();
    closeModal();
  });
}

if (elements.addDelivery) {
  elements.addDelivery.addEventListener("click", appendDelivery);
}

if (elements.addInvoice) {
  elements.addInvoice.addEventListener("click", () => {
    buildModalForm("invoice");
    openModal();
  });
}

if (elements.addTask) {
  elements.addTask.addEventListener("click", () => {
    buildModalForm("task");
    openModal();
  });
}

if (elements.sendMessage) {
  elements.sendMessage.addEventListener("click", () => {
    const text = elements.chatInput.value.trim();
    if (!text) return;
    data.chat.push({ author: "Я", text });
    elements.chatInput.value = "";
    renderChat();
    saveState();
  });
}

if (elements.taskList) {
  elements.taskList.addEventListener("change", (event) => {
    if (event.target.matches("input[type='checkbox']")) {
      const index = Number(event.target.dataset.index);
      data.tasks[index].done = event.target.checked;
      saveState();
      renderTasks();
    }
  });
}

if (elements.exportData) {
  elements.exportData.addEventListener("click", exportData);
}

if (elements.exportZip) {
  elements.exportZip.addEventListener("click", exportZip);
}
