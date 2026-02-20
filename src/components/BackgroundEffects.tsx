import { useEffect, useRef, useCallback } from "react";

const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightningContainerRef = useRef<HTMLDivElement>(null);

  const createLightningBolt = useCallback(() => {
    const container = lightningContainerRef.current;
    if (!container) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const startX = Math.random() * window.innerWidth;
    const width = 200;
    const height = window.innerHeight * 0.7;
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.style.position = "absolute";
    svg.style.left = `${startX - width / 2}px`;
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "1";

    // Generate branching lightning path
    const generateBranch = (sx: number, sy: number, length: number, angle: number, depth: number): string => {
      let path = `M ${sx} ${sy}`;
      let cx = sx, cy = sy;
      const segments = Math.floor(length / 15);
      for (let i = 0; i < segments; i++) {
        const jitter = (Math.random() - 0.5) * 30;
        cx += Math.sin(angle) * 15 + jitter;
        cy += Math.cos(angle) * 15;
        path += ` L ${cx} ${cy}`;
      }
      return path;
    };

    const mainPath = generateBranch(width / 2, 0, height, 0, 0);
    
    const createPathEl = (d: string, strokeWidth: number, opacity: number, blur: number) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      p.setAttribute("stroke", `hsla(180, 100%, ${70 + Math.random() * 30}%, ${opacity})`);
      p.setAttribute("stroke-width", String(strokeWidth));
      p.setAttribute("fill", "none");
      p.setAttribute("stroke-linecap", "round");
      if (blur > 0) p.setAttribute("filter", `blur(${blur}px)`);
      return p;
    };

    // Outer glow
    svg.appendChild(createPathEl(mainPath, 8, 0.3, 6));
    // Mid glow
    svg.appendChild(createPathEl(mainPath, 4, 0.6, 3));
    // Core
    svg.appendChild(createPathEl(mainPath, 1.5, 1, 0));

    // Add 1-3 branches
    const branchCount = Math.floor(Math.random() * 3) + 1;
    for (let b = 0; b < branchCount; b++) {
      const splitPoint = Math.random() * 0.6 + 0.2;
      const bx = width / 2 + (Math.random() - 0.5) * 40;
      const by = height * splitPoint;
      const bAngle = (Math.random() - 0.5) * 1.2;
      const branchPath = generateBranch(bx, by, height * 0.3, bAngle, 1);
      svg.appendChild(createPathEl(branchPath, 3, 0.3, 4));
      svg.appendChild(createPathEl(branchPath, 1, 0.7, 0));
    }

    container.appendChild(svg);

    // Screen flash
    const flash = document.createElement("div");
    flash.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: hsla(180, 100%, 90%, 0.08); pointer-events: none; z-index: 0;
      transition: opacity 0.15s;
    `;
    container.appendChild(flash);

    // Double strike chance
    const doubleStrike = Math.random() > 0.7;
    
    // Animate
    svg.style.opacity = "1";
    setTimeout(() => { svg.style.opacity = "0.3"; }, 50);
    setTimeout(() => { svg.style.opacity = doubleStrike ? "0.9" : "0"; }, 100);
    setTimeout(() => { svg.style.opacity = "0"; flash.style.opacity = "0"; }, doubleStrike ? 200 : 150);
    setTimeout(() => { svg.remove(); flash.remove(); }, 500);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.style.cssText = `
        position: absolute; width: 2px; height: 2px;
        background: hsl(180, 100%, 50%); border-radius: 50%;
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 5 + 5}s infinite;
        animation-delay: ${Math.random() * 10}s; opacity: 0;
      `;
      container.appendChild(p);
    }

    // Electric orbs
    for (let i = 0; i < 8; i++) {
      const orb = document.createElement("div");
      orb.style.cssText = `
        position: absolute; width: ${6 + Math.random() * 6}px; height: ${6 + Math.random() * 6}px;
        background: radial-gradient(circle, hsla(180,100%,50%,1), hsla(210,100%,50%,0.5), transparent);
        border-radius: 50%;
        box-shadow: 0 0 20px hsla(180,100%,50%,1), 0 0 40px hsla(180,100%,50%,0.6), 0 0 60px hsla(210,100%,50%,0.4);
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        animation: orbFloat ${6 + Math.random() * 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(orb);
    }

    // Electric arcs
    for (let i = 0; i < 12; i++) {
      const arc = document.createElement("div");
      arc.style.cssText = `
        position: absolute; width: 2px; height: ${100 + Math.random() * 150}px;
        background: linear-gradient(to bottom, hsla(180,100%,50%,1) 0%, hsla(210,100%,50%,0.6) 40%, transparent 100%);
        box-shadow: 0 0 10px hsla(180,100%,50%,1), 0 0 20px hsla(180,100%,50%,0.8);
        left: ${Math.random() * 100}%;
        animation: electricArcFlow 3s linear infinite;
        animation-delay: ${Math.random() * 3}s; opacity: 0;
      `;
      container.appendChild(arc);
    }

    // Circuit lines
    for (let i = 0; i < 6; i++) {
      const line = document.createElement("div");
      line.style.cssText = `
        position: absolute; height: 1px;
        background: linear-gradient(90deg, transparent 0%, hsla(180,100%,50%,0.4) 20%, hsla(180,100%,50%,0.8) 50%, hsla(180,100%,50%,0.4) 80%, transparent 100%);
        top: ${Math.random() * 100}%; left: 0; width: ${30 + Math.random() * 50}%;
        animation: circuitPulse 4s linear infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(line);
    }

    // Plasma pulses
    for (let i = 0; i < 4; i++) {
      const plasma = document.createElement("div");
      plasma.style.cssText = `
        position: absolute; width: 80px; height: 80px;
        background: radial-gradient(circle, hsla(180,100%,50%,0.15) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        animation: plasmaOrb ${4 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(plasma);
    }

    // Lightning interval
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.4) createLightningBolt();
    }, 2000);

    // Distant glow flickers
    const flickerInterval = setInterval(() => {
      const glow = document.createElement("div");
      glow.style.cssText = `
        position: fixed; top: 0; left: ${Math.random() * 100}%;
        width: 400px; height: 300px;
        background: radial-gradient(ellipse, hsla(180,100%,50%,0.06), transparent 70%);
        pointer-events: none; z-index: 0;
        transition: opacity 0.5s;
      `;
      container.appendChild(glow);
      setTimeout(() => { glow.style.opacity = "0"; }, 200);
      setTimeout(() => glow.remove(), 700);
    }, 3000);

    return () => {
      clearInterval(lightningInterval);
      clearInterval(flickerInterval);
    };
  }, [createLightningBolt]);

  return (
    <>
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(hsla(180,100%,50%,0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsla(180,100%,50%,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      {/* Particles & effects container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" />
      {/* Lightning container */}
      <div ref={lightningContainerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden" style={{ mixBlendMode: "screen" }} />
      {/* Energy fog */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, hsla(180,100%,50%,0.04), transparent 50%),
            radial-gradient(ellipse at 80% 20%, hsla(210,100%,50%,0.04), transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsla(180,100%,50%,0.02), transparent 70%)
          `,
        }}
      />
    </>
  );
};

export default BackgroundEffects;
