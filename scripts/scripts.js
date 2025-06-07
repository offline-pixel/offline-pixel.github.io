// scripts.js
async function loadIncludes() {
  const [headContent, header, footer] = await Promise.all([
    // fetch('./sections/head-common.html').then(res => res.text()),
    fetch('./sections/header.html').then(res => res.text()),
    fetch('./sections/footer.html').then(res => res.text())
  ]);
  // document.head.insertAdjacentHTML('afterbegin', headContent);

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}

document.addEventListener('DOMContentLoaded', loadIncludes);
