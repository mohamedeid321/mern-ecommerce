import { useRef } from "react";
import WavyCards from "../Home/WavyCards";
//
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);
const SectionFour = () => {
  const TitleRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    //first section
    const split = new SplitText(TitleRef.current, { type: "words,chars" });
    //
    gsap.set(TitleRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: "50vw",
      y: "50vh",
      force3D: true,
    });
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
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
      ref={sectionRef}
      className="relative w-screen h-screen pointer-events-none"
    >
      {/*  cards */}
      <WavyCards />
      {/* end cards */}
      {/*  title */}
      <h1
        ref={TitleRef}
        className="absolute top-0 left-0 will-change-transform text-center font-semibold text-6xl font-Grotesk leading-tight"
      >
        You will find yourself <br /> among us.
      </h1>
      {/* end title */}
    </section>
  );
};

export default SectionFour;
