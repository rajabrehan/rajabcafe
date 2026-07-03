import { CAFE, MENU_SECTIONS, ADD_ONS, COLD_FOAM } from "./menu.js";

const cart = [];

const els = {
  menuSections: document.getElementById("menu-sections"),
  addOnsGrid: document.getElementById("addons-grid"),
  coldFoamGrid: document.getElementById("coldfoam-grid"),
  cartList: document.getElementById("cart-list"),
  cartCount: document.getElementById("cart-count"),
  cartEmpty: document.getElementById("cart-empty"),
  cartPanel: document.getElementById("cart-panel"),
  cartToggle: document.getElementById("cart-toggle"),
  cartClose: document.getElementById("cart-close"),
  placeOrder: document.getElementById("place-order"),
  orderModal: document.getElementById("order-modal"),
  orderSummary: document.getElementById("order-summary"),
  modalClose: document.getElementById("modal-close"),
  copyOrder: document.getElementById("copy-order"),
  cafeName: document.getElementById("cafe-name"),
  cafeTagline: document.getElementById("cafe-tagline"),
  year: document.getElementById("year"),
};

function init() {
  els.cafeName.textContent = CAFE.name;
  els.cafeTagline.textContent = CAFE.tagline;
  els.year.textContent = new Date().getFullYear();

  renderMenu();
  renderExtras(ADD_ONS, els.addOnsGrid, "addon");
  renderExtras(COLD_FOAM, els.coldFoamGrid, "foam");
  bindEvents();
  updateCart();
}

function renderMenu() {
  els.menuSections.innerHTML = MENU_SECTIONS.map((section) => `
    <section class="menu-section" id="section-${section.id}" aria-labelledby="heading-${section.id}">
      <header class="section-header">
        <span class="section-icon" aria-hidden="true">${section.icon}</span>
        <div>
          <h2 class="section-title" id="heading-${section.id}">${section.title}</h2>
          <p class="section-desc">${section.description}</p>
        </div>
      </header>
      <ul class="drink-list" role="list">
        ${section.drinks.map((drink) => renderDrinkCard(drink, section.id)).join("")}
      </ul>
    </section>
  `).join("");
}

function renderDrinkCard(drink, sectionId) {
  const panelId = `desc-${drink.id}`;
  return `
    <li class="drink-card" data-drink-id="${drink.id}">
      <div class="drink-top">
        <button
          class="drink-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="${panelId}"
          data-toggle="${drink.id}"
        >
          <span class="drink-name">${drink.name}</span>
          <span class="chevron" aria-hidden="true"></span>
        </button>
        <button
          class="btn-add"
          type="button"
          data-add="${drink.id}"
          data-name="${drink.name}"
          aria-label="Add ${drink.name} to order"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <div class="drink-desc-panel" id="${panelId}" hidden>
        <p>${drink.description}</p>
        ${drink.tags.includes("hot-or-iced")
          ? `<p class="drink-note">Available hot or iced — mention your preference when ordering.</p>`
          : ""}
      </div>
    </li>
  `;
}

function renderExtras(items, container, type) {
  container.innerHTML = items.map((item) => `
    <button
      class="extra-chip"
      type="button"
      data-extra-type="${type}"
      data-extra-id="${item.id}"
      data-extra-name="${item.name}"
      aria-pressed="false"
    >
      <span class="extra-name">${item.name}</span>
      <span class="extra-detail">${item.detail}</span>
    </button>
  `).join("");
}

function bindEvents() {
  els.menuSections.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-toggle]");
    if (toggle) {
      toggleDescription(toggle);
      return;
    }

    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addDrinkToCart(addBtn.dataset.add, addBtn.dataset.name);
    }
  });

  els.addOnsGrid.addEventListener("click", (e) => handleExtraClick(e, "addon"));
  els.coldFoamGrid.addEventListener("click", (e) => handleExtraClick(e, "foam"));

  els.cartToggle.addEventListener("click", () => openCart(true));
  els.cartClose.addEventListener("click", () => openCart(false));
  document.querySelector(".cart-overlay")?.addEventListener("click", () => openCart(false));
  els.placeOrder.addEventListener("click", showOrderModal);
  els.modalClose.addEventListener("click", closeOrderModal);
  els.copyOrder.addEventListener("click", copyOrderText);

  els.orderModal.addEventListener("click", (e) => {
    if (e.target === els.orderModal) closeOrderModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      openCart(false);
      closeOrderModal();
    }
  });
}

