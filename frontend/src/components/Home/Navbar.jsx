import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
//

const menuList = [
  { href: "#home", name: "HOME" },
  { href: "/shop", name: "SHOP" },
  { href: "#about", name: "ABOUT US" },
  { href: "#blog", name: "BLOG" },
  { href: "#collection", name: "COLLECTIONS" },
  { href: "#contact", name: "CONTACT US" },
];

const iconBtn =
  "relative group bg-white p-3 hover:bg-mainColor text-white w-max flex items-center justify-center rounded-full transition duration-300 ease-in-out";
const iconCls =
  "text-black group-hover:text-white transition-colors duration-300";

function getRole(user) {
  if (user === null) return "guest";
  if (user?.role === "admin") return "admin";
  return "customer";
}

// ======= الأيقونات حسب الدور (بتتستخدم في الديسكتوب والموبايل) =======
const UserActions = ({ role, logout, cart, onNavigate }) => (
  <>
    {role === "guest" && (
      <div className="flex items-center space-x-5">
        <Link to="/signup" onClick={onNavigate} className={iconBtn}>
          <UserPlus size={18} strokeWidth={2} className={iconCls} />
        </Link>
        <Link to="/login" onClick={onNavigate} className={iconBtn}>
          <LogIn size={18} strokeWidth={2} className={iconCls} />
        </Link>
      </div>
    )}

    {role === "admin" && (
      <div className="flex items-center space-x-5">
        <Link to="/secret-dashboard" onClick={onNavigate} className={iconBtn}>
          <Lock size={18} strokeWidth={2} className={iconCls} />
        </Link>
        <button
          className={iconBtn}
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          <LogOut size={18} strokeWidth={2} className={iconCls} />
        </button>
      </div>
    )}

    {role === "customer" && (
      <div className="flex items-center space-x-5">
        <Link to="/cart" onClick={onNavigate} className={iconBtn}>
          <ShoppingCart size={18} strokeWidth={2} className={iconCls} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -left-2 bg-mainColor text-white rounded-full px-2 py-0.5 text-xs">
              {cart.length}
            </span>
          )}
        </Link>
        <button
          className={iconBtn}
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          <LogOut size={18} strokeWidth={2} className={iconCls} />
        </button>
      </div>
    )}
  </>
);

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const role = getRole(user);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // منع سكرول الصفحة والـ drawer مفتوحة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // لو الشاشة كبرت لديسكتوب اقفل الـ drawer
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => e.matches && setOpen(false);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  const getDestination = (href) => (href.startsWith("#") ? `/${href}` : href);

  return (
    <>
      <header className="fixed top-0 left-0 w-screen bg-transparent backdrop-blur-md z-1000 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <div className="mx-auto px-5 py-4 lg:px-40 lg:py-7 flex items-center justify-between">
          {/* ============ logo ============ */}
          <Link
            to="/"
            className="text-xl lg:text-2xl font-bold flex items-center space-x-3 lg:space-x-5"
          >
            <img
              src="/LOGO.png"
              className="h-9 lg:h-11 w-auto object-contain shrink-0"
              alt="LOGO.png"
            />
            <span className="font-sans">E-Commerce</span>
          </Link>

          {/* ============ Desktop nav ============ */}
          <nav className="hidden lg:flex items-center space-x-15">
            <div className="text-x font-bold flex items-center space-x-1">
              {menuList.map((item) => (
                <Link
                  key={item.name}
                  to={getDestination(item.href)}
                  className="block px-5 py-2 bg-transparent rounded-2xl hover:bg-mainColor transition duration-300 ease-in-out"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <UserActions role={role} logout={logout} cart={cart} />
          </nav>

          {/* ============ زرار القايمة (موبايل بس) ============ */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-mainColor transition"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>
      {/* 👆 الـ header اتقفل هنا */}

      {/* ============ Mobile drawer (برا الـ header) ============ */}
      <AnimatePresence>
        {open && (
          <>
            {/* الخلفية المعتمة */}
            <motion.div
              className="fixed inset-0 h-dvh bg-black/50 z-[1001] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* الـ drawer نفسها */}
            <motion.aside
              className="fixed top-0 right-0 h-dvh w-[75%] max-w-sm bg-mainColor  text-white
                       z-[1002] flex flex-col p-6 lg:hidden shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* زرار الإغلاق */}
              <button
                onClick={closeMenu}
                className="self-end p-2 rounded-full hover:bg-white/20 transition"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              {/* الـ menu list */}
              <nav className="mt-8 flex flex-col justify-center items-center space-y-5 font-bold">
                {menuList.map((item) => (
                  <Link
                    key={item.name}
                    to={getDestination(item.href)}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-2xl hover:bg-white/20 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* الأيقونات تحت */}
              <div className="mt-auto pt-6 border-t border-white/30 flex justify-center">
                <UserActions
                  role={role}
                  logout={logout}
                  cart={cart}
                  onNavigate={closeMenu}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
