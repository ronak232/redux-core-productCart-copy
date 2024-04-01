import { useCallback, useEffect, useState } from "react";
import paginate from "../utils/paginate";

function FilterProduct({ setcartFilter, cartFilter, allProducts }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [paginationOnFilter, setPaginationOnFilter] = useState(1)
  // To filter only the product categories
  const allCategories = [
    ...new Set(allProducts?.flat()?.map((item) => item?.category)), //flat() method is used to flatten the paginated arrays into a single array before applying the filtering logic.
  ];

  // To calculate the maximum price of the product.
  const productPriceMaxValue = cartFilter?.reduce(
    (prev, curr) => (prev.price > curr.price ? prev : curr),
    1
  );

  // To calculate the minimum price of the product.
  const productPriceMinValue = cartFilter?.reduce(
    (prev, curr) => (prev.price < curr.price ? prev : curr),
    1
  );

  // to avoid running filterProductItems for every re-render
  // useCallback hook to memoize the function and only recreate it when its dependencies change.
  // This helps to optimize performance by preventing unnecessary re-creations of the function.
  const filterProductItems = useCallback(
    (category) => {
      if (category === selectedCategory) {
        setSelectedCategory(null);
        setcartFilter(allProducts.flat(5)); // Reset to default mapping data
      } else {
        const filterCategory = allProducts
          ?.flat()
          ?.filter((items) => items?.category === category);
        setcartFilter(filterCategory);
        setSelectedCategory(category);
      }
    },
    [allProducts, setcartFilter]
  );

  const clearAllFilter = () => {
    console.log(cartFilter);
    setSelectedCategory([]);
    setPaginationOnFilter(paginate(paginationOnFilter));
  };

  return (
    <aside className="products__filter">
      <div className="products__filter-category">
        <div className="products__filter-category--options-dropdown">
          <h3>Categories</h3>
          <div className="products__filter-category--options-dropdown-items">
            {allCategories?.map((category, index) => {
              return (
                <button
                  className="filters-btn"
                  // style={{color:darkMode ? "white" : "black"}}
                  key={index}
                  onClick={() => filterProductItems(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => clearAllFilter()}>Clear Filter</button>
      </div>
      {/* <div className="products__filter-price">
        <h1>Filter by Price</h1>
        <div className="product__filter-price--range">
          <input
            type="range"
            name="price"
            // onChange={}
            max={productPriceMaxValue}
            min={productPriceMinValue}
          />
        </div>
      </div> */}
    </aside>
  );
}

export default FilterProduct;
