import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

function ProductSearchSuggestion({ data, querySearch, loading }) {
  const navigate = useNavigate();
  const debounceSearch = useDebounce(querySearch);

  const productSearch = useMemo(() => {
    if (!debounceSearch) {
      return [];
    }
    return (
      data?.filter((item) =>
        item?.title?.toLowerCase().includes(debounceSearch.toLowerCase())
      ) || []
    );
  }, [debounceSearch, data]);

  // useEffect(() => {
  //   setSearchProduct(productSearch);
  // }, [productSearch, searchResultsList]);

  const handleSearchNavigation = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    debounceSearch && (
      <div className="search-suggestion-container">
        {loading ? (
          productSearch.length > 0 ? (
            <ul className="search-suggestion-list">
              {productSearch?.map((item) => {
                return (
                  <Link
                    target="_parent"
                    onClick={() => handleSearchNavigation(item.id)}
                    key={item.id}
                  >
                    <li>{item.title}</li>
                  </Link>
                );
              })}
            </ul>
          ) : (
            <p className="product-notfound">No product matches...</p>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  );
}

export default ProductSearchSuggestion;
