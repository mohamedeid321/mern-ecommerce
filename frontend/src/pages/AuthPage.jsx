import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/AuthComponents/SignUpForm";
import LogInForm from "../components/AuthComponents/LogInForm";
//

const AuthPage = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  return (
    <div className=" w-screen h-screen text-white relative overflow-hidden">
      {/* //********************* text welcoe & hello ******  */}
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.h1
            key={pathname}
            className="text-white font-bold text-[3vw] absolute z-5 top-[14vh] right-[12vw]"
            initial={{ x: "20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "20%", opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Hello
          </motion.h1>
        ) : (
          <motion.h1
            key={pathname}
            className="text-white font-bold text-[3vw] absolute z-5 top-[14vh] left-[9vw]"
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-20%", opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Welcome
          </motion.h1>
        )}
      </AnimatePresence>
      {/* //********************* bg section ******  */}
      <div className="bgContainer absolute w-screen h-screen top-0">
        {/* // image */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key={pathname}
              className="absolute z-4 top-[35vh] right-20"
              initial={{ x: "50%", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                x: "80%",
                opacity: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              <motion.img
                className="scale-150"
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
              className="absolute z-4 top-[27vh] left-0"
              initial={{ x: "-50%", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                x: "-80%",
                opacity: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              transition={{
                ease: [0.22, 1, 0.36, 1],
                duration: 1,
              }}
            >
              <motion.img
                className="scale-100"
                src="/login-hello.webp"
                alt="signup-Image"
                animate={{ y: [0, -15, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* // end image */}
        {/* // white card (form inside it) */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? "-50%" : "0%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white z-3 absolute w-2/3 h-screen right-0 rounded-[2vw]
             flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-[70%]"
            >
              {isLogin ? <LogInForm /> : <SignUpForm />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="bg-mainColor z-2 absolute w-screen  h-screen left-0"></div>
      </div>
    </div>
  );
};

export default AuthPage;
