// chat-buttons.js
(function() {
const encoded = {
    t: 'ZGVlcGFrLnJhbm9saWFAb3V0bG9vay5jb20=',
    w: 'OTE4MjgzNzQ4Nw==',
    z: 'ODI1NjU1MDkyNHxVc3A4Wm0zM1JhaUtCSEhWQ0FqVUFsYkE2N0J1ajEuMXx1czA0d2ViLnpvb20udXM=',
    g: 'YmtzLXRyeWQtaWdr'
  };

  function decode(data) {
    return atob(data);
  }

  function openTeamsChat() {
    window.open(
      `https://teams.microsoft.com/l/chat/0/0?users=${decode(encoded.t)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  function openZoomMeeting() {
    const [id, pwd, domain] = decode(encoded.z).split('|');
    window.open(
      `https://${domain}/j/${id}?pwd=${pwd}`,
      '_blank',
      'noopener,noreferrer'
    );
  } 

// function openWAChat() {
//   window.open(`https://wa.me/${decode(encoded.w)}`, '_blank', 'noopener,noreferrer');
// } 

function openGoogleMeet() {
  window.open(
    `https://meet.google.com/${decode(encoded.g)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

// export function injectChatButtons(target, options = {}) {
    window.injectChatButtons = function(target, options = {}) {
        const config = {
            margins: '25px 0',
            position: 'append',
            ...options
        };

        const container = document.createElement('div');
        container.className = 'chat-buttons-container';
        container.style.cssText = `
            display: flex;
            gap: 10px;
            margin: ${config.margins};
        `;

        container.innerHTML = `
            <a href="#" class="chat-btn teams-button" aria-label="Chat on Teams">
                <img src="../assets/teams.png" width="24" height="24" alt="" aria-hidden="true">
                <span>&nbsp;Chat on Teams</span>
            </a>
            <a href="#" class="chat-btn zoom-button" aria-label="Connect on Zoom">
                <img src="../assets/zoom.png" width="24" height="24" alt="" aria-hidden="true">
                <span>&nbsp;Connect on Zoom</span>
            </a>
            <a href="#" class="chat-btn google-meet" aria-label="Connect on Google Meet">
                <img src="../assets/google-meet.png" width="24" height="24" alt="" aria-hidden="true">
                <span>&nbsp;Connect on Meet</span>
            </a>
        `;

            // <a href="#" class="chat-btn whatsapp-button" aria-label="Chat on WhatsApp">
            //     <img src="../assets/whatsapp.png" width="24" height="24" alt="" aria-hidden="true">
            //     <span>&nbsp;Chat on WhatsApp</span>
            // </a>
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.chat-btn');
            if (!btn) return;
            e.preventDefault();
            
            const actions = {
              'teams-button': openTeamsChat,
              'zoom-button': openZoomMeeting,
              'google-meet': openGoogleMeet,
              // 'whatsapp-button': openWAChat
            };
            
            actions[btn.classList[1]]?.();
        });

        const parent = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;

        if (parent) {
            config.position === 'prepend' 
            ? parent.prepend(container) 
            : parent.append(container);
        } else {
            console.warn(`Target element not found: ${target}`);
        }
    };

// }
})();