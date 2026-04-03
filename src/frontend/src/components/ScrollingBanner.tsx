export default function ScrollingBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-red py-4 overflow-hidden border-t-4 border-christmas-gold shadow-lg">
      <div className="marquee-container">
        <div className="marquee-content hover:pause-animation">
          <span className="marquee-text">
            🎄 The Christmas Channel is powered by Live365 — Tune in now on
            Live365 or our station website! 🎶
          </span>
          <span className="marquee-text">
            🎄 The Christmas Channel is powered by Live365 — Tune in now on
            Live365 or our station website! 🎶
          </span>
        </div>
      </div>
    </div>
  );
}
