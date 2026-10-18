import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  <path
    key="cube"
    d="M24 6 L39 14.5 V33.5 L24 42 L9 33.5 V14.5 Z M9 14.5 L24 23 L39 14.5 M24 23 V42"
  />,
  <path
    key="gem"
    d="M14 8 H34 L43 19 L24 42 L5 19 Z M5 19 H43 M14 8 L19 19 L24 42 L29 19 L34 8 M19 19 L24 8 L29 19"
  />,
  <path
    key="brush"
    d="M33 7 L41 15 L27 29 L19 21 Z M19 21 L13 24 C9 27 11 34 6 40 C14 40 22 38 24 31 L27 29"
  />,
  <path
    key="bulb"
    d="M24 6 C15 6 10 13 12 21 C13 26 17 28 18 33 H30 C31 28 35 26 36 21 C38 13 33 6 24 6 Z M18 38 H30 M20 42 H28"
  />,
  <path
    key="bird"
    d="M6 20 L22 24 L24 40 Z M22 24 L38 8 L42 28 Z M22 24 L42 28 L24 40 M6 20 L38 8"
  />,
  <g key="rings">
    <circle cx="18" cy="20" r="11" />
    <circle cx="30" cy="20" r="11" />
    <circle cx="24" cy="30" r="11" />
  </g>,
  <g key="wheel">
    <circle cx="24" cy="24" r="17" />
    <circle cx="24" cy="24" r="6" />
    <path d="M24 7 V18 M24 30 V41 M7 24 H18 M30 24 H41 M12 12 L19.8 19.8 M28.2 28.2 L36 36 M36 12 L28.2 19.8 M19.8 28.2 L12 36" />
  </g>,
  <path
    key="star"
    d="M24 5 L28 20 L43 24 L28 28 L24 43 L20 28 L5 24 L20 20 Z"
  />,
  <g key="nib">
    <path d="M24 5 L36 24 L24 43 L12 24 Z M24 24 V43 M24 5 V20" />
    <circle cx="24" cy="24" r="3" />
  </g>,
  <g key="eye">
    <path d="M4 24 C12 12 36 12 44 24 C36 36 12 36 4 24 Z" />
    <circle cx="24" cy="24" r="6" />
  </g>,
  <path
    key="shard"
    d="M8 38 L20 8 L26 26 Z M26 26 L40 38 L8 38 M20 8 L40 38"
  />,
  <path
    key="box"
    d="M6 14 L24 6 L42 14 L24 22 Z M6 14 V32 L24 42 V22 M42 14 V32 L24 42"
  />,
  <path
    key="leaf"
    d="M24 6 C36 14 38 30 24 42 C10 30 12 14 24 6 Z M24 6 V42"
  />,
  <path
    key="arch"
    d="M8 42 V24 C8 6 40 6 40 24 V42 Z M16 42 V26 C16 16 32 16 32 26 V42"
  />,
];

const TITLE = ["Created", "by", "Mohamed", "Eid"];

/**
 * SectionSeven
 * @param {number} bounce   الارتداد 0..0.9  (الافتراضي 0.45)
 * @param {number} gravity  الجاذبية        (الافتراضي 1.6)
 */
