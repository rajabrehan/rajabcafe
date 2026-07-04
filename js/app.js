import {
  CAFE,
  MENU_SECTIONS,
  ADD_ONS,
  TOPPINGS,
  COLD_FOAM,
  getDrinkOptions,
} from "./menu.js";

const cart = [];

const els = {
  menuNav: document.getElementById("menu-nav"),
  menuSections: document.getElementById("menu-sections"),
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
  els.cafeTagline.textContent = "Drinks Menu";
  els.year.textContent = new Date().getFullYear();

  renderNav();
  renderMenu();
  bindEvents();
  updateCart();
}

function renderNav() {
  els.menuNav.innerHTML = MENU_SECTIONS.map(
    (s) => `<a class="menu-nav-link" href="#section-${s.id}">${s.icon} ${s.title}</a>`
  ).join("");
}

function renderMenu() {
  els.menuSections.innerHTML = MENU_SECTIONS.map((section) => `
    <section class="menu-section" id="section-${section.id}" aria-labelledby="heading-${section.id}">
      <div class="section-banner">
        <div class="section-banner-text">
          <span class="section-icon" aria-hidden="true">${section.icon}</span>
          <div>
            <h2 class="section-title" id="heading-${section.id}">${section.title}</h2>
            <p class="section-desc">${section.description}</p>
          </div>
        </div>
        <div class="section-banner-image img-placeholder" aria-label="${section.imagePlaceholder}">
          <span class="img-placeholder-icon" aria-hidden="true">🖼</span>
          <span class="img-placeholder-label">${section.imagePlaceholder}</span>
          ${section.image ? `<img src="${section.image}" alt="${section.imagePlaceholder}" />` : ""}
        </div>
      </div>
      <ul class="drink-list" role="list">
        ${section.drinks.map((drink) => renderDrinkCard(drink, section.id)).join("")}
      </ul>
    </section>
  `).join("");
}

function renderDrinkCard(drink, sectionId) {
  const panelId = `panel-${drink.id}`;
  const opts = getDrinkOptions(drink, sectionId);

  return `
    <li class="drink-card" data-drink-id="${drink.id}">
      <div class="drink-row">
        <div class="drink-thumb img-placeholder drink-thumb-placeholder" aria-hidden="true">
          <span class="img-placeholder-icon">☕</span>
        </div>
        <div class="drink-row-main">
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
        </div>
      </div>

      <div class="drink-panel" id="${panelId}" hidden>
        <p class="drink-description">${drink.description}</p>

        ${opts.temperature ? renderOptionGroup("Temperature", renderTempToggle(drink.id), "temp") : ""}
        ${opts.milk ? renderOptionGroup("Milk", renderMilkToggle(drink.id), "milk") : ""}
        ${opts.addons ? renderOptionGroup("Add-Ons", renderChipGroup(ADD_ONS, drink.id, "addon"), "addons") : ""}
        ${opts.toppings ? renderOptionGroup("Toppings", renderChipGroup(TOPPINGS, drink.id, "topping"), "toppings") : ""}
        ${opts.coldFoam ? renderOptionGroup("Cold Foam", renderChipGroup(COLD_FOAM, drink.id, "foam", true), "foam") : ""}

        <button
          class="btn-add-drink"
          type="button"
          data-add="${drink.id}"
          data-name="${drink.name}"
          data-section="${sectionId}"
        >
          Add to Basket
        </button>
      </div>
    </li>
  `;
}

function renderOptionGroup(label, content, modifier) {
  return `
    <div class="option-group option-group--${modifier}">
      <h3 class="option-label">${label}</h3>
      ${content}
    </div>
  `;
}

function renderTempToggle(drinkId) {
  return `
    <div class="toggle-group" role="group" aria-label="Temperature">
      <label class="toggle-pill">
        <input type="radio" name="temp-${drinkId}" value="iced" checked />
        <span>Iced</span>
      </label>
      <label class="toggle-pill">
        <input type="radio" name="temp-${drinkId}" value="hot" />
        <span>Hot</span>
      </label>
    </div>
  `;
}

function renderMilkToggle(drinkId) {
  return `
    <div class="toggle-group" role="group" aria-label="Milk">
      <label class="toggle-pill">
        <input type="radio" name="milk-${drinkId}" value="whole" checked />
        <span>Whole Milk</span>
      </label>
      <label class="toggle-pill">
        <input type="radio" name="milk-${drinkId}" value="0%" />
        <span>0% Milk</span>
      </label>
    </div>
  `;
}

function renderChipGroup(items, drinkId, type, singleSelect = false) {
  return `
    <div class="chip-grid" data-chip-type="${type}" data-single="${singleSelect}">
      ${items
        .map(
          (item) => `
        <button
          class="extra-chip"
          type="button"
          data-chip-type="${type}"
          data-chip-id="${item.id}"
          data-chip-name="${item.name}"
          aria-pressed="false"
        >
          <span class="extra-name">${item.name}</span>
          <span class="extra-detail">${item.detail}</span>
        </button>`
        )
        .join("")}
    </div>
  `;
}

function bindEvents() {
  els.menuSections.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-toggle]");
    if (toggle) {
      togglePanel(toggle);
      return;
    }

    const chip = e.target.closest(".extra-chip");
    if (chip) {
      handleChipClick(chip);
      return;
    }

    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addDrinkToCart(addBtn);
    }
  });

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