function toggleDescription(btn) {
  const panel = document.getElementById(`desc-${btn.dataset.toggle}`);
  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!expanded));
  panel.hidden = expanded;
  btn.closest(".drink-card").classList.toggle("is-open", !expanded);
}

function handleExtraClick(e, type) {
  const chip = e.target.closest(".extra-chip");
  if (!chip) return;

  const selected = getSelectedExtras(type);
  const id = chip.dataset.extraId;

  if (type === "foam") {
    selected.forEach((s) => {
      s.el.setAttribute("aria-pressed", "false");
      s.el.classList.remove("is-selected");
    });
    selected.length = 0;
  }

  const idx = selected.findIndex((s) => s.id === id);
  if (idx >= 0) {
    selected.splice(idx, 1);
    chip.setAttribute("aria-pressed", "false");
    chip.classList.remove("is-selected");
  } else {
    selected.push({ id, name: chip.dataset.extraName, el: chip });
    chip.setAttribute("aria-pressed", "true");
    chip.classList.add("is-selected");
  }
}

const selectedAddons = [];
const selectedFoam = [];

function getSelectedExtras(type) {
  return type === "addon" ? selectedAddons : selectedFoam;
}

function addDrinkToCart(id, name) {
  const addons = selectedAddons.map((a) => a.name);
  const foam = selectedFoam.length ? selectedFoam[0].name : null;

  cart.push({
    id: `${id}-${Date.now()}`,
    name,
    addons: [...addons],
    foam,
  });

  clearSelectedExtras();
  updateCart();
  openCart(true);
  pulseCartButton();
}

function clearSelectedExtras() {
  [...selectedAddons, ...selectedFoam].forEach((item) => {
    item.el.setAttribute("aria-pressed", "false");
    item.el.classList.remove("is-selected");
  });
  selectedAddons.length = 0;
  selectedFoam.length = 0;
}

function updateCart() {
  const count = cart.length;
  els.cartCount.textContent = count;
  els.cartCount.hidden = count === 0;
  els.cartEmpty.hidden = count > 0;
  els.placeOrder.disabled = count === 0;

  if (count === 0) {
    els.cartList.innerHTML = "";
    return;
  }

  els.cartList.innerHTML = cart.map((item, i) => `
    <li class="cart-item">
      <div class="cart-item-main">
        <span class="cart-item-name">${item.name}</span>
        ${item.addons.length ? `<span class="cart-item-meta">+ ${item.addons.join(", ")}</span>` : ""}
        ${item.foam ? `<span class="cart-item-meta">Foam: ${item.foam}</span>` : ""}
      </div>
      <button class="cart-remove" type="button" data-remove="${i}" aria-label="Remove ${item.name}">✕</button>
    </li>
  `).join("");

  els.cartList.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.remove), 1);
      updateCart();
    });
  });
}

function openCart(open) {
  els.cartPanel.classList.toggle("is-open", open);
  els.cartPanel.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("cart-open", open);
}

function pulseCartButton() {
  els.cartToggle.classList.add("pulse");
  setTimeout(() => els.cartToggle.classList.remove("pulse"), 600);
}

function formatOrder() {
  const lines = cart.map((item, i) => {
    let line = `${i + 1}. ${item.name}`;
    if (item.addons.length) line += ` (${item.addons.join(", ")})`;
    if (item.foam) line += ` [${item.foam} foam]`;
    return line;
  });
  return `Order for ${CAFE.name}\n\n${lines.join("\n")}\n\nThank you! ☕`;
}

function showOrderModal() {
  els.orderSummary.textContent = formatOrder();
  els.orderModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeOrderModal() {
  els.orderModal.hidden = true;
  document.body.classList.remove("modal-open");
}

async function copyOrderText() {
  const text = formatOrder();
  try {
    await navigator.clipboard.writeText(text);
    els.copyOrder.textContent = "Copied!";
    setTimeout(() => {
      els.copyOrder.textContent = "Copy order";
    }, 2000);
  } catch {
    els.copyOrder.textContent = "Select & copy below";
  }
}

init();
