import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { UserKey, Mail, Lock, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
//
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const LogInForm = () => {
  const { login, loading } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //
  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-Grotesk leading-normal">
      <div className="z-5 relative w-[70%] ">
        <div className="overflow-hidden mb-10 pb-1">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            className="text-center text-[2vw] font-extrabold text-black"
          >
            User LogIn
          </motion.h2>
        </div>
        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={submitHandler}
          className="space-y-8"
        >
          {/* ****************** email **************** */}
          <motion.div variants={item}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full  text-black px-3 py-2 pl-10 bg-transparent border-b-2 border-gray-300
									 placeholder-gray-400 focus:outline-none focus:border-mainColor sm:text-sm "
                placeholder="ex : you@example.com"
              />
            </div>
          </motion.div>
          {/* ****************** password **************** */}
          <motion.div variants={item}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full text-black px-3 py-2 pl-10 bg-transparent border-b-2 border-gray-300
									 placeholder-gray-400 focus:outline-none focus:border-mainColor sm:text-sm "
                placeholder="**********"
              />
            </div>
          </motion.div>
          {/* //end form */}
          <motion.button
            variants={item}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-btnColor
							 hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-mainColor transition-colors duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 animate-spin"
                  size={30}
                  aria-hidden="true"
                />
                <h1 className="font-extrabold text-[20px]">Loading...</h1>
              </>
            ) : (
              <>
                <UserKey className="mr-2 " size={30} aria-hidden="true" />
                <h1 className="font-extrabold text-[20px]">LogIn</h1>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
      {/* //paragraph to log in */}
      <motion.p
        className="mt-8 text-center text-sm text-gray-400"
        initial={{ x: "-20%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: [0.22, 1, 0.36, 1],
          duration: 1.5,
          delay: 1,
        }}
      >
        Don’t have an account yet?{" "}
        <Link
          to="/signup"
          className="font-medium text-btnColor hover:text-mainColor"
        >
          Register for free <ArrowRight className="inline h-4 w-4" />
        </Link>
      </motion.p>
    </div>
  );
};

export default LogInForm;
