import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- layouts ----------
   Positions are in "design units" (a virtual screen of dw x dh).
   Each card is [centerX, centerY, width, height].
   The whole layout is scaled to fit the real screen with one number: s. */
const DESKTOP = {
  dw: 917,
  dh: 542,
  cw: 237,
  ch: 292, // cw, ch = final size of the hero card (it ends at the layout centre)
  cx: 458.5,
  cy: 271,
  cards: [
    [146, 90, 105, 130],
    [146, 271, 105, 130],
    [146, 452, 105, 130],
    [286, 69, 120, 150],
    [286, 271, 120, 150],
    [286, 452, 120, 130],
    [459, 20, 128, 150],
    [459, 462, 128, 130],
    [630, 69, 120, 150],
    [630, 271, 120, 150],
    [630, 452, 120, 130],
    [771, 90, 105, 130],
    [771, 271, 105, 130],
    [771, 452, 105, 130],
  ],
};

const MOBILE = {
  dw: 400,
  dh: 720,
  cw: 150,
  ch: 200,
  cx: 200,
  cy: 360,
  cards: [
    [70, 90, 110, 130],
    [200, 70, 100, 120],
    [330, 90, 110, 130],
    [60, 235, 90, 110],
    [340, 235, 90, 110],
    [48, 375, 80, 130],
    [352, 375, 80, 130],
    [60, 515, 90, 110],
    [340, 515, 90, 110],
    [70, 640, 110, 130],
    [200, 655, 100, 120],
    [330, 640, 110, 130],
  ],
};

/* ---------- timeline ----------
   1 unit = one screen height of scrolling, counted from the moment the section's top edge
   appears at the bottom of the screen (ScrollTrigger start: "top bottom"). */
const ENTRY = 1; // the section scrolls in normally for one screen, then pins
const SHRINK_START = 0.2; // hero top edge reaches 80% down the screen: it starts shrinking here
const SHRINK_END = 1.88; // hero has landed in the centre
const FAN_START = 1.25; // side cards start BEFORE the hero lands
const FAN_LEN = 1.61; // how long each side card takes to settle
const FAN_STAGGER = 0.42; // extra delay for cards that are further from the centre
const TOTAL = FAN_START + FAN_LEN + FAN_STAGGER; // 3.28 screens of scrolling in all

/* two custom easings so the fades behave exactly like the earlier version */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const metaEase = (t) =>
  Math.min(1, Math.max(0, (1 - (1 - t) * (1 - t) - 0.7) / 0.3)); // hero label fades in at the end of the shrink
const fadeEase = (t) => Math.min(1, 2.2 * easeOutCubic(t)); // side cards become opaque in the first 45% of their flight

/**
 * props:
 *  hero:      { src, name, from, tag }  -> the orange card
 *  images:    string[]                  -> images for the cards around it (cycled if fewer than 14)
 *  heroColor: CSS background behind the hero image
 */
