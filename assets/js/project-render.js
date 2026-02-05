
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
   month: "2-digit",
    year: "numeric"
  });
}

function renderDocumentTitle() {
  const pageMeta = document.querySelector('meta[name="page-title"]');
  const pageTitle = pageMeta ? pageMeta.getAttribute("content") : "";

  if (PROJECT && PROJECT.title) {
    document.title = pageTitle
      ? `${PROJECT.acronym} – ${pageTitle}`
      : PROJECT.acronym;
  }
}

function renderContextSection() {
  const container = document.getElementById("context-list");
  if (!container || !PROJECT.context) return;

  container.innerHTML = "";

  PROJECT.context.forEach(item => {
    const li = document.createElement("li");

    const strong = document.createElement("strong");
    strong.textContent = item.title + ": ";

    const text = document.createTextNode(item.text);

    li.appendChild(strong);
    li.appendChild(text);

    container.appendChild(li);
  });
}

function renderObjectivesSection() {
  if (!PROJECT?.objectives) return;

  const container = document.getElementById("objectives-container");
  if (!container) return;

  container.innerHTML = "";

  PROJECT.objectives.forEach(obj => {
    // Create objective wrapper
    const section = document.createElement("section");
    section.classList.add("objective-item");

    // Header button for collapse/expand
    const headerBtn = document.createElement("button");
    headerBtn.classList.add("objective-toggle");
    headerBtn.textContent = obj.title;

    // Collapsible area
    const content = document.createElement("div");
    content.classList.add("objective-content");

    // Main objective text
    const p = document.createElement("p");
    p.textContent = obj.text;
    content.appendChild(p);

    // Subobjectives
    if (Array.isArray(obj.subobjectives)) {
      obj.subobjectives.forEach(sub => {
        const subWrapper = document.createElement("div");
        subWrapper.classList.add("subobjective-wrapper");

        const subHeader = document.createElement("button");
        subHeader.classList.add("subobjective-toggle");
        subHeader.textContent = sub.title;

        const subContent = document.createElement("div");
        subContent.classList.add("subobjective-content");

        const sp = document.createElement("p");
        sp.textContent = sub.text;
        subContent.appendChild(sp);

        subWrapper.appendChild(subHeader);
        subWrapper.appendChild(subContent);
        content.appendChild(subWrapper);
      });
    }

    // Append everything
    section.appendChild(headerBtn);
    section.appendChild(content);
    container.appendChild(section);
  });

  initObjectiveToggles();
}

function initObjectiveToggles() {
  // MAIN OBJECTIVES
  document.querySelectorAll(".objective-toggle").forEach(btn => {
    const content = btn.nextElementSibling;

    // DEFAULT: objectives expanded
    btn.classList.add("open");
    content.classList.add("open");

    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      content.classList.toggle("open");
    });
  });

  // SUBOBJECTIVES
  document.querySelectorAll(".subobjective-toggle").forEach(btn => {
    const content = btn.nextElementSibling;

    // DEFAULT: subobjectives collapsed
    content.classList.remove("open");

    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      content.classList.toggle("open");
    });
  });
}

function initPhonePrefill() {
  const input = document.querySelector('[data-phone-input]');
  if (!input) return;

  // Default to Portugal
  const defaultCode = "+351";

  // Prefill only if empty
  if (input.value.trim() === "") {
    input.value = defaultCode + " ";
  }

  // Prevent removing the "+"
  input.addEventListener("input", (e) => {
    let v = input.value;

    // Always start with "+"
    if (!v.startsWith("+")) {
      input.value = "+" + v.replace(/[^0-9]/g, ""); 
      return;
    }

    // Allow "+351" or any other "+XYZ"
    // But block letters and special chars
    input.value = "+" + v.substring(1).replace(/[^0-9 ]/g, "");
  });

  // Prevent backspacing the "+"
  input.addEventListener("keydown", (e) => {
    const caretPos = input.selectionStart;

    if (caretPos === 0 && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
    }
  });
}

function initWeb3FormsJS() {
  const form = document.querySelector(".contact-card form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop full-page submission

    const formData = new FormData(form);

    // Send to Web3Forms via fetch
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      showInlineSuccess();     // Custom success message
      form.reset();            // Clear the form
      initPhonePrefill();      // Re-add "+351"
    } else {
      showInlineError(result.message);
    }
  });
}

function showInlineSuccess() {
  const card = document.querySelector(".contact-card");
  const msg = document.createElement("p");
  msg.className = "success-message";
  msg.textContent = "Mensagem enviada com sucesso!";
  card.prepend(msg);
}

