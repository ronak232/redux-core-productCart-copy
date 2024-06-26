import React from "react";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

function Rating({ stars }) {
  // console.log(stars);
  return (
    <div className="product-rating">
      {/* We can generate the sequence of the numbers */}
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <span className="product-rating-color" key={i}>
            {stars >= i + 1 ? (
              <RiStarFill />
            ) : stars >= i + 0.5 ? (
              <RiStarHalfFill />
            ) : (
              <RiStarLine />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
