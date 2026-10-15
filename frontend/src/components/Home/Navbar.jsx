import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
//

const Navbar = () => {
  function getRole(user) {
    if (user === null) return "guest";
    if (user?.role === "admin") return "admin";
    return "customer";
  }
  const { user, logout } = useUserStore();
  const role = getRole(user);
  const { cart } = useCartStore();
  const menuList = [
    { href: "#home", name: "HOME" },
    { href: "/shop", name: "SHOP" },
    { href: "#about", name: "ABOUT US" },
    { href: "#blog", name: "BLOG" },
    { href: "#collection", name: "COLLECTIONS" },
    { href: "#contact", name: "CONTACT US" },
  ];
  return (
    <header className="fixed top-0 left-0 w-screen bg-transparent backdrop-blur-md z-1000 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      <div className="mx-auto px-40 py-7 flex items-center justify-between ">
        {/* // logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold flex items-center space-x-5"
          >
            <img
              src="/LOGO.png"
              className="h-11 w-auto object-contain shrink-0"
              alt="LOGO.png"
            />
            <span className="font-sans ">E-Commerce</span>
          </Link>
        </div>
        {/* // end logo */}
        <nav className="flex items-center space-x-15">
          {/* // list */}
          <div className="text-x font-bold flex items-center space-x-1">
            {menuList.map((item) => {
              const isSection = item.href.startsWith("#");

              const destination = isSection ? `/${item.href}` : item.href;

              return (
                <Link
                  key={item.name}
                  to={destination}
                  className="block px-5 py-2 bg-transparent rounded-2xl hover:bg-mainColor transition duration-300 ease-in-out"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/* // end list */}
          {/* // manage (login logout sign up) icons and cart / Dashboard  */}
          {/* // guest */}
          {role === "guest" && (
            <div className="flex items-center space-x-5">
              <Link
                to={"/signup"}
                className="group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
              >
                <UserPlus
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
              </Link>
              <Link
                to={"/login"}
                className="group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
              >
                <LogIn
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
              </Link>
            </div>
          )}
          {/* //admin */}
          {role === "admin" && (
            <div className="flex items-center space-x-5">
              <Link
                className="group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
                to={"/secret-dashboard"}
              >
                <Lock
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
                {/* <span className="hidden sm:inline">Dashboard</span> */}
              </Link>
              <button
                className="group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
              </button>
            </div>
          )}
          {/* // customer */}
          {role === "customer" && (
            <div className="flex items-center space-x-5">
              <Link
                to={"/cart"}
                className="relative group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-mainColor text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-mainColor transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                className="group bg-white  p-3 hover:bg-mainColor text-white w-max 
					flex items-center justify-center rounded-full transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut
                  size={18}
                  strokeWidth={2}
                  className=" text-black group-hover:text-white transition-colors duration-300"
                />
              </button>
            </div>
          )}
          {/* // end */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
