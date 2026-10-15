import { Link } from "react-router-dom";
const Card = ({ category }) => {
  return (
    <div className={`${category.className}`} data-id={category.id}>
      <Link to={`/category${category.href || ""}`}>
        <div className="relative overflow-hidden group w-[14vw] h-[26vh] cursor-pointer rounded-[1vw] bg-amber-300">
          <div
            className="absolute inset-0  bg-gradient-to-b from-transparent to-gray-900 
            transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 z-10"
          />
          <img
            src={category?.imageUrl}
            alt={category?.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-4 z-20 
          transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 "
          >
            <h3 className="text-white text-2xl font-bold mb-2">
              {category?.name}
            </h3>
            <p className="text-gray-200 text-sm">Explore {category?.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
