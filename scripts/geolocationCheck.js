// function initGeolocationCheck() {
//     const uspStrip = document.querySelector('#usp-strip');
//     const showOutside = document.querySelector("#showOutside");
  
//     if (!uspStrip || !showOutside) {
//       console.warn("DOM not ready or elements not found.");
//       setTimeout(initGeolocationCheck, 200);
//       return;
//     }
  
//     if (!navigator.geolocation) {
//       uspStrip.style.display = 'block';
//       return;
//     }
  
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude: lat, longitude: lon } = position.coords;
//         const isInRegion = lat >= 8.4 && lat <= 37.6 && lon >= 68.1 && lon <= 97.4;
//         uspStrip.style.display = isInRegion ? 'none' : 'flex';
//         showOutside.style.display = isInRegion ? 'none' : 'flex';
//       },
//       (error) => {
//         console.warn("Geolocation failed", error);
//         uspStrip.style.display = 'flex';
//         showOutside.style.display = 'inline';
//       },
//       { timeout: 10000 }
//     );
//   }
  
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initGeolocationCheck);
//   } else {
//     initGeolocationCheck();
//   }
  