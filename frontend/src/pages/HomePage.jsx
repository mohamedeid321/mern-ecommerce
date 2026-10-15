import SmoothVideoBackground from "../components/Home/SmoothVideoBackground";
import CardsFlow from "../components/Home/CardsFlow";
import SectionThree from "../components/Home/SectionThree";
import SectionTwo from "../components/Home/SectionTwo";
import SectionOne from "../components/Home/SectionOne";
import SectionFour from "../components/Home/SectionFour";
import SectionFive from "../components/Home/SectionFive";
import SectionSix from "../components/Home/SectionSix";
import SectionSeven from "../components/Home/SectionSeven";
//
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  const mainRef = useRef(null);
  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => smoother.kill();
    },
    { scope: mainRef },
  );
  return (
    <main ref={mainRef}>
      {/* // video bg */}
      <SmoothVideoBackground className="opacity-40" src="/stain-bg.mp4" />
      {/*  end video bg */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* //************************  Home page *****************************/}
          <div className="w-screen h-max text-black pointer-events-none">
            {/* // section 1 */}
            <SectionOne id="home" />
            {/* ***************************end section 1 */}
            {/* //cards */}
            <CardsFlow />
            {/* // section 2 */}
            <SectionTwo id="about" />
            {/* ***************************end section 2 */}
            {/* // section 3 */}
            <SectionThree id="blog" />
            {/* ************************** end section 3 */}
            {/* // section 4 */}
            <SectionFour />
            {/* ************************** end section 4 */}
            {/* // section 5 */}
            <SectionFive id="collection" />
            {/* ************************** end section 5 */}
            {/* // section 6 */}
            <SectionSix
              hero={{
                src: "/hero.png",
                name: "Trisha Woodward",
                from: "ArtRoss",
                tag: "@artist",
              }}
              images={[
                "/1.jpg",
                "/2.jpg",
                "/3.jpg",
                "/4.jpg",
                "/5.jpg",
                "/6.jpg",
                "/7.jpg",
                "/8.jpg",
                "/9.jpg",
                "/10.jpg",
                "/11.jpg",
                "/12.jpg",
              ]}
            />
            {/* ************************** end section 6 */}
            {/* // section 7 */}
            <SectionSeven id="contact" />
            {/* ************************** end section 7 */}
          </div>

          {/* ***************************** end Home page *********************** */}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
