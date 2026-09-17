import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  CircleDot,
  Gauge,
  Menu,
  MoveRight,
  Navigation,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const heroImage = "/manus-storage/classic-350-hero_651a9938.jpg";
const engineImage = "/manus-storage/classic-350-engine_6ee810eb.jpg";
const angleImages = [
  { label: "Front three-quarter", short: "Front", src: "/manus-storage/classic-350-angle-front_1ec65b06.jpg" },
  { label: "Side profile", short: "Side", src: "/manus-storage/classic-350-angle-side_b8ac7fb7.jpg" },
  { label: "Rear three-quarter", short: "Rear", src: "/manus-storage/classic-350-angle-rear_62cda080.jpg" },
  { label: "Rear detail", short: "Back", src: "/manus-storage/classic-350-angle-rear-detail_40544911.jpg" },
];

const componentData = [
  {
    id: "engine",
    index: "01",
    eyebrow: "The pulse",
    title: "J-Series\n349cc",
    mobileTitle: "J-Series 349cc",
    description:
      "An air-oil cooled single that finds its rhythm early — measured, muscular, and made to turn every commute into a ritual.",
    quote: "The sound of a machine finding its balance.",
    stat: "20.2 bhp",
    statLabel: "peak power",
    detail: "27 Nm @ 4,000 rpm",
    image: engineImage,
    accent: "#a3493e",
    visual: "engine",
  },
  {
    id: "frame",
    index: "02",
    eyebrow: "The backbone",
    title: "Twin-loop\nsteel",
    mobileTitle: "Twin-loop steel",
    description:
      "A double-cradle architecture holds the line with composure. Stability is engineered into every bend, weld, and load path.",
    quote: "Grace under pressure, even at a standstill.",
    stat: "1,390 mm",
    statLabel: "wheelbase",
    detail: "Steel twin downtube spine",
    image: heroImage,
    accent: "#bc8b51",
    visual: "frame",
  },
  {
    id: "suspension",
    index: "03",
    eyebrow: "The composure",
    title: "Softened\nimpact",
    mobileTitle: "Softened impact",
    description:
      "Telescopic forks and twin tube-emulsion shocks keep the ride unhurried, smoothing the world without muting it.",
    quote: "The road stays interesting. Your wrists stay calm.",
    stat: "130 mm",
    statLabel: "front travel",
    detail: "6-step rear adjustability",
    image: heroImage,
    accent: "#8f9a9b",
    visual: "suspension",
  },
  {
    id: "wheels",
    index: "04",
    eyebrow: "The contact",
    title: "Grounded\nby design",
    mobileTitle: "Grounded by design",
    description:
      "Spoked wheels keep the Classic connected to its lineage, while dual-channel ABS brings modern confidence to every surface.",
    quote: "Old-world tactility. New-world control.",
    stat: "19 / 18 in",
    statLabel: "front / rear",
    detail: "Dual-channel ABS",
    image: heroImage,
    accent: "#a3493e",
    visual: "wheels",
  },
  {
    id: "tank",
    index: "05",
    eyebrow: "The signature",
    title: "A shape\nthat stays",
    mobileTitle: "A shape that stays",
    description:
      "The teardrop tank is more than a volume. It is the silhouette that made a thousand memories recognisable from a distance.",
    quote: "An icon is a proportion you remember.",
    stat: "13 L",
    statLabel: "fuel capacity",
    detail: "Hand-finished tank badge",
    image: heroImage,
    accent: "#bc8b51",
    visual: "tank",
  },
  {
    id: "cockpit",
    index: "06",
    eyebrow: "The view",
    title: "Analog\ninstinct",
    mobileTitle: "Analog instinct",
    description:
      "A round instrument cluster keeps the essentials close. Add Tripper navigation when the road ahead asks for a little more certainty.",
    quote: "Everything you need. Nothing in the way.",
    stat: "2.5 in",
    statLabel: "Tripper pod",
    detail: "Semi-digital speedometer",
    image: heroImage,
    accent: "#8f9a9b",
    visual: "cockpit",
  },
  {
    id: "ergonomics",
    index: "07",
    eyebrow: "The posture",
    title: "Ride\nwell",
    mobileTitle: "Ride well",
    description:
      "A single-piece seat and neutral triangle give the Classic its most enduring luxury: the ability to keep going comfortably.",
    quote: "Comfort is the quietest kind of performance.",
    stat: "805 mm",
    statLabel: "seat height",
    detail: "195 kg kerb weight",
    image: heroImage,
    accent: "#a3493e",
    visual: "ergonomics",
  },
  {
    id: "exhaust",
    index: "08",
    eyebrow: "The voice",
    title: "A note\nwith history",
    mobileTitle: "A note with history",
    description:
      "The chrome-finished exhaust gives the J-Series its last word — a low, rounded note that makes the machine feel present before it arrives.",
    quote: "The soundtrack of taking the long way home.",
    stat: "5-speed",
    statLabel: "transmission",
    detail: "Chrome-finished exhaust",
    image: heroImage,
    accent: "#bc8b51",
    visual: "exhaust",
  },
];