function showInlineError(error) {
  const card = document.querySelector(".contact-card");
  const msg = document.createElement("p");
  msg.className = "error-message";
  msg.textContent = "Ocorreu um erro: " + error;
  card.prepend(msg);
}

function renderActivitiesTable() {
  if (!PROJECT?.activities) return;

  const tbody = document.getElementById("activities-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  PROJECT.activities.forEach(activity => {
    const tr = document.createElement("tr");

    activity.forEach(cellValue => {
      const td = document.createElement("td");
      td.textContent = cellValue;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function renderPartnersSection() {
  if (!PROJECT?.partners) return;

  const container = document.getElementById("partners-container");
  if (!container) return;

  container.innerHTML = "";

  PROJECT.partners.forEach(partner => {
    const section = document.createElement("section");
    section.className = "partner";

    const header = document.createElement("div");
    header.className = "partner-header";

    const img = document.createElement("img");
    img.src = partner.logo;
    img.alt = `${partner.name} logo`;
    img.className = "partner-logo";

    const h2 = document.createElement("h2");
    //h2.textContent = partner.name;


    const link = document.createElement("a");
    link.href = partner.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.appendChild(img);

    header.appendChild(link);
    header.appendChild(h2);


    const p = document.createElement("p");
    p.textContent = partner.description;

    section.appendChild(header);
    section.appendChild(p);

    container.appendChild(section);
  });
}

function renderNewsSection() {
  if (!PROJECT?.news) return;

  const container = document.getElementById("news-container");
  if (!container) return;

  container.innerHTML = "";

  PROJECT.news.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const section = document.createElement("section");
    section.className = "facts";

    const h2 = document.createElement("h2");
    h2.textContent = item.title;
    section.appendChild(h2);

    const pDate = document.createElement("p");
    pDate.innerHTML =
      `<strong>Data:</strong> ${formatDate(item.date)}`;
    section.appendChild(pDate);

    const pDesc = document.createElement("p");
    pDesc.innerHTML =
      `<strong>Descrição:</strong> ${item.description}`;
    section.appendChild(pDesc);

    // Now wrap the section inside the card
    card.appendChild(section);
    container.appendChild(card);
  });
}

function initOverviewTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  const sections = document.querySelectorAll(".tab-section");

  if (!buttons.length || !sections.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // deactivate all
      buttons.forEach(b => b.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      // activate chosen
      btn.classList.add("active");

      const tabId = "tab-" + btn.dataset.tab;
      const target = document.getElementById(tabId);
      if (target) target.classList.add("active");
    });
  });
}

function initFormspreeContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("contact-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "A enviar...";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (res.ok) {
        status.textContent = "Mensagem enviada com sucesso!";
        form.reset();
      } else {
        status.textContent = "Erro ao enviar. Tente novamente.";
      }

    } catch (err) {
      status.textContent = "Erro de ligação. Verifique a internet.";
    }
  });
}

function highlightCurrentNav(root = document) {

  let currentPage = window.location.pathname.replace(/\/$/, "");
    if (currentPage === "") currentPage = "/";

  root.querySelectorAll(".navbar a").forEach(link => {
    const linkPage = link.getAttribute("href");

    const isActive =
      linkPage === currentPage ||
      (linkPage === "index.html" && currentPage === "");

    link.classList.toggle("active", isActive);

    // Accessibility improvement
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initMobileNav() {
  // Wait until the header HTML is fully loaded into the DOM
  const interval = setInterval(() => {
    const toggle = document.getElementById("nav-toggle");
    const links = document.querySelector(".nav-links");

    if (toggle && links) {
      clearInterval(interval); // Stop checking once found

      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
      });
    }
  }, 50); // check every 50ms until header is ready
}

function renderProjectData(root = document) {
  root.querySelectorAll("[data-project]").forEach(el => {
    const key = el.getAttribute("data-project");
    let value = PROJECT[key] ?? "";

    if (key === "startDate") value = formatDate(PROJECT.startDate);
    if (key === "endDate") value = formatDate(PROJECT.endDate);

    if (el.tagName === "A" && el.hasAttribute("href")) {
      el.textContent = value;
      el.setAttribute("href", "mailto:" + value);
      return;
    }

    if (key === "email") {
      el.innerHTML = `<a href="mailto:${value}" class="mailto-inline">${value}</a>`;
      return;
    }

    // Default case: plain text
    el.textContent = value;
  });

  renderDocumentTitle();
}
