import { h, useRef, useState, useEffect } from "../../vendor/preact.js";
import { Icon } from "./Icon.js";

/** Convierte "m:ss" a segundos */
const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
};

/**
 * Reproductor de audio con segmentos de tiempo.
 * Permite reproducir un fragmento específico (startTime - endTime) de un archivo.
 * Soporta velocidad de reproducción (playbackRate) y autoplay.
 */
export function AudioPlayer({ src, startTime, endTime, label = "Escuchar", speed = 1.2, autoplay = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Autoplay al montar el componente (intenta reproducir, pero respeta política de navegador)
  useEffect(() => {
    if (autoplay && audioRef.current) {
      const start = parseTime(startTime);
      audioRef.current.currentTime = start;
      audioRef.current.playbackRate = speed;

      // Intenta reproducir, pero captura rechazo si el navegador lo bloquea
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Navegador bloqueó autoplay - es normal, usuario debe hacer click
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay, speed, startTime, endTime]);

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = start;
      audioRef.current.playbackRate = speed;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    setCurrentTime(current);

    // Detiene al llegar al fin del segmento
    if (current >= end) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const progress = end > start ? ((currentTime - start) / (end - start)) * 100 : 0;

  return h(
    "div",
    { class: "audio-player" },
    h(
      "button",
      {
        type: "button",
        class: "audio-player__btn",
        onClick: togglePlay,
        title: isPlaying ? "Pausar" : "Reproducir",
      },
      h(Icon, { name: isPlaying ? "pause" : "play", size: 16 })
    ),
    h(
      "div",
      { class: "audio-player__info" },
      h("span", { class: "audio-player__label" }, label),
      h(
        "div",
        { class: "audio-player__progress" },
        h("div", { class: "audio-player__bar", style: { width: `${progress}%` } })
      )
    ),
    h("audio", {
      ref: audioRef,
      src,
      onTimeUpdate: handleTimeUpdate,
      onEnded: handleEnded,
      preload: "metadata",
    })
  );
}
