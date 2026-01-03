// pinescript-disclaimer.js - Auto-injects financial disclaimer
document.addEventListener('DOMContentLoaded', function() {
  const disclaimerDivs = document.querySelectorAll('.pinescript-disclaimer');
  
  if (disclaimerDivs.length > 0) {
    const disclaimerText = `
      <strong>Risk Disclaimer:</strong> Trading financial markets carries risk. 
      All content (PineScript code, indicators, strategies) on this website 
      is for educational purposes only. Past performance is not indicative of 
      future results. By using any code or information from this site, you 
      agree that you are solely responsible for your trading decisions. 
      The author disclaims all liability for any losses incurred.
      To gain from experts experiences, You can always try our <a
        href="https://offlinepixel.gumroad.com/l/trader-on-the-go"
        target="_blank" ref="nofollow"
      >Invite Only Scripts</a>
    `;
    
    disclaimerDivs.forEach(div => {
      div.innerHTML = disclaimerText;
      div.style.padding = '12px';
      div.style.backgroundColor = 'rgba(253, 245, 220, 1)'; // Light yellow alert bg
      div.style.borderLeft = '4px solid #ffcc32ff'; // Yellow accent
      div.style.margin = '10px 0';
      div.style.borderRadius = '4px';
      div.style.fontSize = '10px';
      div.style.lineHeight = '18px';
      div.style.color = '#888';
      div.style.textAlign = 'justify';

    });
  }
});