const specs = [
  ["Engine", "349 cc air-oil cooled, single cylinder, SOHC"],
  ["Power", "20.2 bhp @ 6,100 rpm"],
  ["Torque", "27 Nm @ 4,000 rpm"],
  ["Transmission", "5-speed constant mesh"],
  ["Frame", "Twin downtube spine frame"],
  ["Front suspension", "Telescopic fork · 130 mm travel"],
  ["Rear suspension", "Twin shock · 6-step adjustable"],
  ["Brakes", "300 mm front disc · rear disc · dual-channel ABS"],
  ["Wheels", "19 in front / 18 in rear · spoked"],
  ["Dimensions", "2,145 × 785 × 1,090 mm"],
  ["Fuel capacity", "13 litres"],
  ["Kerb weight", "195 kg"],
];

const colors = [
  { name: "Redditch Red", color: "#7d252b", surface: "#a94a40" },
  { name: "Halcyon Green", color: "#53634d", surface: "#7e9275" },
  { name: "Chrome Black", color: "#242526", surface: "#75706a" },
  { name: "Brushed Brass", color: "#9a7041", surface: "#d0a66c" },
];

function Blueprint({ active = false }: { active?: boolean }) {
  return (
    <svg
      className={`blueprint ${active ? "blueprint-active" : ""}`}
      viewBox="0 0 400 220"
      aria-hidden="true"
    >
      <path d="M22 154h350M28 162h342M52 146c28-62 65-81 125-75 42 4 69 27 112 67M96 147l40-58 49-11 59 16 31 44M135 89l-18-34M276 91l25-33M66 150a28 28 0 1 0 56 0M280 150a28 28 0 1 0 56 0" />
      <circle cx="94" cy="150" r="20" />
      <circle cx="308" cy="150" r="20" />
      <path d="M164 92h70l22 25-23 20h-68l-26-21zM190 90l-4-27h26l7 27M148 139l-12 15M260 139l11 15" />
    </svg>
  );
}