export default function SectionSeven({ id, bounce = 0.45, gravity = 1.6 }) {
  const stage = useRef(null);
  const discs = useRef([]);

  useEffect(() => {
    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
    const el = stage.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ---------- 1) المحرك ---------- */
    const engine = Engine.create({ enableSleeping: true }); // الأجسام بتنام لما تستقر
    engine.positionIterations = 12; // دقة أعلى = مفيش تداخل بين الأيقونات
    engine.velocityIterations = 10;
    engine.gravity.y = gravity;

    const s = { w: 0, h: 0, base: 64, walls: [], items: [], timers: [] };

    /* ---------- 2) الحيطان (الأرض + يمين وشمال، من غير سقف) ---------- */
    const buildWalls = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const T = 200;
      s.w = w;
      s.h = h;
      s.base = Math.max(52, Math.min(88, w / 11)); // حجم الأيقونة نسبة لعرض الكارت
      Composite.remove(engine.world, s.walls);
      s.walls = [
        Bodies.rectangle(w / 2, h + T / 2, w + T * 2, T, {
          isStatic: true,
          friction: 0.6,
        }),
        Bodies.rectangle(-T / 2, h / 2 - 1500, T, h + 3000, { isStatic: true }),
        Bodies.rectangle(w + T / 2, h / 2 - 1500, T, h + 3000, {
          isStatic: true,
        }),
      ];
      Composite.add(engine.world, s.walls);

      // لو الكارت صغر، رجّع أي أيقونة طلعت بره
      s.items.forEach(({ body, r }) => {
        const { x, y } = body.position;
        if (x > w - r || x < r || y > h - r) {
          Body.setPosition(body, {
            x: Math.min(Math.max(x, r), w - r),
            y: Math.min(y, h - r),
          });
        }
      });
    };
    buildWalls();
    const ro = new ResizeObserver(buildWalls);
    ro.observe(el);

    /* ---------- 3) السحب بالماوس (من غير ما نمنع الـ scroll) ---------- */
    const mouse = Mouse.create(el);
    el.removeEventListener("touchstart", mouse.mousedown);
    el.removeEventListener("touchmove", mouse.mousemove);
    el.removeEventListener("touchend", mouse.mouseup);
    el.removeEventListener("mousewheel", mouse.mousewheel);
    el.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    Composite.add(
      engine.world,
      MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.25,
          damping: 0.1,
          render: { visible: false },
        },
      }),
    );

    /* ---------- 4) إنزال أيقونة من فوق الكارت ---------- */
    const spawn = (i) => {
      const r = (s.base * (0.9 + Math.random() * 0.22)) / 2; // أحجام متقاربة مش متطابقة
      const x = r + Math.random() * (s.w - 2 * r);
      const body = Bodies.circle(x, -r - 4, r, {
        restitution: bounce, // الارتداد
        friction: 0.35, // احتكاك مع الأرض والأيقونات التانية
        frictionStatic: 0.6, // بيمنع الانزلاق وهي واقفة
        frictionAir: 0.004,
        density: 0.002,
        slop: 0.02,
      });
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 2 + Math.random() * 4,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.35); // لفة عشوائية
      Composite.add(engine.world, body);

      const dom = discs.current[i];
      dom.style.width = dom.style.height = `${r * 2}px`;
      dom.style.visibility = "visible";
      s.items[i] = { body, r, dom };
    };

    /* ---------- 5) كل frame: حدّث الفيزياء وانقل الـ DOM ---------- */
    const tick = (_t, dt) => {
      const d = Math.min(dt, 33);
      Engine.update(engine, d / 2); // خطوتين صغيرين أدق من خطوة كبيرة
      Engine.update(engine, d / 2);
      s.items.forEach((it) => {
        if (!it) return;
        const { x, y } = it.body.position;
        it.dom.style.transform = `translate(${x - it.r}px, ${y - it.r}px) rotate(${it.body.angle}rad)`;
      });
    };
    gsap.ticker.add(tick);

    /* ---------- 6) المشهد: النص يظهر، وبعده الأيقونات تنزل ---------- */
    const words = el.querySelectorAll("[data-word]");
    const sub = el.querySelector("[data-sub]");
    gsap.set(words, { yPercent: 115 });
    gsap.set(sub, { opacity: 0, y: 10 });

    const play = () => {
      gsap.to(words, {
        yPercent: 0,
        duration: reduce ? 0 : 1,
        ease: "power4.out",
        stagger: 0.09,
      });
      gsap.to(sub, {
        opacity: 0.7,
        y: 0,
        duration: reduce ? 0 : 0.8,
        delay: 0.5,
      });
      ICONS.forEach((_, i) => {
        s.timers.push(
          gsap.delayedCall(reduce ? 0 : 0.55 + i * 0.11, () => spawn(i)),
        );
      });
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: play,
    });

    /* ---------- تنظيف ---------- */
    return () => {
      st.kill();
      s.timers.forEach((t) => t.kill());
      gsap.ticker.remove(tick);
      ro.disconnect();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
    // المشهد بيتبني مرة واحدة. لتغيير bounce/gravity وقت التشغيل شوف الشرح
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //[#e0461a]
  return (
    <section id={id} className="w-full h-max px-4 py-10 sm:px-6">
      <div
        ref={stage}
        aria-label="Interactive scene: icons fall and settle. Drag them."
        className="relative h-[clamp(380px,56vw,480px)] w-full cursor-grab
        touch-pan-y select-none overflow-hidden rounded-[2rem] bg-mainColor
        text-[#10130a] active:cursor-grabbing"
      >
        {/* حلقات الخلفية */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 480"
          preserveAspectRatio="xMinYMax slice"
          aria-hidden="true"
        >
          <g fill="none" stroke="#fff" strokeOpacity=".32" strokeWidth="38">
            <ellipse
              cx="190"
              cy="200"
              rx="120"
              ry="190"
              transform="rotate(-18 190 200)"
            />
            <ellipse
              cx="250"
              cy="330"
              rx="210"
              ry="120"
              transform="rotate(-18 250 330)"
            />
          </g>
        </svg>

        {/* النص (pointer-events-none عشان الماوس يوصل للأيقونات) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 p-5 sm:p-10">
          <h2
            className="flex flex-wrap gap-x-[.28em] text-[clamp(2.4rem,7.4vw,5.6rem)]
           font-bold leading-normal  tracking-[-.03em]"
          >
            {TITLE.map((w) => (
              <span key={w} className="inline-block overflow-hidden pb-[.08em]">
                <span data-word className="inline-block will-change-transform">
                  {w}
                </span>
              </span>
            ))}
          </h2>
          <p data-sub className="mt-3.5 text-xs  tracking-[.16em]">
            Phone: 01154053377 <br /> Mail: mohamedeidomer919@gmail.com
          </p>
        </div>

        {/* الأيقونات: مخفية لحد ما تتحدف */}
        {ICONS.map((icon, i) => (
          <div
            key={i}
            ref={(n) => (discs.current[i] = n)}
            className="absolute left-0 top-0 z-20 grid place-items-center rounded-full bg-white shadow-[0_8px_16px_rgba(40,50,0,.16)] will-change-transform"
            style={{ visibility: "hidden" }}
          >
            <svg
              viewBox="0 0 48 48"
              className="pointer-events-none h-[56%] w-[56%]"
              fill="none"
              stroke="#111"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              {icon}
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
