// scripts.js

// Adjusted to dynamically resolve relative path
const basePath = window.location.pathname.includes('/pages/') ? '../sections/' : './sections/';

async function loadIncludes() {
  const [header, footer] = await Promise.all([
    fetch(`${basePath}header.html`).then(res => res.text()),
    fetch(`${basePath}footer.html`).then(res => res.text())
  ]);
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}


document.addEventListener('DOMContentLoaded', loadIncludes);
