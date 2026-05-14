import React, { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRACKS = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    plays: 4821,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    color: "#e63946",
    seconds: 200,
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:37",
    plays: 3652,
    cover: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
    color: "#457b9d",
    seconds: 157,
  },
  {
    id: 3,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: "3:21",
    plays: 2987,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    color: "#f4a261",
    seconds: 201,
  },
  {
    id: 4,
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: "2:58",
    plays: 2541,
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=200&fit=crop",
    color: "#2a9d8f",
    seconds: 178,
  },
  {
    id: 5,
    title: "Unholy",
    artist: "Sam Smith",
    album: "Gloria",
    duration: "2:36",
    plays: 2103,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop",
    color: "#9b2226",
    seconds: 156,
  },
  {
    id: 6,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    plays: 1899,
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
    color: "#7209b7",
    seconds: 200,
  },
  {
    id: 7,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    plays: 1754,
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&h=200&fit=crop",
    color: "#f77f00",
    seconds: 203,
  },
];

const STATS = [
  { label: "Треков прослушано", value: "1 842", icon: "Music" },
  { label: "Минут музыки", value: "6 241", icon: "Clock" },
  { label: "Исполнителей", value: "94", icon: "Mic2" },
  { label: "Жанров", value: "12", icon: "Radio" },
];

const TOP_GENRES = [
  { name: "Pop", pct: 42, color: "#1db954" },
  { name: "R&B", pct: 28, color: "#457b9d" },
  { name: "Indie", pct: 17, color: "#f4a261" },
  { name: "Electronic", pct: 13, color: "#e63946" },
];

const STRIPES = [
  { color: "#1db954", width: 80, top: "8%", dur: "5s", delay: "0s" },
  { color: "#e63946", width: 48, top: "22%", dur: "7.5s", delay: "1.4s" },
  { color: "#457b9d", width: 120, top: "38%", dur: "6s", delay: "0.6s" },
  { color: "#f4a261", width: 36, top: "55%", dur: "8s", delay: "2.5s" },
  { color: "#9b2226", width: 64, top: "68%", dur: "5.5s", delay: "3.8s" },
  { color: "#2a9d8f", width: 90, top: "80%", dur: "9s", delay: "1s" },
  { color: "#7209b7", width: 52, top: "90%", dur: "6.5s", delay: "4.2s" },
];

const CHORUS_START = 54; // секунда начала припева Scrubb — Everything

