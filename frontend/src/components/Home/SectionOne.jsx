import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//
gsap.registerPlugin(SplitText, ScrollTrigger);

const SectionOne = ({ id }) => {
  const titleRef = useRef(null);
  const title2Ref = useRef(null);
  const btnRef = useRef(null);
  //

  useGSAP(() => {
    //first section
    const split = new SplitText(titleRef.current, { type: "words,chars" });
    const split2 = new SplitText(title2Ref.current, { type: "words,chars" });
    //
    const tl1 = gsap.timeline({});
    tl1
      .from(split.words, {
        filter: "blur(3px)",
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.15, // تتابع دخول الحروف
        ease: "power3.out",
      })
      .from(
        split2.words,
        {
          delay: 1.6,
          filter: "blur(3px)",
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12, // تتابع دخول الحروف
          ease: "power3.out",
        },
        0,
      )
      .from(
        btnRef.current,
        {
          delay: 1.8,
          filter: "blur(3px)",
          opacity: 0,
          y: 40,
          duration: 1.5,
          ease: "power4.out",
        },
        0,
      );

    //
  });
  return (
    <section id={id} className="relative w-screen h-screen">
      {/* //title */}
      <div className="relative pt-[14vh] mx-auto w-fit pointer-events-none ">
        <h1
          ref={titleRef}
          className="will-change-transform px-20 text-center py-10 lg:px-10 lg:py-10
           font-normal text-3xl lg:text-6xl font-Grotesk leading-normal"
        >
          A place to find your masterpiece.
        </h1>
      </div>
      {/* //paragraph */}
      <div className="absolute bottom-[25vh] lg:bottom-[28vh] left-1/2 -translate-x-1/2 pointer-events-none ">
        <h1
          ref={title2Ref}
          className="will-change-transform font-normal text-center text-xl lg:text-xl font-Grotesk leading-normal"
        >
          Discover the latest trends in eco-friendly fashion.
        </h1>
      </div>
      {/* //button join us */}
      <div
        ref={btnRef}
        className="absolute bottom-[15vh] lg:bottom-[20vh] left-1/2 -translate-x-1/2 pointer-events-auto"
      >
        <Link
          to="/signup"
          className=" flex justify-center py-2 px-15 border border-transparent 
							rounded-4xl shadow-sm text-xl font-medium text-white bg-black font-Grotesk leading-normal
							 hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-offset-2 will-change-transform
							  focus:ring-emerald-500 transition duration-200 ease-in-out disabled:opacity-50"
        >
          <span>Join Us</span>
        </Link>
      </div>
    </section>
  );
};

export default SectionOne;
