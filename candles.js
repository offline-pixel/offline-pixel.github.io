const svg = document.getElementById('chart');

  const candleData = [
    { x: 20, open: 150, close: 100, high: 160, low: 90 },   // red
    { x: 60, open: 100, close: 140, high: 150, low: 95 },   // green
    { x: 100, open: 140, close: 130, high: 145, low: 125 }, // red
    { x: 140, open: 130, close: 170, high: 180, low: 128 }  // green
  ];

  const heightScale = 1; // 1:1 scale

  candleData.forEach((candle, i) => {
    const color = candle.close > candle.open ? '#4ade80' : '#ef4444';
    const bodyHeight = Math.abs(candle.close - candle.open);
    const bodyY = Math.min(candle.open, candle.close);
    
    // Wick
    const wick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wick.setAttribute('x1', candle.x + 5);
    wick.setAttribute('x2', candle.x + 5);
    wick.setAttribute('y1', 300 - candle.high * heightScale);
    wick.setAttribute('y2', 300 - candle.low * heightScale);
    wick.setAttribute('class', 'wick');
    svg.appendChild(wick);

    // Candle body
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', candle.x);
    rect.setAttribute('y', 300 - bodyY * heightScale);
    rect.setAttribute('width', 10);
    rect.setAttribute('height', bodyHeight * heightScale);
    rect.setAttribute('fill', color);
    rect.setAttribute('class', 'candle');
    rect.style.animationDelay = `${i * 0.5}s`;
    svg.appendChild(rect);
  });