function SectionVisual({ item, progress, active }: { item: (typeof componentData)[number]; progress: MotionValue<number>; active: boolean }) {
  const visualScale = useTransform(progress, [0, 1], [1, 1.12]);
  const visualX = useTransform(progress, [0, 1], [0, -4]);
  const visualRotate = useTransform(progress, [0, 1], [0, 2]);

  return (
    <div className="section-visual" style={{ ["--part-accent" as string]: item.accent }}>
      <div className="visual-orbit" />
      <motion.div
        className={`part-image part-${item.visual}`}
        style={{ scale: visualScale, x: visualX, rotate: visualRotate }}
      >
        <img src={item.id === "engine" ? engineImage : heroImage} alt="" />
      </motion.div>
      <div className="visual-vignette" />
      <Blueprint active={active} />
      <div className="component-stamp">
        <span>RE / 350</span>
        <span>PLATE {item.index}</span>
      </div>
      <div className="visual-coordinate">43° 07&apos; 31.4&quot; N<br />72° 35&apos; 12.0&quot; E</div>
      <div className="visual-line" />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-block">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Interactive360() {
  const [angle, setAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const dragRef = useRef({ startX: 0, startAngle: 0 });
  const activeAngle = angleImages[angle];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => setAngle((current) => (current + 1) % angleImages.length), 1600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const moveBy = (amount: number) => setAngle((current) => (current + amount + angleImages.length) % angleImages.length);
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startX: event.clientX, startAngle: angle };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const delta = event.clientX - dragRef.current.startX;
    const frameOffset = Math.round(delta / 64);
    setAngle((dragRef.current.startAngle - frameOffset + angleImages.length * 4) % angleImages.length);
  };

  return (
    <section id="view-360" className="viewer-section section-pad">
      <div className="section-kicker"><span>02</span><span>See the silhouette</span></div>
      <div className="viewer-heading">
        <div><p className="eyebrow"><span className="eyebrow-rule" /> Interactive study</p><h2>Turn it<br /><em>your way.</em></h2></div>
        <div className="viewer-intro"><p>There is more than one way to read a classic. Drag across the machine to move through its proportions, details, and stance.</p><span className="viewer-hint"><MoveRight size={14} /> Drag / swipe to rotate</span></div>
      </div>
      <div className="viewer-stage-wrap">
        <div className="viewer-stage" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onKeyDown={(event) => { if (event.key === "ArrowRight") moveBy(1); if (event.key === "ArrowLeft") moveBy(-1); }} tabIndex={0} role="slider" aria-label="Explore the Classic 350 from different angles" aria-valuemin={0} aria-valuemax={3} aria-valuenow={angle}>
          <div className="viewer-grid" />
          {angleImages.map((image, index) => <img key={image.src} className={index === angle ? "viewer-image is-visible" : "viewer-image"} src={image.src} alt={`Classic 350 ${image.label}`} loading={index === 0 ? "eager" : "lazy"} draggable={false} />)}
          <div className="viewer-shadow" />
          <div className="viewer-annotation viewer-annotation-top"><span>CLASSIC / 350</span><span>ANGLE {String(angle + 1).padStart(2, "0")} / 04</span></div>
          <div className="viewer-annotation viewer-annotation-bottom"><span>© ROYAL ENFIELD / DESIGN STUDY</span><span>{activeAngle.label}</span></div>
          <button className="viewer-arrow viewer-arrow-left" onClick={() => moveBy(-1)} aria-label="Previous angle"><ArrowUpRight size={16} /></button>
          <button className="viewer-arrow viewer-arrow-right" onClick={() => moveBy(1)} aria-label="Next angle"><ArrowUpRight size={16} /></button>
        </div>
        <div className="viewer-controls">
          <div className="viewer-angle-list">{angleImages.map((image, index) => <button key={image.short} className={index === angle ? "is-active" : ""} onClick={() => setAngle(index)}><span>0{index + 1}</span>{image.short}</button>)}</div>
          <button className={`viewer-play ${isPlaying ? "is-playing" : ""}`} onClick={() => setIsPlaying(!isPlaying)}><span>{isPlaying ? "Pause rotation" : "Auto-rotate"}</span><Play size={12} fill="currentColor" /></button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [active, setActive] = useState("engine");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [soundOn, setSoundOn] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.15]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.4 });
  const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);
  const navItems = useMemo(() => [{ id: "story", label: "Story" }, { id: "view-360", label: "360 View" }, { id: "specs", label: "Specifications" }, { id: "test-ride", label: "Experience" }], []);

  useMotionValueEvent(progressPercent, "change", () => undefined);

  useEffect(() => {
    const observers = componentData.map((item) => {
      const node = document.getElementById(item.id);
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0.01 },
      );
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell" style={{ ["--bike-accent" as string]: selectedColor.surface }}>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Royal Enfield Classic 350 home">
          <span className="wordmark-mark">RE</span>
          <span className="wordmark-copy">Royal Enfield <small>Classic 350</small></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className={`sound-toggle ${soundOn ? "sound-on" : ""}`} onClick={() => setSoundOn(!soundOn)} aria-label="Toggle ambient sound">
            <span className="sound-bars"><i /><i /><i /></span>
            {soundOn ? "Sound on" : "Sound off"}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <aside className="progress-rail" aria-label="Component progress">
        <div className="progress-track"><motion.div className="progress-fill" style={{ height: progressPercent }} /></div>
        <div className="progress-label">{String(componentData.findIndex((item) => item.id === active) + 1).padStart(2, "0")} / 08</div>
        <div className="progress-dots">
          {componentData.map((item) => <button key={item.id} className={active === item.id ? "is-active" : ""} onClick={() => scrollTo(item.id)} aria-label={`Go to ${item.mobileTitle}`} />)}
        </div>
      </aside>

      <main ref={mainRef} id="top">
        <section ref={heroRef} className="hero-section">
          <motion.div className="hero-backdrop" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} />
          <div className="hero-grain" />
          <div className="hero-grid" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" /> A modern classic / 2026</p>
            <h1>Built<br /><em>different.</em><br /><span>Since 1901.</span></h1>
            <p className="hero-dek">The Classic 350 is not a relic. It is a way of moving through the world — unhurried, unmistakable, entirely its own.</p>
            <button className="text-link" onClick={() => scrollTo("story")}>Explore the architecture <MoveRight size={16} /></button>
          </div>
          <motion.div className="hero-vehicle" style={{ y: shouldReduceMotion ? 0 : heroY }}>
            <div className="hero-vehicle-glow" />
            <img src={heroImage} alt="Classic motorcycle in a dark studio" />
          </motion.div>
          <div className="hero-meta hero-meta-left"><span>01</span><span>ATL / 1901 — 2026</span></div>
          <div className="hero-meta hero-meta-right"><span>J-SERIES / 349 CC</span><span>THE LONG WAY HOME</span></div>
          <button className="scroll-cue" onClick={() => scrollTo("story")}>
            <span>Scroll to begin</span><ArrowDown size={15} />
          </button>
        </section>

        <section id="story" className="intro-section section-pad">
          <div className="section-kicker"><span>01</span><span>The proposition</span></div>
          <div className="intro-layout">
            <p className="display-intro">Every line<br /><em>has a reason.</em></p>
            <div className="intro-copy">
              <p className="large-copy">A motorcycle can be a machine. Or it can become a measure of time.</p>
              <p>For over a century, Royal Enfield has understood the difference. The Classic 350 pairs hand-shaped proportions with a modern heart — a design that earns a second look, then a lifetime of loyalty.</p>
              <div className="signature-line"><span>Architecture / 08 elements</span><span>Scroll-led study</span></div>
            </div>
          </div>
          <div className="intro-bike-wrap">
            <div className="intro-bike-caption"><span>Full architecture / profile study</span><span>Drag your eye across the silhouette</span></div>
            <div className="intro-bike"><img src={heroImage} alt="Classic 350 profile view" /><div className="intro-bike-fade" /><Blueprint /></div>
          </div>
        </section>

        <Interactive360 />

        <section className="component-sequence" aria-label="Engineering components">
          {componentData.map((item, index) => (
            <ComponentSection key={item.id} item={item} index={index} active={active === item.id} />
          ))}
        </section>

        <section id="specs" className="specs-section section-pad">
          <div className="section-kicker"><span>09</span><span>The complete picture</span></div>
          <div className="specs-heading">
            <div><p className="eyebrow"><span className="eyebrow-rule" /> Technical register</p><h2>Quietly<br /><em>capable.</em></h2></div>
            <p>Numbers are only useful when they serve a feeling. Here, every figure has been tuned toward the same destination: a better way to ride.</p>
          </div>
          <div className="specs-layout">
            <div className="specs-index"><span>CLASSIC 350</span><strong>2026</strong><span>TECHNICAL REGISTER</span></div>
            <div className="spec-table">
              {specs.map(([label, value], index) => (
                <motion.div key={label} className="spec-row" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.035, duration: 0.55 }}>
                  <span>{label}</span><strong>{value}</strong><ArrowUpRight size={14} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="palette-section section-pad">
          <div className="palette-copy"><p className="eyebrow"><span className="eyebrow-rule" /> Find your finish</p><h2>Make it<br /><em>yours.</em></h2><p>The shape stays. The mood is yours to choose.</p></div>
          <div className="palette-stage" style={{ ["--selected-surface" as string]: selectedColor.surface, ["--selected-color" as string]: selectedColor.color }}>
            <div className="palette-halo" /><img src={heroImage} alt="Classic 350 color selection preview" /><div className="palette-tint" />
            <div className="palette-caption"><span>Selected finish</span><strong>{selectedColor.name}</strong></div>
          </div>
          <div className="swatches" role="list" aria-label="Available color finishes">
            {colors.map((color) => <button key={color.name} role="listitem" className={selectedColor.name === color.name ? "is-selected" : ""} onClick={() => setSelectedColor(color)} aria-label={`Choose ${color.name}`}><span style={{ background: color.color }} /><small>{color.name}</small></button>)}
          </div>
        </section>

        <section id="test-ride" className="closing-section">
          <div className="closing-image" />
          <div className="closing-grain" />
          <div className="closing-copy">
            <p className="eyebrow"><span className="eyebrow-rule" /> The road is waiting</p>
            <h2>Go your<br /><em>own way.</em></h2>
            <p>There is no correct route. Only the one that feels like yours.</p>
            <button className="primary-cta" onClick={() => window.alert("Test ride booking is coming soon.")}>Book a test ride <ArrowUpRight size={16} /></button>
          </div>
          <div className="closing-mark"><CircleDot size={18} /><span>ROYAL ENFIELD<br />SINCE 1901</span></div>
        </section>

        <footer className="site-footer">
          <div className="footer-brand"><span className="wordmark-mark">RE</span><span>Royal Enfield</span></div>
          <div className="footer-note">Built different. Since 1901.</div>
          <div className="footer-links"><button onClick={() => scrollTo("top")}>Back to top <RotateCcw size={14} /></button><span>© 2026 Royal Enfield</span></div>
        </footer>
      </main>
    </div>
  );
}

