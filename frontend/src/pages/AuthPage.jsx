import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/AuthComponents/SignUpForm";
import LogInForm from "../components/AuthComponents/LogInForm";
//
import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
};
const AuthPage = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="w-screen h-dvh text-white relative overflow-hidden">
      {/* ============ النص (Hello / Welcome) ============ */}
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.h1
            key={pathname}
            className="text-white font-bold text-4xl lg:text-[3vw] absolute z-5
                       bottom-[7dvh] left-[18vw] lg:bottom-auto lg:left-auto lg:top-[14vh] lg:right-[6vw]"
            initial={
              isDesktop ? { x: "20%", opacity: 0 } : { y: 40, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={isDesktop ? { x: "20%", opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hello
          </motion.h1>
        ) : (
          <motion.h1
            key={pathname}
            className="text-white font-bold text-4xl lg:text-[3vw] absolute z-5
                       top-[7dvh] left-[14vw] lg:top-[14vh] lg:left-[9vw]"
            initial={
              isDesktop ? { x: "-20%", opacity: 0 } : { y: -40, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              isDesktop ? { x: "-20%", opacity: 0 } : { y: -40, opacity: 0 }
            }
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Welcome
          </motion.h1>
        )}
      </AnimatePresence>

      {/* ============ الخلفية ============ */}
      <div className="bgContainer absolute w-screen h-dvh top-0">
        {/* ---------- الصورة ---------- */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key={pathname}
              className={
                isDesktop
                  ? "absolute z-4 top-[35vh] right-20 pointer-events-none"
                  : // موبايل: شريط تحت، الروبوت بيطلع منه من تحت
                    "absolute z-4 bottom-0 left-0 pt-5 w-full h-[18dvh] overflow-hidden flex justify-end pr-[18vw] pointer-events-none"
              }
              initial={
                isDesktop ? { x: "50%", opacity: 0 } : { y: "100%", opacity: 0 }
              }
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={
                isDesktop
                  ? { x: "80%", opacity: 0, transition: { duration: 0.4 } }
                  : { y: "100%", opacity: 0, transition: { duration: 0.4 } }
              }
            >
              <motion.img
                className="w-32 mt-4 h-fit scale-180 lg:w-auto lg:mt-0 lg:scale-150"
                src="/signup-welcome.png"
                alt="signup-welcome"
                animate={{ y: [0, -15, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={pathname}
              className={
                isDesktop
                  ? "absolute z-4 top-[27vh] left-0 pointer-events-none"
                  : // موبايل: شريط فوق
                    "absolute z-4 top-0 pt-15 left-0 w-full h-[18dvh] overflow-hidden flex justify-end items-center pr-[18vw] pointer-events-none"
              }
              initial={
                isDesktop
                  ? { x: "-50%", opacity: 0 }
                  : { y: "-100%", opacity: 0 }
              }
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={
                isDesktop
                  ? { x: "-80%", opacity: 0, transition: { duration: 0.4 } }
                  : { y: "-100%", opacity: 0, transition: { duration: 0.4 } }
              }
            >
              <motion.img
                className="w-24 lg:w-auto scale-190 lg:scale-100"
                src="/login-hello.webp"
                alt="signup-Image"
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- الكارت الأبيض ---------- */}
        <motion.div
          initial={false}
          animate={
            isDesktop
              ? { x: isLogin ? "-50%" : "0%", y: 0 }
              : { x: 0, y: isLogin ? 0 : "18dvh" }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`bg-white z-3 absolute top-0 right-0
            w-full h-[82dvh]
            ${isLogin ? "rounded-b-[8vw]" : "rounded-t-[8vw]"}
            lg:w-2/3 lg:h-screen lg:rounded-[2vw]
            flex flex-col items-center justify-center`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[100%] lg:h-auto lg:w-[70%]"
            >
              {isLogin ? <LogInForm /> : <SignUpForm />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="bg-mainColor z-2 absolute w-screen h-dvh left-0"></div>
      </div>
    </div>
  );
};

export default AuthPage;
