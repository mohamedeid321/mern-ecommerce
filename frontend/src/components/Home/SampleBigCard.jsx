//import { Link } from "react-router-dom";
const SampleBigCard = ({ category }) => {
  const {
    id,
    imageUrl,
    className = "",
    name = "title",
    description = "describtion",
    buttonText = "Read more",
    onButtonClick,
  } = category;

  return (
    <section
      data-id={id}
      className={` w-[40vw] lg:w-[40vw] cursor-grab select-none overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] will-change-transform active:cursor-grabbing ${className}`}
    >
      <div className="h-[20vh] lg:h-[45vh] overflow-hidden bg-[#1f3cff]">
        <img
          src={imageUrl}
          alt={name}
          draggable={false}
          className="pointer-events-none block h-full w-full object-cover"
        />
      </div>

      <div className="bg-neutral-200 px-[18px] pb-5 pt-[18px]">
        <h3 className="mb-1.5 text-[17px] font-semibold tracking-tight text-neutral-900">
          {name}
        </h3>
        <p className="mb-[18px] text-xs leading-snug text-neutral-700">
          {description}
        </p>
        <button
          type="button"
          onClick={onButtonClick}
          className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:border-neutral-500 hover:bg-neutral-100"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default SampleBigCard;
