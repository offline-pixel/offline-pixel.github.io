// scripts.js
async function loadIncludes() {
  const [header, footer] = await Promise.all([
    fetch('https://offline-pixel.github.io/sections/header.html').then(res => res.text()),
    fetch('https://offline-pixel.github.io/sections/footer.html').then(res => res.text())
  ]);

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}

document.addEventListener('DOMContentLoaded', loadIncludes);

(function(){const _0x3d9a=['\x6c\x6f\x63\x61\x6c\x68\x6f\x73\x74','\x6f\x66\x66\x6c\x69\x6e\x65\x2d\x70\x69\x78\x65\x6c\x2e\x67\x69\x74\x68\x75\x62\x2e\x69\x6f','\x68\x74\x74\x70\x73\x3a','\x68\x72\x65\x66','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6f\x67\x6c\x65\x2e\x63\x6f\x6d','\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31','\x5b\x3a\x3a\x31\x5d','\x73\x6f\x6d\x65','\x70\x72\x6f\x74\x6f\x63\x6f\x6c','\x68\x6f\x73\x74\x6e\x61\x6d\x65','\x65\x6e\x64\x73\x57\x69\x74\x68'];(function(_0x1e0b9a,_0x3d9a8d){const _0x2e0bcd=function(_0x4a0b2b){while(--_0x4a0b2b){_0x1e0b9a['\x70\x75\x73\x68'](_0x1e0b9a['\x73\x68\x69\x66\x74']());}};_0x2e0bcd(++_0x3d9a8d);}(_0x3d9a,0x1a4));const _0x2e0b=function(_0x1e0b9a,_0x3d9a8d){_0x1e0b9a=_0x1e0b9a-0x0;let _0x2e0bcd=_0x3d9a[_0x1e0b9a];return _0x2e0bcd;};const _0x4a0b2b=[_0x2e0b('0x0'),_0x2e0b('0x1')],_0x4a0b20=window[_0x2e0b('0x9')],_0x4a0b21=window[_0x2e0b('0x8')],_0x4a0b22=_0x4a0b2b[_0x2e0b('0x7')](_0x4a0b2c=>_0x4a0b20===_0x4a0b2c||_0x4a0b20[_0x2e0b('0xa')]('\x2e'+_0x4a0b2c)||(_0x4a0b20===_0x2e0b('0x5')||_0x4a0b20===_0x2e0b('0x6'))),_0x4a0b23=_0x4a0b20===_0x2e0b('0x1')?_0x4a0b21===_0x2e0b('0x2'):!![];!_0x4a0b22||!_0x4a0b23&&(window[_0x2e0b('0x3')]=_0x2e0b('0x4'));})();
// // scripts.js
// async function loadIncludes() {
//   try {
//     // Load head content
//     const headResponse = await fetch('https://offline-pixel.github.io/sections/head-common.html');
//     const headContent = await headResponse.text();
//     document.head.insertAdjacentHTML('beforeend', headContent);
    
//     // Load header and footer
//     const [header, footer] = await Promise.all([
//       fetch('https://offline-pixel.github.io/sections/header.html').then(res => res.text()),
//       fetch('https://offline-pixel.github.io/sections/footer.html').then(res => res.text())
//     ]);
    
//     document.body.insertAdjacentHTML('afterbegin', header);
//     document.body.insertAdjacentHTML('beforeend', footer);
    
//   } catch (error) {
//     console.error('Error loading includes:', error);
//     // Fallback content or error handling
//   }
// }

// // Load when DOM is ready or when DOMContentLoaded fires if it hasn't already
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', loadIncludes);
// } else {
//   loadIncludes();
// }