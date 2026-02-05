
async function loadHTML(elementId, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    const container = document.getElementById(elementId);

    container.innerHTML = html;

    // Render project data
    if (typeof renderProjectData === "function") {
      renderProjectData(container);
    }

    // Highlight current nav if header
    if (file.includes("header.html")) {
      highlightCurrentNav(container);
    }

  } catch (e) {
    console.error("Error loading HTML:", e);
  }
}
