import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Card from "../Home/Card";

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
];
const CardsFlow = () => {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      const cards = containerRef.current.querySelectorAll("[data-id]"); // or gsap.utils.toArray("[data-id]") cause this return acual array no node list
      // initial state once
      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: "50vw",
        y: "100vh",
        rotation: -20,
        scale: 1.2,
        force3D: true,
      });
      // lock scroll until intro is finishing
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          document.body.style.overflow = "";
          setupScroll(); // start scroll after intro
        },
      });
      //
      tl.to(cards, { y: "50vh", duration: 0.8, ease: "power2.out" })
        // rotation و scale مع بعض في tween واحد
        .to(
          cards,
          { rotation: 7, scale: 1, duration: 1.5, ease: "power3.inOut" },
          0.2, // وقت مطلق
        )
        .addLabel("spread", 1.4) // بعد ما اللي فوق يخلص بالظبط
        .to(
          cards[0],
          {
            x: "80vw",
            rotation: 10,
            y: "53vh",
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[1],
          {
            x: "70vw",
            y: "50vh",
            rotation: 7,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[2],
          {
            x: "60vw",
            y: "48vh",
            rotation: 3,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[3],
          {
            x: "50vw",
            y: "48vh",
            rotation: 0,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[4],
          {
            x: "40vw",
            y: "48vh",
            rotation: -3,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[5],
          {
            x: "30vw",
            y: "50vh",
            rotation: -7,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        )
        .to(
          cards[6],
          {
            x: "20vw",
            y: "52vh",
            rotation: -10,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "spread",
        );
      // now start scroll trigger
      function setupScroll() {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", // مسافة الـ scroll
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            //markers: true,
          },
        });

        scrollTl
          .to(
            cards[0],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[1],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[2],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[3],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[4],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[5],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cards[6],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              duration: 1.5,
              ease: "power2.inOut",
            },
            0,
          )
          //from here lets start our second card animation list
          .addLabel("spread2", 1.5)
          .to(
            cards[0],
            {
              x: "110vw",
              rotation: 0,
              y: "110vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[1],
            {
              x: "100vw",
              rotation: 0,
              y: "100vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[2],
            {
              x: "90vw",
              rotation: 0,
              y: "90vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[3],
            {
              x: "80vw",
              rotation: 0,
              y: "80vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[4],
            {
              x: "70vw",
              rotation: 0,
              y: "70vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[5],
            {
              x: "60vw",
              rotation: 0,
              y: "60vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          )
          .to(
            cards[6],
            {
              x: "50vw",
              rotation: 0,
              y: "50vh",
              scale: 1.3,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "spread2",
          );
      }
      // clean up
      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="absolute w-full h-full inset-0 pointer-events-none"
    >
      {(categories || []).map((category) => (
        <Card key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CardsFlow;
