
// Header/Footer Includes
async function loadIncludes() {
  const [header, footer] = await Promise.all([
    fetch('header.html').then(res => res.text()),
    fetch('footer.html').then(res => res.text())
  ]);
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}
loadIncludes();
  