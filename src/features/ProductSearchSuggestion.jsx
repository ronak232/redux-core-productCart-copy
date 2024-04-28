import React from "react";

function ProductSearchSuggestion({ data, querySearch }) {
  console.log(data);
  return (
    querySearch && (
      <div className="search-suggestion-container">
        <ul className="search-suggestion-list">
          {querySearch &&
            data
              ?.filter((item) =>
                item.title.toLowerCase().startsWith(querySearch)
              )
              .map((item) => {
                return <li key={item.id}>{item.title}</li>;
              })}
        </ul>
      </div>
    )
  );
}

export default ProductSearchSuggestion;
