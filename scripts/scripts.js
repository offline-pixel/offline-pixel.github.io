// scripts.js
async function loadIncludes() {
  const [headContent, header, footer] = await Promise.all([
    fetch('./sections/header.html').then(res => res.text()),
    fetch('./sections/footer.html').then(res => res.text())
  ]);

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}

document.addEventListener('DOMContentLoaded', loadIncludes);
