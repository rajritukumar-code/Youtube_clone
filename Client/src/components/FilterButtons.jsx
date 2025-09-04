import React, { useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { categories } from "../constants/categories";

const FilterButtons = ({ selectedCategory, onCategoryChange }) => {
  const itemRefs = React.useRef([]);
  const scrollRef = React.useRef(null);

  // Scroll to selected category
  useEffect(() => {
    itemRefs.current[selectedCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedCategory]);

  // Handle scroll
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center gap-2  bg-white">
      {/* Scroll left button */}
      <button
        onClick={() => scroll("left")}
        className="left-0 max-[350px]:text-xl text-2xl rounded-full bg-white border border-gray-400 text-gray-600 ml-2">
        <BiChevronLeft />
      </button>
      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex justify-start gap-3 max-[350px]:text-xs text-sm md:text-base  max-w-full overflow-x-auto scrollbar-hide">
        {categories?.map((cat) => (
          <button
            key={`catbtn${cat}`}
            onClick={() => onCategoryChange(cat)}
            ref={(el) => (itemRefs.current[cat] = el)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Scroll right button */}
      <button
        onClick={() => scroll("right")}
        className="max-[350px]:text-xl bg-white border brder-gray-400 text-gray-600 right-0 rounded-full  z-10 text-2xl mr-2">
        <BiChevronRight />
      </button>
    </div>
  );
};

export default React.memo(FilterButtons);