function ComponentSection({ item, index, active }: { item: (typeof componentData)[number]; index: number; active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0.14, 0.35, 0.72, 0.9], [0, 1, 1, 0.18]);
  const imageProgress = useTransform(scrollYProgress, [0.15, 0.55, 0.9], [0, 1, 0.25]);

  return (
    <section ref={ref} id={item.id} className={`component-section ${index % 2 ? "component-reverse" : ""} ${active ? "component-active" : ""}`}>
      <div className="component-sticky">
      <div className="component-visual-col"><SectionVisual item={item} progress={imageProgress} active={active} /></div>
        <motion.div className="component-copy" style={{ y: contentY, opacity: contentOpacity }}>
          <div className="component-number"><span>{item.index}</span><span className="component-rule" /></div>
          <p className="eyebrow"><span className="eyebrow-rule" /> {item.eyebrow}</p>
          <h2>{item.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2>
          <p className="component-description">{item.description}</p>
          <p className="component-quote">“{item.quote}”</p>
          <div className="component-stats"><Stat value={item.stat} label={item.statLabel} /><Stat value={item.detail} label="design language" /></div>
          <div className="component-foot"><span>CLASSIC 350 / {item.index}</span><span>SCROLL TO DISCOVER</span><ChevronDown size={14} /></div>
        </motion.div>
      </div>
    </section>
  );
}
