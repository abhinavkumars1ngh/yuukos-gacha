import { useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef();
  const audioRef = useRef();

  const [started, setStarted] = useState(false);
  const [number, setNumber] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [bursts, setBursts] = useState([]);

  function startGame() {
    const num = Math.floor(Math.random() * 100);
    setNumber(num);

    setStarted(true);
    setShowResult(false);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 100);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;

    if (
      video.duration &&
      video.duration - video.currentTime <= 3 &&
      !showResult
    ) {
      setShowResult(true);
      audioRef.current.play();
    }
  }

  /* -------- STICKER BURST -------- */

  function spawnBurst(x, y) {
    const id = Date.now();

    const newBursts = Array.from({ length: 8 }).map((_, i) => ({
      id: id + i,
      x,
      y,
      offsetX: (Math.random() - 0.5) * 120,
    }));

    setBursts(prev => [...prev, ...newBursts]);

    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id < id));
    }, 1500);
  }

  /* ------------------------------- */

  return (
    <div>
      {/* HOME SCREEN */}
      {!started && (
        <div
          className="homeScreen"
          style={{
            backgroundImage: "url('/home-bg.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "white",
          }}
        >
          {/* Stickers */}
          <img
            src="/stickers/star.png"
            className="sticker"
            style={{ top: "20%", left: "0%", cursor: "pointer", pointerEvents: "auto" }}
            onClick={(e) => spawnBurst(e.clientX, e.clientY)}
          />

          <img
            src="/stickers/cat.png"
            className="sticker"
            style={{
              bottom: "20px",
              left: "49%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={(e) => spawnBurst(e.clientX, e.clientY)}
          />

          <img
            src="/stickers/sparkle.png"
            className="sticker"
            style={{ top: "25%", left: "80%", cursor: "pointer", pointerEvents: "auto" }}
            onClick={(e) => spawnBurst(e.clientX, e.clientY)}
          />

          <img
            src="/stickers/run.png"
            className="sticker"
            style={{ top: "18%", left: "20%", cursor: "pointer", pointerEvents: "auto" }}
            onClick={(e) => spawnBurst(e.clientX, e.clientY)}
          />

          {/* Title */}
          <h1
            className="title"
            style={{
              position: "absolute",
              top: "30px",
              textAlign: "center",
            }}
          >
            Yuuko's Gacha
          </h1>

          <button className="playBtn" onClick={startGame}>
            PLAY
          </button>
        </div>
      )}

      {/* VIDEO */}
      {started && (
        <video
          ref={videoRef}
          src="/gacha.mp4"
          className="fadeVideo"
          onTimeUpdate={handleTimeUpdate}
        />
      )}

      {/* AUDIO */}
      <audio ref={audioRef} src="/chime.mp3" />

      {/* RESULT */}
      {showResult && (
        <div className="fadeText">
{`Not her luck...
Maybe yours.
      -Mogamigawa

${number}`}
        </div>
      )}

      {/* BURST IMAGES */}
      {bursts.map((b) => (
        <img
          key={b.id}
          src="/stickers/heart.png"  /* burst image */
          className="burst"
          style={{
            left: b.x + b.offsetX,
            top: b.y,
          }}
        />
      ))}
    </div>
  );
}

export default App;