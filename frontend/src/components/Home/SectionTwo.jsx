import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//
gsap.registerPlugin(SplitText, ScrollTrigger);

const SectionTwo = ({ id }) => {
  const section2Ref = useRef(null);
  const section2TitleRef = useRef(null);
  const section2Title2Ref = useRef(null);
  const section2BtnRef = useRef(null);
  useGSAP(() => {
    // second section
    const split3 = new SplitText(section2TitleRef.current, {
      type: "words,chars",
    });
    const split4 = new SplitText(section2Title2Ref.current, {
      type: "words,chars",
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 50%",
        end: "+=400px",
        scrub: true,
        //markers: true,
      },
    });
    //
    tl2
      .from(split3.words, {
        filter: "blur(3px)",
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.15, // تتابع دخول الحروف
        ease: "power3.out",
      })
      .from(
        split4.words,
        {
          delay: 0.5,
          filter: "blur(3px)",
          opacity: 0,
          y: 40,
          duration: 0.5,
          stagger: 0.05, // تتابع دخول الحروف
          ease: "power3.out",
        },
        0,
      )
      .from(
        section2BtnRef.current,
        {
          delay: 0.8,
          filter: "blur(3px)",
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power4.out",
        },
        0,
      );
  });
  return (
    <section id={id} ref={section2Ref} className="relative w-screen h-screen">
      {/* //title */}
      <div className="relative pt-[10vh] lg:pt-[16vh] left-0 lg:w-[37.5vw] ">
        <h1
          ref={section2TitleRef}
          className="will-change-transform px-10 text-2xl 
          lg:pl-40 
          lg:font-semibold lg:text-6xl font-Grotesk leading-normal"
        >
          Showcase, Sell,{" "}
          <span className="text-red-900">& acquire arts to</span> our
          marketplace.
        </h1>
      </div>
      {/* //paragraph */}
      <div className="relative pt-[2vh] px-5 lg:pt-[8vh] lg:pl-40 pointer-events-none lg:w-[35vw] ">
        <h1
          ref={section2Title2Ref}
          className="will-change-transform font-normal text-m lg:text-xl font-Grotesk leading-normal"
        >
          Dynamic community where sellers and buyers seamlessly merge.
        </h1>
      </div>
      {/* //button join us */}
      <div
        ref={section2BtnRef}
        className="relative pt-[43vh]  lg:pt-[8vh] px-10 lg:pl-40 pointer-events-auto flex flex-col lg:flex-row space-x-1  lg:space-x-5"
      >
        <Link
          to="/signup"
          className=" flex justify-center items-center h-max w-30  py-2 px-2 lg:px-5 lg:py-1  border border-transparent 
							rounded-4xl shadow-sm text-xl font-medium text-white bg-black font-Grotesk leading-normal
							 hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-offset-2 will-change-transform
							  focus:ring-emerald-500 transition duration-200 ease-in-out disabled:opacity-50"
        >
          <span>Join Us</span>
        </Link>
        <Link
          to="/shop"
          className=" flex justify-center items-center lg:min-h-max w-30 lg:min-w-max py-5 px-2 lg:px-5 lg:py-1 border-transparent 
							rounded-4xl text-xl font-medium hover:text-white hover:bg-black font-Grotesk leading-normal
							 bg-transparent  text-black will-change-transform
						 transition duration-200 ease-in-out disabled:opacity-50"
        >
          <span>Our Store</span>
        </Link>
      </div>
    </section>
  );
};

export default SectionTwo;
