import { h, useEffect, useRef } from "../../vendor/preact.js";

/**
 * Fondo animado de red neuronal dibujado en canvas.
 *
 * Genera nodos que derivan lentamente y se conectan entre sí cuando están
 * próximos, evocando el grafo de entidades del producto. Se detiene cuando
 * el usuario prefiere movimiento reducido o la pestaña no está visible.
 */
export function NeuralField({ density = 46, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let nodes = [];
    let frame = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Ajustar la cantidad de nodos al área disponible.
      const area = width * height;
      const count = Math.max(18, Math.min(density, Math.round(area / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(170, width * 0.16);

      // Enlaces entre nodos próximos.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          const alpha = (1 - dist / linkDist) * 0.28;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodos.
      nodes.forEach((n) => {
        const near = Math.hypot(n.x - pointer.x, n.y - pointer.y) < 130;
        const glow = near ? 0.85 : 0.42 + Math.sin(n.pulse) * 0.18;
        ctx.fillStyle = `rgba(${near ? "125, 211, 252" : "34, 211, 238"}, ${glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (near ? 1.7 : 1), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = () => {
      if (!running) return;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        // Rebote suave en los bordes.
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Ligera atracción hacia el puntero.
        if (interactive) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 1) {
            n.x += (dx / dist) * 0.25;
            n.y += (dy / dist) * 0.25;
          }
        }
      });

      draw();
      frame = requestAnimationFrame(step);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!reduced) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };

    resize();

    if (reduced) {
      draw();
    } else {
      frame = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, interactive]);

  return h("canvas", { class: "neural-field", ref: canvasRef, "aria-hidden": "true" });
}
