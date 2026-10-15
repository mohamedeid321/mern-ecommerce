import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Card from "../Home/Card";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const categories = [
  {
    id: 1,
    href: "/sweatshirt",
    name: "Sweatshirt",
    imageUrl: "/categories/sweatshirt.jpg",
    className: "absolute z-90 pointer-events-auto",
  },
  {
    id: 2,
    href: "/t-shirts",
    name: "T-shirts",
    imageUrl: "/categories/t-shirts.jpg",
    className: "absolute z-80 pointer-events-auto",
  },
  {
    id: 3,
    href: "/shoes",
    name: "Shoes",
    imageUrl: "/categories/shoes.jpg",
    className: "absolute z-70 pointer-events-auto",
  },
  {
    id: 4,
    href: "/glasses",
    name: "Glasses",
    imageUrl: "/categories/glasses.jpg",
    className: "absolute z-60 pointer-events-auto",
  },
  {
    id: 5,
    href: "/jackets",
    name: "Jackets",
    imageUrl: "/categories/Jacket.jpg",
    className: "absolute z-50 pointer-events-auto",
  },
  {
    id: 6,
    href: "/suits",
    name: "Suits",
    imageUrl: "/categories/suits.jpg",
    className: "absolute z-40 pointer-events-auto",
  },
  {
    id: 7,
    href: "/bags",
    name: "Bags",
    imageUrl: "/categories/bags.jpg",
    className: "absolute z-30 pointer-events-auto",
  },
  {
    id: 8,
    href: "/shoes",
    name: "Shoes",
    imageUrl: "/categories/shoes.jpg",
    className: "absolute z-70 pointer-events-auto",
  },
  {
    id: 9,
    href: "/sweatshirt",
    name: "Sweatshirt",
    imageUrl: "/categories/sweatshirt.jpg",
    className: "absolute z-90 pointer-events-auto",
  },
  {
    id: 10,
    href: "/t-shirts",
    name: "T-shirts",
    imageUrl: "/categories/t-shirts.jpg",
    className: "absolute z-80 pointer-events-auto",
  },
  {
    id: 11,
    href: "/shoes",
    name: "Shoes",
    imageUrl: "/categories/shoes.jpg",
    className: "absolute z-70 pointer-events-auto",
  },
  {
    id: 12,
    href: "/glasses",
    name: "Glasses",
    imageUrl: "/categories/glasses.jpg",
    className: "absolute z-60 pointer-events-auto",
  },
  {
    id: 13,
    href: "/jackets",
    name: "Jackets",
    imageUrl: "/categories/Jacket.jpg",
    className: "absolute z-50 pointer-events-auto",
  },
  {
    id: 14,
    href: "/suits",
    name: "Suits",
    imageUrl: "/categories/suits.jpg",
    className: "absolute z-40 pointer-events-auto",
  },
  {
    id: 15,
    href: "/bags",
    name: "Bags",
    imageUrl: "/categories/bags.jpg",
    className: "absolute z-30 pointer-events-auto",
  },
  {
    id: 16,
    href: "/shoes",
    name: "Shoes",
    imageUrl: "/categories/shoes.jpg",
    className: "absolute z-70 pointer-events-auto",
  },
];
const WavyCards = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray("[data-id]");
      const total = cards.length; // لازم زوجي
      const perLane = total / 2;

      const cfg = { pad: 120, off: 0.3, amp: 0.08, waves: 1.5, tilt: 0.4 };
      const base = 1 / 40;
      const introDur = 2.5;
      const fast = base + (4 * (1 - base * introDur)) / introDur;
      const state = { progress: 0, speed: 0 };

      gsap.set(cards, {
        scale: 0.5,
        xPercent: -50,
        yPercent: -50,
        force3D: true,
      });

      const update = () => {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        const cy = h / 2;
        const span = w + cfg.pad * 2;
        const off = h * cfg.off;
        const amp = h * cfg.amp;
        const K = (Math.PI * 2 * cfg.waves) / w;

        cards.forEach((card, i) => {
          const lane = i < perLane ? 0 : 1;
          const k = lane === 0 ? i : i - perLane;
          const dir = lane === 0 ? 1 : -1;
          const sgn = dir;

          let d = state.progress - k / perLane;
          if (d >= 1) d = d % 1;
          const t = dir === 1 ? d : 1 - d;
          const x = t * span - cfg.pad;

          const y = cy + sgn * (-off + amp * Math.sin(K * x));
          const slope = sgn * amp * K * Math.cos(K * x);
          const rotation = ((Math.atan(slope) * 180) / Math.PI) * cfg.tilt;

          gsap.set(card, { x, y, rotation });
        });
      };

      const tick = (time, deltaTime) => {
        state.progress += state.speed * (Math.min(deltaTime, 50) / 1000);
        update();
      };
      gsap.ticker.add(tick);
      update(); // أول رسم: الكروت في الطابور برّه الشاشة

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            state,
            { speed: fast },
            { speed: base, duration: introDur, ease: "power3.out" },
          );
        },
      });

      return () => gsap.ticker.remove(tick);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden pointer-events-none"
    >
      {categories.map((c) => (
        <Card key={c.id} category={c} />
      ))}
    </div>
  );
};

export default WavyCards;
