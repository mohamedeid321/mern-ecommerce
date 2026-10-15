//
import SampleBigCard from "./SampleBigCard";
//
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

//
const categories = [
  {
    id: 1,
    href: "/sweatshirt",
    name: "Sweatshirt",
    imageUrl: "/categories/sweatshirt.jpg",
    className: "",
  },
  {
    id: 2,
    href: "/t-shirts",
    name: "T-shirts",
    imageUrl: "/categories/t-shirts.jpg",
    className: " ",
  },
  {
    id: 3,
    href: "/shoes",
    name: "Shoes",
    imageUrl: "/categories/shoes.jpg",
    className: " ",
  },
  {
    id: 4,
    href: "/glasses",
    name: "Glasses",
    imageUrl: "/categories/glasses.jpg",
    className: " ",
  },
];
//
const SectionFive = ({ id }) => {
  const TitleRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current.querySelectorAll("[data-id]");
    const split = new SplitText(TitleRef.current, { type: "words,chars" });
    //
    gsap.set(TitleRef.current, {
      xPercent: -50,
      x: "50vw",
      y: "15vh",
      force3D: true,
    });
    //card optmized approach
    const finalY = [0, 80, 0, 80]; // الـ y النهائي لكل كارت
    const startY = [200, 280, 200, 280];

    // 1) الحالة الابتدائية لكل الكروت
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: startY[i],
        filter: "blur(5px)",
        opacity: 0,
        force3D: true,
      });
    });

    // 2) كل صف = كارتين (0,1) و (2,3)
    for (let i = 0; i < cards.length; i += 2) {
      const pair = [cards[i], cards[i + 1]].filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pair[0].parentElement, // الأب، مش الكارت نفسه
          start: "top 80%",
          scrub: true,
          //once: true,
        },
      });

      pair.forEach((card, j) => {
        tl.to(
          card,
          {
            y: finalY[i + j],
            filter: "blur(0px)",
            opacity: 1,
            duration: 2,
            ease: "power3.out",
          },
          j * 0.4, // الكارت التاني يبدأ بعد 0.2 ثانية
        );
      });
    }
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "+=400px",
        scrub: true,
        //markers: true,
      },
    });
    tl1.from(split.words, {
      filter: "blur(3px)",
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.15, // تتابع دخول الحروف
      ease: "power3.out",
    });
  });
  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-screen h-max mb-[5vh] pointer-events-none"
    >
      {/*  title */}
      <h1
        ref={TitleRef}
        className="relative top-0 left-0 will-change-transform text-center font-semibold text-6xl font-Grotesk leading-tight"
      >
        Every piece of product <br /> tells a story.
      </h1>
      {/* end title */}
      {/*  card 1 */}
      <div className="relative pt-50 flex items-center justify-center pointer-events-none z-10">
        <div
          ref={cardsRef}
          className=" grid grid-cols-2 grid-rows-2 gap-15 place-items-center "
        >
          {(categories || []).slice(0, 4).map((category) => (
            <div
              key={category.id}
              className="pointer-events-auto flex justify-center"
            >
              <SampleBigCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* end card */}
    </section>
  );
};

export default SectionFive;
