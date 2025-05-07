// scripts.js

// Header/Footer Includes
async function loadIncludes() {
  const rootPath = window.location.origin;
  const [header, footer] = await Promise.all([
    fetch(`${rootPath}/pages/sections/header.html`).then(res => res.text()),
    fetch(`${rootPath}/pages/sections/footer.html`).then(res => res.text())
  ]);
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}

document.addEventListener('DOMContentLoaded', loadIncludes);