const SectionSix = ({ hero, images, heroColor = "#f26a1b" }) => {
  const root = useRef(null);
  const heroRef = useRef(null);
  const metaRef = useRef(null);
  const cardRefs = useRef([]);
  useGSAP(
    () => {
      const heroEl = heroRef.current;
      const metaEl = metaRef.current;
      const mm = gsap.matchMedia(); // switches layout (and rebuilds) at 700px

      mm.add(
        {
          mobile: "(max-width: 699px)",
          desktop: "(min-width: 700px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const L = conditions.mobile ? MOBILE : DESKTOP;
          const cards = cardRefs.current.slice(0, L.cards.length);
          gsap.set(cardRefs.current.slice(L.cards.length), { display: "none" }); // mobile uses fewer cards

          // screen measurements, read again on every ScrollTrigger refresh (resize)
          const view = () => {
            const W = window.innerWidth;
            const H = window.innerHeight;
            const s = Math.min(W / L.dw, H / L.dh);
            const m = Math.min(24, W * 0.03);
            return {
              W,
              H,
              s,
              ox: (W - L.dw * s) / 2,
              oy: (H - L.dh * s) / 2,
              bw: W - 2 * m,
              bh: H - 2 * m,
            };
          };

          // distance of each card from the centre, 0 (near) to 1 (far)
          const far = Math.max(
            ...L.cards.map(([x, y]) => Math.hypot(x - L.cx, y - L.cy)),
          );
          const dist = (i) =>
            Math.hypot(L.cards[i][0] - L.cx, L.cards[i][1] - L.cy) / far;

          // final boxes: every card is placed at its final spot; the animation only offsets it from the centre
          const layout = () => {
            const { W, H, s, ox, oy } = view();
            gsap.set(heroEl, { left: W / 2, top: H / 2 });
            L.cards.forEach(([x, y, w, h], i) =>
              gsap.set(cards[i], {
                left: ox + (x - w / 2) * s,
                top: oy + (y - h / 2) * s,
                width: w * s,
                height: h * s,
                borderRadius: 18 * Math.max(s, 0.8),
              }),
            );
          };
          gsap.set(heroEl, { xPercent: -50, yPercent: -50 }); // hero is positioned by its centre
          layout();
          ScrollTrigger.addEventListener("refreshInit", layout);

          // the section scrolls in normally (so it joins the section above), then pins when its top reaches the top.
          // created first so the animation below measures against the pinned layout.
          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: `+=${(TOTAL - ENTRY) * 100}%`,
            pin: true,

            anticipatePin: 2,
          });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom", // starts as soon as the section peeks in
              end: `+=${TOTAL * 100}%`,
              scrub: true, // 0.5s of smoothing
              markers: true,
              invalidateOnRefresh: true, // re-run the function values below on resize
            },
          });

          // hero: starts big and centred in the section, so it rides in with the page, then shrinks
          const big = () => ({
            width: () => view().bw,
            height: () => view().bh,
            borderRadius: 28,
          });

          tl.fromTo(
            heroEl,
            big(),
            {
              width: () => L.cw * view().s,
              height: () => L.ch * view().s,
              borderRadius: () => 22 * Math.max(view().s, 0.8),
              ease: "power1.out",
              duration: SHRINK_END - SHRINK_START,
            },
            SHRINK_START,
          );

          tl.fromTo(
            metaEl,
            { opacity: 0 },
            { opacity: 1, ease: metaEase, duration: SHRINK_END - SHRINK_START },
            SHRINK_START,
          );

          // side cards: fly from the centre to their spot, nearest first
          cards.forEach((card, i) => {
            const at = FAN_START + dist(i) * FAN_STAGGER; // farther cards start later
            tl.fromTo(
              card,
              {
                x: () => view().W / 2 - (view().ox + L.cards[i][0] * view().s),
                y: () => view().H / 2 - (view().oy + L.cards[i][1] * view().s),
                scale: 0.5,
                rotation: i % 2 ? 8 : -8,
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: FAN_LEN,
                ease: "power2.out",
              },
              at,
            );
            tl.fromTo(
              card,
              { opacity: 0 },
              { opacity: 1, duration: FAN_LEN, ease: fadeEase },
              at,
            );
          });

          return () => ScrollTrigger.removeEventListener("refreshInit", layout);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    // pinned for 350% of a screen of scrolling (ScrollTrigger adds the spacing)
    <section ref={root} className="relative h-screen overflow-hidden">
      {DESKTOP.cards.map((_, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className="absolute z-10 overflow-hidden shadow-xl will-change-transform"
          style={{ opacity: 0 }}
        >
          <img
            src={images[i % images.length]}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      <div
        ref={heroRef}
        className="absolute z-20 overflow-hidden shadow-2xl will-change-transform"
        style={{ background: heroColor }}
      >
        {/* object-contain keeps the whole image visible at every size */}
        <img
          src={hero.src}
          alt={hero.name}
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          draggable={false}
        />
        <div ref={metaRef} style={{ opacity: 0 }}>
          {hero.tag && (
            <span className="absolute left-[12%] top-[20%] -rotate-6 rounded-full bg-[#e0461a] px-3 py-1 text-xs font-semibold text-white shadow-md">
              {hero.tag}
            </span>
          )}
          <button className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-900">
            ♥ Like
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10 text-white">
            <p className="text-[13px] font-semibold">{hero.name}</p>
            <p className="text-[11px] opacity-80">from {hero.from}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectionSix;
/* usage:

   <CardReveal
     hero={{ src: "/hero.png", name: "Trisha Woodward", from: "ArtRoss", tag: "@artist" }}
     images={["/a1.jpg", "/a2.jpg", "/a3.jpg"]}
   />
*/