function togglePanel(btn) {
  const card = btn.closest(".drink-card");
  const panel = document.getElementById(`panel-${btn.dataset.toggle}`);
  const expanded = btn.getAttribute("aria-expanded") === "true";

  document.querySelectorAll(".drink-card.is-open").forEach((openCard) => {
    if (openCard !== card) {
      openCard.classList.remove("is-open");
      const openBtn = openCard.querySelector(".drink-toggle");
      const openPanel = openCard.querySelector(".drink-panel");
      openBtn?.setAttribute("aria-expanded", "false");
      if (openPanel) openPanel.hidden = true;
    }
  });

  btn.setAttribute("aria-expanded", String(!expanded));
  panel.hidden = expanded;
  card.classList.toggle("is-open", !expanded);
}

function handleChipClick(chip) {
  const panel = chip.closest(".drink-panel");
  const type = chip.dataset.chipType;
  const grid = chip.closest(".chip-grid");
  const singleSelect = grid?.dataset.single === "true";

  if (singleSelect) {
    grid.querySelectorAll(".extra-chip").forEach((c) => {
      c.setAttribute("aria-pressed", "false");
      c.classList.remove("is-selected");
    });
  }

  const pressed = chip.getAttribute("aria-pressed") === "true";
  chip.setAttribute("aria-pressed", String(!pressed));
  chip.classList.toggle("is-selected", !pressed);
}

function findDrink(drinkId, sectionId) {
  const section = MENU_SECTIONS.find((s) => s.id === sectionId);
  return section?.drinks.find((d) => d.id === drinkId);
}

function readPanelSelections(card, sectionId, drinkId) {
  const panel = card.querySelector(".drink-panel");
  const drink = findDrink(drinkId, sectionId);
  const opts = getDrinkOptions(drink ?? { id: drinkId, tags: [] }, sectionId);

  let temperature = null;
  let milk = null;

  if (opts.temperature) {
    const temp = panel.querySelector(`input[name="temp-${drinkId}"]:checked`);
    temperature = temp?.value ?? "iced";
  }

  if (opts.milk) {
    const milkEl = panel.querySelector(`input[name="milk-${drinkId}"]:checked`);
    milk = milkEl?.value ?? "whole";
  }

  const addons = [];
  const toppings = [];
  let foam = null;

  panel.querySelectorAll('.extra-chip[data-chip-type="addon"].is-selected').forEach((c) => {
    addons.push(c.dataset.chipName);
  });
  panel.querySelectorAll('.extra-chip[data-chip-type="topping"].is-selected').forEach((c) => {
    toppings.push(c.dataset.chipName);
  });
  const foamChip = panel.querySelector('.extra-chip[data-chip-type="foam"].is-selected');
  if (foamChip) foam = foamChip.dataset.chipName;

  return { temperature, milk, addons, toppings, foam };
}

function addDrinkToCart(btn) {
  const { add: drinkId, name, section: sectionId } = btn.dataset;
  const card = btn.closest(".drink-card");
  const sel = readPanelSelections(card, sectionId, drinkId);

  cart.push({
    id: `${drinkId}-${Date.now()}`,
    name,
    ...sel,
  });

  resetPanelSelections(card, sectionId, drinkId);
  updateCart();
  openCart(true);
  pulseCartButton();
}

function resetPanelSelections(card, sectionId, drinkId) {
  const panel = card.querySelector(".drink-panel");
  panel.querySelectorAll(".extra-chip").forEach((c) => {
    c.setAttribute("aria-pressed", "false");
    c.classList.remove("is-selected");
  });
  const iced = panel.querySelector(`input[name="temp-${drinkId}"][value="iced"]`);
  if (iced) iced.checked = true;
  const whole = panel.querySelector(`input[name="milk-${drinkId}"][value="whole"]`);
  if (whole) whole.checked = true;
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

  els.cartList.innerHTML = cart
    .map(
      (item, i) => `
    <li class="cart-item">
      <div class="cart-item-main">
        <span class="cart-item-name">${formatItemName(item)}</span>
        ${formatItemMeta(item)}
      </div>
      <button class="cart-remove" type="button" data-remove="${i}" aria-label="Remove ${item.name}">✕</button>
    </li>`
    )
    .join("");

  els.cartList.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.remove), 1);
      updateCart();
    });
  });
}

function formatItemName(item) {
  if (item.temperature) {
    const prefix = item.temperature === "hot" ? "Hot" : "Iced";
    const base = item.name.replace(/^(Iced|Hot)\s+/i, "");
    return `${prefix} ${base}`;
  }
  return item.name;
}

function formatItemMeta(item) {
  const parts = [];
  if (item.milk) parts.push(`${item.milk === "0%" ? "0%" : "Whole"} milk`);
  if (item.addons?.length) parts.push(`+ ${item.addons.join(", ")}`);
  if (item.toppings?.length) parts.push(`Toppings: ${item.toppings.join(", ")}`);
  if (item.foam) parts.push(`${item.foam} foam`);
  if (!parts.length) return "";
  return `<span class="cart-item-meta">${parts.join(" · ")}</span>`;
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

function formatOrderLine(item, i) {
  let line = `${i + 1}. ${formatItemName(item)}`;
  const details = [];
  if (item.milk) details.push(`${item.milk === "0%" ? "0%" : "Whole"} milk`);
  if (item.addons?.length) details.push(...item.addons);
  if (item.toppings?.length) details.push(`Toppings: ${item.toppings.join(", ")}`);
  if (item.foam) details.push(`${item.foam} foam`);
  if (details.length) line += ` (${details.join(", ")})`;
  return line;
}

function formatOrder() {
  const lines = cart.map(formatOrderLine);
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
