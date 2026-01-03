function createParticles() {
    const particleCount = 50;
    const particlesContainer = document.getElementById('particles');
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
  
      const size = Math.random() * 5 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
  
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();
  