function SplashScreen({
  onEnter,
  exiting,
}: {
  onEnter: () => void;
  exiting: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioReady, setAudioReady] = useState(false);

  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio || audioReady) return;
    audio.currentTime = CHORUS_START;
    audio.volume = 0.85;
    audio.play()
      .then(() => setAudioReady(true))
      .catch(() => {});
  };

  const fadeAndEnter = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused) { onEnter(); return; }
    let vol = audio.volume;
    const step = vol / 20;
    const fade = setInterval(() => {
      vol = Math.max(0, vol - step);
      audio.volume = vol;
      if (vol <= 0) {
        audio.pause();
        clearInterval(fade);
      }
    }, 40);
    onEnter();
  };

  return (
    <div
      className={exiting ? "splash-exit" : ""}
      onClick={startAudio}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Golos Text', sans-serif",
        zIndex: 100,
        cursor: "default",
      }}
    >
      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src="https://files.catbox.moe/ldrhts.mp3"
        preload="auto"
        loop
      />

      {/* Animated colour stripes */}
      {STRIPES.map((s, i) => (
        <div
          key={i}
          className="stripe-anim"
          style={{
            position: "absolute",
            top: s.top,
            left: 0,
            width: `${s.width}px`,
            height: "200vh",
            background: s.color,
            opacity: 0.55,
            animationDuration: s.dur,
            animationDelay: s.delay,
            borderRadius: "4px",
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Glow orbs */}
      <div
        className="pulse-glow"
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #1db954 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pulse-glow"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #e63946 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "1.5s",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "600px" }}>
        {/* Floating music note */}
        <div
          className="float-note"
          style={{ fontSize: "48px", marginBottom: "32px", display: "inline-block" }}
        >
          🎵
        </div>

        {/* Eyebrow */}
        <p
          className="splash-text-in"
          style={{
            color: "#1db954",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "20px",
            animationDelay: "0.1s",
          }}
        >
          Музыкальные итоги · 2026
        </p>

        {/* Main headline */}
        <h1
          className="splash-text-in"
          style={{
            fontSize: "clamp(28px, 6vw, 54px)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: "24px",
            animationDelay: "0.25s",
          }}
        >
          Не просто музыкальные итоги,
          <br />
          <span style={{ color: "#1db954" }}>а приглашение отметить</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #1db954, #f4a261, #e63946, #457b9d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            мои 30 🎂
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="splash-text-in"
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "48px",
            animationDelay: "0.4s",
            fontWeight: 400,
          }}
        >
          Привет,{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>Гулять</span>
          &nbsp;— это специально для тебя ✨
        </p>

        {/* CTA button */}
        <div className="splash-text-in" style={{ animationDelay: "0.6s" }}>
          <button
            onClick={(e) => { e.stopPropagation(); fadeAndEnter(); }}
            className="btn-breathe"
            style={{
              background: "#1db954",
              color: "#000",
              border: "none",
              borderRadius: "100px",
              padding: "18px 52px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "transform 0.15s ease, background 0.15s ease",
              fontFamily: "'Golos Text', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLButtonElement).style.background = "#1ed760";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.background = "#1db954";
            }}
          >
            Открыть итоги 🎉
          </button>
        </div>

        {/* Small note */}
        <p
          className="splash-text-in"
          style={{
            marginTop: "24px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            animationDelay: "0.8s",
          }}
        >
          {audioReady ? "🎵 Scrubb — Everything" : "🔇 Коснись экрана чтобы включить звук"}
        </p>
      </div>
    </div>
  );
}

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [section, setSection] = useState<"home" | "tracks" | "stats">("home");
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [liked, setLiked] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleEnter = () => {
    setSplashOut(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            const idx = TRACKS.findIndex((t) => t.id === currentTrack.id);
            const next = TRACKS[(idx + 1) % TRACKS.length];
            setCurrentTrack(next);
            return 0;
          }
          return p + 100 / currentTrack.seconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentTrack]);

  const playTrack = (track: typeof TRACKS[0]) => {
    if (track.id === currentTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    const idx = TRACKS.findIndex((t) => t.id === currentTrack.id);
    setCurrentTrack(TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length]);
    setProgress(0);
  };

  const nextTrack = () => {
    const idx = TRACKS.findIndex((t) => t.id === currentTrack.id);
    setCurrentTrack(TRACKS[(idx + 1) % TRACKS.length]);
    setProgress(0);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const formatProgress = (pct: number, seconds: number) => {
    const s = Math.floor((pct / 100) * seconds);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const navItems = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "tracks", label: "Топ-треки", icon: "ListMusic" },
    { key: "stats", label: "Статистика", icon: "BarChart2" },
  ] as const;

  if (showSplash) {
    return <SplashScreen onEnter={handleEnter} exiting={splashOut} />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--sp-surface)", fontFamily: "'Golos Text', sans-serif" }}
    >
      <div className="flex flex-1 overflow-hidden" style={{ paddingBottom: "88px" }}>
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 py-6 px-4 gap-1" style={{ background: "#000" }}>
          <div className="mb-8 px-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--sp-green)" }}>
                <Icon name="Music2" size={14} style={{ color: "#000" }} />
              </div>
              <span className="font-bold text-sm tracking-tight">Моя Музыка</span>
            </div>
          </div>

          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                section === item.key ? "text-white bg-white/10" : "hover:text-white"
              }`}
              style={{ color: section === item.key ? "white" : "var(--sp-text-muted)" }}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}

          <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="px-3">
              <p className="text-xs mb-3 font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>
                Недавние
              </p>
              {TRACKS.slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  onClick={() => playTrack(t)}
                  className="flex items-center gap-2.5 w-full py-1.5 text-left group"
                >
                  <img src={t.cover} className="w-8 h-8 rounded object-cover" alt={t.title} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-medium truncate transition-colors"
                      style={{ color: currentTrack.id === t.id ? "var(--sp-green)" : "rgba(255,255,255,0.8)" }}
                    >
                      {t.title}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--sp-text-muted)" }}>
                      {t.artist}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {/* Mobile nav */}
          <div
            className="flex md:hidden gap-1 mb-6 p-1 rounded-xl"
            style={{ background: "var(--sp-surface-3)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: section === item.key ? "rgba(255,255,255,0.15)" : "transparent",
                  color: section === item.key ? "white" : "var(--sp-text-muted)",
                }}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>

          {/* HOME */}
          {section === "home" && (
            <div className="animate-fade-up">
              <div
                className="relative overflow-hidden rounded-2xl p-8 mb-8"
                style={{
                  background: `linear-gradient(135deg, ${currentTrack.color}33 0%, ${currentTrack.color}11 60%, transparent 100%)`,
                  border: `1px solid ${currentTrack.color}22`,
                }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="relative shrink-0">
                    <img
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      className="w-36 h-36 md:w-44 md:h-44 object-cover shadow-2xl transition-all duration-500"
                      style={{
                        borderRadius: isPlaying ? "50%" : "16px",
                        boxShadow: isPlaying
                          ? `0 0 40px ${currentTrack.color}66`
                          : "0 8px 32px rgba(0,0,0,0.4)",
                        animation: isPlaying ? "spin-slow 8s linear infinite" : "none",
                      }}
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p
                      className="text-xs font-medium uppercase tracking-widest mb-2"
                      style={{ color: "var(--sp-text-muted)" }}
                    >
                      Сейчас играет
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1 leading-tight">{currentTrack.title}</h1>
                    <p className="text-lg mb-6" style={{ color: "var(--sp-text-muted)" }}>
                      {currentTrack.artist} · {currentTrack.album}
                    </p>

                    <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                      <button onClick={() => toggleLike(currentTrack.id)} className="transition-transform hover:scale-110">
                        <Icon
                          name="Heart"
                          size={20}
                          style={{
                            color: liked.includes(currentTrack.id) ? "var(--sp-green)" : "var(--sp-text-muted)",
                            fill: liked.includes(currentTrack.id) ? "var(--sp-green)" : "none",
                          }}
                        />
                      </button>
                      <button
                        onClick={prevTrack}
                        className="transition-colors hover:text-white"
                        style={{ color: "var(--sp-text-muted)" }}
                      >
                        <Icon name="SkipBack" size={22} />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{ backgroundColor: "var(--sp-green)", color: "#000" }}
                      >
                        <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                      </button>
                      <button
                        onClick={nextTrack}
                        className="transition-colors hover:text-white"
                        style={{ color: "var(--sp-text-muted)" }}
                      >
                        <Icon name="SkipForward" size={22} />
                      </button>
                      <button
                        className="transition-colors hover:text-white"
                        style={{ color: "var(--sp-text-muted)" }}
                      >
                        <Icon name="Shuffle" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Недавно слушал</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TRACKS.slice(0, 4).map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => playTrack(t)}
                    className="group relative p-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: currentTrack.id === t.id ? t.color + "22" : "var(--sp-surface-3)",
                      border: currentTrack.id === t.id ? `1px solid ${t.color}44` : "1px solid transparent",
                    }}
                  >
                    <img
                      src={t.cover}
                      className="w-full aspect-square object-cover rounded-lg mb-3 shadow-md"
                      alt={t.title}
                    />
                    <p className="font-semibold text-sm truncate">{t.title}</p>
                    <p className="text-xs truncate" style={{ color: "var(--sp-text-muted)" }}>
                      {t.artist}
                    </p>
                    <div
                      className="absolute bottom-12 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                      style={{ backgroundColor: "var(--sp-green)" }}
                    >
                      <Icon
                        name={currentTrack.id === t.id && isPlaying ? "Pause" : "Play"}
                        size={16}
                        style={{ color: "#000" }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TRACKS */}
          {section === "tracks" && (
            <div className="animate-fade-up">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--sp-text-muted)" }}>
                  Твои любимые
                </p>
                <h2 className="text-3xl font-bold">Топ-треки</h2>
              </div>

              <div className="flex flex-col gap-1">
                {TRACKS.map((track, i) => (
                  <div
                    key={track.id}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer"
                    style={{ background: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onClick={() => playTrack(track)}
                  >
                    <div className="w-6 text-center shrink-0">
                      {currentTrack.id === track.id && isPlaying ? (
                        <div className="flex items-end gap-0.5 justify-center" style={{ height: "16px" }}>
                          <div className="w-0.5 rounded-full animate-bar-1" style={{ height: "8px", background: "var(--sp-green)" }} />
                          <div className="w-0.5 rounded-full animate-bar-2" style={{ height: "8px", background: "var(--sp-green)" }} />
                          <div className="w-0.5 rounded-full animate-bar-3" style={{ height: "8px", background: "var(--sp-green)" }} />
                        </div>
                      ) : (
                        <span className="text-sm" style={{ color: "var(--sp-text-muted)" }}>
                          {i + 1}
                        </span>
                      )}
                    </div>

                    <img src={track.cover} className="w-10 h-10 rounded object-cover shrink-0" alt={track.title} />

                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium text-sm truncate"
                        style={{ color: currentTrack.id === track.id ? "var(--sp-green)" : "white" }}
                      >
                        {track.title}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--sp-text-muted)" }}>
                        {track.artist}
                      </p>
                    </div>

                    <p className="hidden md:block text-sm truncate w-36 shrink-0" style={{ color: "var(--sp-text-muted)" }}>
                      {track.album}
                    </p>

                    <p className="hidden md:block text-sm w-20 text-right shrink-0" style={{ color: "var(--sp-text-muted)" }}>
                      {track.plays.toLocaleString("ru-RU")}
                    </p>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ opacity: liked.includes(track.id) ? 1 : undefined }}
                    >
                      <Icon
                        name="Heart"
                        size={16}
                        style={{
                          color: liked.includes(track.id) ? "var(--sp-green)" : "var(--sp-text-muted)",
                          fill: liked.includes(track.id) ? "var(--sp-green)" : "none",
                        }}
                      />
                    </button>

                    <p className="text-sm shrink-0 w-10 text-right" style={{ color: "var(--sp-text-muted)" }}>
                      {track.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATS */}
          {section === "stats" && (
            <div className="animate-fade-up">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--sp-text-muted)" }}>
                  Твоя активность
                </p>
                <h2 className="text-3xl font-bold">Статистика</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="p-5 rounded-2xl"
                    style={{ background: "var(--sp-surface-3)", animationDelay: `${i * 0.1}s` }}
                  >
                    <Icon name={s.icon} size={18} style={{ color: "var(--sp-green)" }} />
                    <p className="text-2xl font-bold mt-3 mb-1">{s.value}</p>
                    <p className="text-xs" style={{ color: "var(--sp-text-muted)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl" style={{ background: "var(--sp-surface-3)" }}>
                  <h3
                    className="font-semibold mb-4 text-sm uppercase tracking-wider"
                    style={{ color: "var(--sp-text-muted)" }}
                  >
                    Топ-исполнители
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { name: "Taylor Swift", plays: 312, img: TRACKS[3].cover },
                      { name: "The Weeknd", plays: 248, img: TRACKS[0].cover },
                      { name: "Dua Lipa", plays: 201, img: TRACKS[6].cover },
                      { name: "Harry Styles", plays: 178, img: TRACKS[1].cover },
                    ].map((a, i) => (
                      <div key={a.name} className="flex items-center gap-3">
                        <span className="text-xs w-4" style={{ color: "var(--sp-text-muted)" }}>
                          {i + 1}
                        </span>
                        <img src={a.img} className="w-9 h-9 rounded-full object-cover" alt={a.name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{a.name}</p>
                          <p className="text-xs" style={{ color: "var(--sp-text-muted)" }}>
                            {a.plays} треков
                          </p>
                        </div>
                        <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: "#333" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(a.plays / 312) * 100}%`,
                              background: "var(--sp-green)",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl" style={{ background: "var(--sp-surface-3)" }}>
                  <h3
                    className="font-semibold mb-4 text-sm uppercase tracking-wider"
                    style={{ color: "var(--sp-text-muted)" }}
                  >
                    Жанры
                  </h3>
                  <div className="flex flex-col gap-4">
                    {TOP_GENRES.map((g) => (
                      <div key={g.name}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{g.name}</span>
                          <span style={{ color: "var(--sp-text-muted)" }}>{g.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#333" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${g.pct}%`, background: g.color, transition: "width 1s ease" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <p
                      className="text-xs mb-3 font-medium uppercase tracking-wider"
                      style={{ color: "var(--sp-text-muted)" }}
                    >
                      Активность по дням
                    </p>
                    <div className="flex items-end gap-1.5" style={{ height: "64px" }}>
                      {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            background: i === 5 ? "var(--sp-green)" : "#333",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                        <span key={d} className="text-xs flex-1 text-center" style={{ color: "var(--sp-text-muted)" }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Player bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          background: "rgba(24,24,24,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="w-full mb-2 flex items-center gap-2">
          <span className="text-xs w-8 text-right" style={{ color: "var(--sp-text-muted)" }}>
            {formatProgress(progress, currentTrack.seconds)}
          </span>
          <div
            className="flex-1 h-1 rounded-full overflow-hidden cursor-pointer"
            style={{ background: "#4d4d4d" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "var(--sp-green)", transition: "width 1s linear" }}
            />
          </div>
          <span className="text-xs w-8" style={{ color: "var(--sp-text-muted)" }}>
            {currentTrack.duration}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={currentTrack.cover}
              className="w-10 h-10 rounded object-cover shrink-0 shadow-md"
              alt={currentTrack.title}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">{currentTrack.title}</p>
              <p className="text-xs truncate" style={{ color: "var(--sp-text-muted)" }}>
                {currentTrack.artist}
              </p>
            </div>
            <button onClick={() => toggleLike(currentTrack.id)} className="shrink-0 ml-1">
              <Icon
                name="Heart"
                size={16}
                style={{
                  color: liked.includes(currentTrack.id) ? "var(--sp-green)" : "var(--sp-text-muted)",
                  fill: liked.includes(currentTrack.id) ? "var(--sp-green)" : "none",
                }}
              />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevTrack}
              className="transition-colors hover:text-white"
              style={{ color: "var(--sp-text-muted)" }}
            >
              <Icon name="SkipBack" size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: "white", color: "#000" }}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
            </button>
            <button
              onClick={nextTrack}
              className="transition-colors hover:text-white"
              style={{ color: "var(--sp-text-muted)" }}
            >
              <Icon name="SkipForward" size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
            <Icon name="Volume2" size={16} style={{ color: "var(--sp-text-muted)" }} />
            <div
              className="w-24 h-1 rounded-full cursor-pointer relative"
              style={{ background: "#4d4d4d" }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setVolume(Math.max(0, Math.min(100, pct)));
              }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${volume}%`, background: "var(--sp-green)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}