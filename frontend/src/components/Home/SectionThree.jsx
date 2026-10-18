import { useRef } from "react";
//
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
//
gsap.registerPlugin(SplitText, ScrollTrigger);
const SectionThree = ({ id }) => {
  const TitleRef = useRef(null);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  useGSAP(() => {
    //first section
    const split = new SplitText(TitleRef.current, { type: "words,chars" });
    //
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "+=1000px",
        scrub: true,
        //markers: true,
      },
    });
    tl1
      .from(split.words, {
        filter: "blur(3px)",
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1, // تتابع دخول الحروف
        ease: "power3.out",
      })
      .from(
        swiperRef.current,
        {
          filter: "blur(4px)",
          opacity: 0,
          y: 300,
          duration: 1.5,
          ease: "power4.out",
        },
        0,
      );
  });
  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-screen h-screen pointer-events-none "
    >
      {/* //title */}
      <div className="relative pt-[20vh] lg:pt-[16vh] left-0 lg:w-[45vw] ">
        <h1
          ref={TitleRef}
          className="will-change-transform px-20 lg:pl-40 font-semibold text-3xl lg:text-6xl font-Grotesk leading-tight"
        >
          Gateway to <br /> awesome Products.
        </h1>
      </div>
      {/* //swiper */}
      <div
        ref={swiperRef}
        className="absolute left-1/2 bottom-[3vh] -translate-x-1/2 w-[83vw] h-[63vh]"
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="[--swiper-pagination-color:#51c8bc] [--swiper-navigation-color:#51c8bc] w-full h-full rounded-3xl pointer-events-auto"
        >
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/shoes.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/bags.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/glasses.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/t-shirts.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/suits.jpeg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/Jacket.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
          <SwiperSlide className="">
            <img
              className="w-full h-full object-cover"
              src="/products/sweatshirt.jpg"
              alt="shoes.jpg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SectionThree;
