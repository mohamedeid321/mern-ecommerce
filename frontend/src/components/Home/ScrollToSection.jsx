import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;

    const id = decodeURIComponent(hash.slice(1));

    requestAnimationFrame(() => {
      const target = document.getElementById(id);

      if (!target) {
        console.warn(`Section not found: #${id}`);
        return;
      }

      const smoother = ScrollSmoother.get();

      if (smoother) {
        smoother.scrollTo(target, true, "top top+=100");
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToSection;
