import React, { useRef, useEffect, useCallback } from 'react';

const METAL_COLORS = {
  gold: { primary: '#D4AF37', secondary: '#F4D03F', shadow: '#8B7508' },
  rosegold: { primary: '#B76E79', secondary: '#E8A5A8', shadow: '#7A3F47' },
  silver: { primary: '#C0C0C0', secondary: '#E8E8E8', shadow: '#707070' }
};

const STONE_COLORS = {
  diamond: { primary: '#FFFFFF', secondary: '#E8E8E8', glow: 'rgba(255,255,255,0.8)' },
  emerald: { primary: '#50C878', secondary: '#90EE90', glow: 'rgba(80,200,120,0.6)' },
  ruby: { primary: '#E0115F', secondary: '#FF6B6B', glow: 'rgba(224,17,95,0.6)' },
  sapphire: { primary: '#0F52BA', secondary: '#6B9EFF', glow: 'rgba(15,82,186,0.6)' }
};

const TryOnCanvas = ({ 
  faceData, 
  handData, 
  selectedProduct, 
  customization,
  size,
  videoDimensions 
}) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  const drawJewelry = useCallback((ctx, faceData, handData) => {
    const { width, height } = ctx.canvas;
    const metal = METAL_COLORS[customization.metal] || METAL_COLORS.gold;
    const stone = STONE_COLORS[customization.stone] || STONE_COLORS.diamond;
    const scale = (size / 50) * Math.min(width, height) / 640;
    const design = customization.design;

    // Enable smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Helper to add glow effect
    const addGlow = (color, blur = 15) => {
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
    };

    const clearGlow = () => {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    };

    // Draw Earring
    const drawEarring = (position, side) => {
      const x = position.x * width;
      const y = position.y * height;
      const tilt = (faceData.headTilt || 0) * (Math.PI / 180);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tilt * (side === 'left' ? 1 : -1) * 0.3);
      
      const s = scale * 1.5;

      if (design === 'classic') {
        // Classic stud earring
        addGlow(metal.primary, 8);
        
        // Metal base
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25 * s);
        gradient.addColorStop(0, metal.secondary);
        gradient.addColorStop(0.5, metal.primary);
        gradient.addColorStop(1, metal.shadow);
        
        ctx.beginPath();
        ctx.arc(0, 0, 25 * s, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner stone
        const stoneGradient = ctx.createRadialGradient(-3 * s, -3 * s, 0, 0, 0, 18 * s);
        stoneGradient.addColorStop(0, stone.secondary);
        stoneGradient.addColorStop(0.4, stone.primary);
        stoneGradient.addColorStop(1, '#333');
        
        addGlow(stone.glow, 12);
        ctx.beginPath();
        ctx.arc(0, 0, 18 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGradient;
        ctx.fill();
        
        // Sparkle
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(-5 * s, -5 * s, 4 * s, 0, Math.PI * 2);
        ctx.fill();
        
      } else if (design === 'halo') {
        // Halo style
        const haloGradient = ctx.createRadialGradient(0, 0, 20 * s, 0, 0, 45 * s);
        haloGradient.addColorStop(0, metal.primary);
        haloGradient.addColorStop(0.5, metal.secondary);
        haloGradient.addColorStop(1, metal.shadow);
        
        addGlow(metal.primary, 10);
        ctx.beginPath();
        ctx.arc(0, 0, 45 * s, 0, Math.PI * 2);
        ctx.fillStyle = haloGradient;
        ctx.fill();
        
        // Center stone
        const stoneGrad = ctx.createRadialGradient(-5 * s, -5 * s, 0, 0, 0, 28 * s);
        stoneGrad.addColorStop(0, stone.secondary);
        stoneGrad.addColorStop(0.5, stone.primary);
        stoneGrad.addColorStop(1, '#222');
        
        addGlow(stone.glow, 15);
        ctx.beginPath();
        ctx.arc(0, 0, 28 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGrad;
        ctx.fill();
        
        // Halo accents
        ctx.globalAlpha = 0.8;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const hx = Math.cos(angle) * 38 * s;
          const hy = Math.sin(angle) * 38 * s;
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(hx, hy, 3 * s, 0, Math.PI * 2);
          ctx.fill();
        }
        
      } else if (design === 'drop') {
        // Drop/dangle earring
        addGlow(metal.primary, 8);
        
        // Top stud
        const topGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 15 * s);
        topGrad.addColorStop(0, metal.secondary);
        topGrad.addColorStop(1, metal.primary);
        
        ctx.beginPath();
        ctx.arc(0, 0, 15 * s, 0, Math.PI * 2);
        ctx.fillStyle = topGrad;
        ctx.fill();
        
        // Chain
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 2 * s;
        ctx.beginPath();
        ctx.moveTo(0, 15 * s);
        ctx.quadraticCurveTo(5 * s, 35 * s, 0, 55 * s);
        ctx.stroke();
        
        // Bottom stone
        const stoneGrad = ctx.createRadialGradient(-5 * s, 50 * s, 0, 0, 55 * s, 22 * s);
        stoneGrad.addColorStop(0, stone.secondary);
        stoneGrad.addColorStop(0.5, stone.primary);
        stoneGrad.addColorStop(1, '#333');
        
        addGlow(stone.glow, 15);
        ctx.beginPath();
        ctx.arc(0, 55 * s, 22 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGrad;
        ctx.fill();
        
        // Drop sparkle
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(-6 * s, 52 * s, 5 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      
      clearGlow();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    // Draw Necklace
    const drawNecklace = (position) => {
      const x = position.x * width;
      const y = position.y * height;
      const s = scale * 1.2;

      ctx.save();
      ctx.translate(x, y);

      if (design === 'solitaire') {
        // Chain
        addGlow(metal.primary, 5);
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 3 * s;
        
        // Draw curved chain
        ctx.beginPath();
        ctx.moveTo(-80 * s, -60 * s);
        ctx.quadraticCurveTo(-40 * s, -30 * s, 0, 0);
        ctx.quadraticCurveTo(40 * s, -30 * s, 80 * s, -60 * s);
        ctx.stroke();
        
        // Chain links detail
        ctx.lineWidth = 1 * s;
        ctx.globalAlpha = 0.5;
        for (let i = -70; i <= 70; i += 10) {
          const cy = Math.abs(i) * 0.3 - 50;
          ctx.beginPath();
          ctx.moveTo(i * s, cy * s);
          ctx.lineTo((i + 5) * s, (cy - 3) * s);
          ctx.stroke();
        }
        
        // Pendant
        const stoneGrad = ctx.createRadialGradient(-4 * s, -4 * s, 0, 0, 0, 20 * s);
        stoneGrad.addColorStop(0, stone.secondary);
        stoneGrad.addColorStop(0.5, stone.primary);
        stoneGrad.addColorStop(1, '#222');
        
        addGlow(stone.glow, 20);
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 20 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGrad;
        ctx.fill();
        
        // Prongs
        clearGlow();
        ctx.fillStyle = metal.primary;
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const px = Math.cos(angle) * 18 * s;
          const py = Math.sin(angle) * 18 * s;
          ctx.beginPath();
          ctx.arc(px, py, 3 * s, 0, Math.PI * 2);
          ctx.fill();
        }
        
      } else if (design === 'cluster') {
        // Cluster necklace
        const positions = [
          { x: 0, y: 0, r: 18 },
          { x: -25, y: -10, r: 12 },
          { x: 25, y: -10, r: 12 },
          { x: -15, y: 20, r: 10 },
          { x: 15, y: 20, r: 10 }
        ];
        
        // Chain
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 2 * s;
        ctx.beginPath();
        ctx.moveTo(-70 * s, -50 * s);
        ctx.quadraticCurveTo(-35 * s, -20 * s, 0, 0);
        ctx.quadraticCurveTo(35 * s, -20 * s, 70 * s, -50 * s);
        ctx.stroke();
        
        // Stones
        positions.forEach((pos, idx) => {
          const stoneGrad = ctx.createRadialGradient(
            (pos.x - 3) * s, (pos.y - 3) * s, 0,
            pos.x * s, pos.y * s, pos.r * s
          );
          stoneGrad.addColorStop(0, idx === 0 ? stone.secondary : metal.secondary);
          stoneGrad.addColorStop(0.5, idx === 0 ? stone.primary : metal.primary);
          stoneGrad.addColorStop(1, '#333');
          
          if (idx === 0) addGlow(stone.glow, 12);
          
          ctx.beginPath();
          ctx.arc(pos.x * s, pos.y * s, pos.r * s, 0, Math.PI * 2);
          ctx.fillStyle = stoneGrad;
          ctx.fill();
          
          clearGlow();
        });
        
      } else if (design === 'bar') {
        // Bar necklace
        const barWidth = 100 * s;
        const barHeight = 12 * s;
        
        // Chain
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 2 * s;
        ctx.beginPath();
        ctx.moveTo(-50 * s, -40 * s);
        ctx.lineTo(-barWidth/2, -barHeight);
        ctx.moveTo(50 * s, -40 * s);
        ctx.lineTo(barWidth/2, -barHeight);
        ctx.stroke();
        
        // Bar
        const barGrad = ctx.createLinearGradient(-barWidth/2, 0, barWidth/2, 0);
        barGrad.addColorStop(0, metal.shadow);
        barGrad.addColorStop(0.5, metal.secondary);
        barGrad.addColorStop(1, metal.shadow);
        
        addGlow(metal.primary, 8);
        ctx.fillStyle = barGrad;
        ctx.fillRect(-barWidth/2, 0, barWidth, barHeight);
        
        // Center stone on bar
        const stoneGrad = ctx.createRadialGradient(-3 * s, 3 * s, 0, 0, 6 * s, 8 * s);
        stoneGrad.addColorStop(0, stone.secondary);
        stoneGrad.addColorStop(0.5, stone.primary);
        stoneGrad.addColorStop(1, '#333');
        
        addGlow(stone.glow, 10);
        ctx.beginPath();
        ctx.arc(0, 6 * s, 8 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGrad;
        ctx.fill();
      }
      
      clearGlow();
      ctx.restore();
    };

    // Draw Ring
    const drawRing = (position) => {
      const x = position.x * width;
      const y = position.y * height;
      const angle = position.angle || 0;
      const s = (position.scale || 0.1) * scale * 8;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);

      if (design === 'solitaire') {
        // Ring band
        const bandGrad = ctx.createLinearGradient(-15 * s, 0, 15 * s, 0);
        bandGrad.addColorStop(0, metal.shadow);
        bandGrad.addColorStop(0.3, metal.secondary);
        bandGrad.addColorStop(0.5, metal.primary);
        bandGrad.addColorStop(0.7, metal.secondary);
        bandGrad.addColorStop(1, metal.shadow);
        
        addGlow(metal.primary, 5);
        ctx.fillStyle = bandGrad;
        ctx.fillRect(-15 * s, -4 * s, 30 * s, 8 * s);
        
        // Stone setting
        ctx.fillStyle = metal.primary;
        ctx.beginPath();
        ctx.arc(0, -12 * s, 8 * s, 0, Math.PI * 2);
        ctx.fill();
        
        // Stone
        const stoneGrad = ctx.createRadialGradient(-3 * s, -15 * s, 0, 0, -12 * s, 12 * s);
        stoneGrad.addColorStop(0, stone.secondary);
        stoneGrad.addColorStop(0.5, stone.primary);
        stoneGrad.addColorStop(1, '#222');
        
        addGlow(stone.glow, 15);
        ctx.beginPath();
        ctx.arc(0, -12 * s, 12 * s, 0, Math.PI * 2);
        ctx.fillStyle = stoneGrad;
        ctx.fill();
        
        // Sparkle
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(-4 * s, -16 * s, 4 * s, 0, Math.PI * 2);
        ctx.fill();
        
      } else if (design === 'three-stone') {
        // Band
        const bandGrad = ctx.createLinearGradient(-20 * s, 0, 20 * s, 0);
        bandGrad.addColorStop(0, metal.shadow);
        bandGrad.addColorStop(0.5, metal.primary);
        bandGrad.addColorStop(1, metal.shadow);
        
        ctx.fillStyle = bandGrad;
        ctx.fillRect(-20 * s, -4 * s, 40 * s, 8 * s);
        
        // Three stones
        const stonePositions = [
          { x: -15 * s, y: -10 * s, r: 10 * s },
          { x: 0, y: -14 * s, r: 14 * s },
          { x: 15 * s, y: -10 * s, r: 10 * s }
        ];
        
        stonePositions.forEach((pos, idx) => {
          const alpha = idx === 1 ? 1 : 0.7;
          ctx.globalAlpha = alpha;
          
          const stoneGrad = ctx.createRadialGradient(
            pos.x - 3 * s, pos.y - 3 * s, 0,
            pos.x, pos.y, pos.r
          );
          stoneGrad.addColorStop(0, stone.secondary);
          stoneGrad.addColorStop(0.5, stone.primary);
          stoneGrad.addColorStop(1, '#333');
          
          addGlow(stone.glow, idx === 1 ? 15 : 10);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pos.r, 0, Math.PI * 2);
          ctx.fillStyle = stoneGrad;
          ctx.fill();
        });
        
      } else if (design === 'eternity') {
        // Eternity band with continuous stones
        ctx.fillStyle = metal.primary;
        ctx.fillRect(-18 * s, -5 * s, 36 * s, 10 * s);
        
        // Small stones around
        for (let i = -15; i <= 15; i += 7) {
          const stoneGrad = ctx.createRadialGradient(
            (i - 2) * s, -8 * s, 0,
            i * s, -6 * s, 4 * s
          );
          stoneGrad.addColorStop(0, stone.secondary);
          stoneGrad.addColorStop(0.5, stone.primary);
          stoneGrad.addColorStop(1, '#333');
          
          ctx.beginPath();
          ctx.arc(i * s, -6 * s, 4 * s, 0, Math.PI * 2);
          ctx.fillStyle = stoneGrad;
          ctx.fill();
        }
      }
      
      clearGlow();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    // Draw Bangle
    const drawBangle = (position) => {
      const x = position.x * width;
      const y = position.y * height;
      const angle = position.angle || 0;
      const s = (position.scale || 0.15) * scale * 6;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);

      if (design === 'plain') {
        // Plain bangle
        const grad = ctx.createLinearGradient(-40 * s, -10 * s, 40 * s, 10 * s);
        grad.addColorStop(0, metal.shadow);
        grad.addColorStop(0.3, metal.primary);
        grad.addColorStop(0.5, metal.secondary);
        grad.addColorStop(0.7, metal.primary);
        grad.addColorStop(1, metal.shadow);
        
        addGlow(metal.primary, 8);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 12 * s;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.ellipse(0, 0, 45 * s, 35 * s, 0, 0.2, Math.PI * 2 - 0.2);
        ctx.stroke();
        
      } else if (design === 'diamond-studded') {
        // Bangle with stones
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 10 * s;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.ellipse(0, 0, 45 * s, 35 * s, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add stones
        const stoneCount = 12;
        for (let i = 0; i < stoneCount; i++) {
          const angle = (i / stoneCount) * Math.PI * 2;
          const sx = Math.cos(angle) * 45 * s;
          const sy = Math.sin(angle) * 35 * s;
          
          const stoneGrad = ctx.createRadialGradient(
            sx - 3 * s, sy - 3 * s, 0,
            sx, sy, 5 * s
          );
          stoneGrad.addColorStop(0, stone.secondary);
          stoneGrad.addColorStop(0.5, stone.primary);
          stoneGrad.addColorStop(1, '#333');
          
          addGlow(stone.glow, 8);
          ctx.beginPath();
          ctx.arc(sx, sy, 5 * s, 0, Math.PI * 2);
          ctx.fillStyle = stoneGrad;
          ctx.fill();
        }
        
      } else if (design === 'twisted') {
        // Twisted rope style
        ctx.strokeStyle = metal.primary;
        ctx.lineWidth = 6 * s;
        ctx.lineCap = 'round';
        
        // Draw twisted effect
        for (let offset = -8; offset <= 8; offset += 4) {
          const grad = ctx.createLinearGradient(-45 * s, offset * s, 45 * s, -offset * s);
          grad.addColorStop(0, metal.shadow);
          grad.addColorStop(0.5, metal.secondary);
          grad.addColorStop(1, metal.shadow);
          
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, offset * s, 45 * s, 32 * s, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      clearGlow();
      ctx.restore();
    };

    // Main rendering
    ctx.clearRect(0, 0, width, height);

    if (faceData?.faceDetected) {
      const type = selectedProduct?.type;
      
      if (type === 'earring') {
        drawEarring(faceData.leftEar, 'left');
        drawEarring(faceData.rightEar, 'right');
      } else if (type === 'necklace') {
        drawNecklace(faceData.neck);
      }
    }

    if (handData?.handsDetected) {
      const type = selectedProduct?.type;
      
      if (type === 'ring') {
        handData.rings.forEach(ring => {
          // Only draw on ring and middle fingers for better visibility
          if (['ring', 'middle'].includes(ring.finger)) {
            drawRing(ring);
          }
        });
      } else if (type === 'bangle') {
        handData.bangles.forEach(bangle => {
          drawBangle(bangle);
        });
      }
    }
  }, [customization, size, selectedProduct]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !videoDimensions) return;

    const ctx = canvas.getContext('2d');
    canvas.width = videoDimensions.width;
    canvas.height = videoDimensions.height;

    let animationId;
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime) => {
      animationId = requestAnimationFrame(render);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      frameRef.current++;

      drawJewelry(ctx, faceData, handData);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [drawJewelry, faceData, handData, videoDimensions]);

  if (!videoDimensions) return null;

  return (
    <canvas
      ref={canvasRef}
      className="ar-canvas"
      style={{
        width: videoDimensions.width,
        height: videoDimensions.height,
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    />
  );
};

export default TryOnCanvas;
