import { useEffect, useState } from "react";
import { Button } from "../StyledComponents/Button.style";
import Spinner from "../utils/Loader/Loading";
import Rating from "../features/Rating/Rating";
import { FiShoppingCart } from "react-icons/fi";
import FilterProduct from "./FilterProduct";
import { useNavigate } from "react-router-dom";
import spinner from "../Images/Spinner.gif";

function Shop({
  handleAddProduct,
  allProducts,
  cartFilter,
  setcartFilter,
  loading,
}) {
  const [currentPage, setCurrentPages] = useState(0); //Current page
  const navigate = useNavigate();

  const handlePageChange = (index) => {
    setCurrentPages(index);
  };

  const handleNext = () => {
    if (currentPage == allProducts.length - 1) {
      setCurrentPages(0);
    } else {
      setCurrentPages(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage <= 0 && currentPage !== allProducts.length - 1) {
      setCurrentPages(allProducts.length - 1);
    } else {
      setCurrentPages(currentPage - 1);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    setcartFilter(allProducts[currentPage]);
  }, [loading, currentPage, allProducts]);

  const detailNavigate = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <section>
      {!loading ? (
        <div className="products">
          <div className="products__main-container">
            <FilterProduct
              setcartFilter={setcartFilter}
              allProducts={allProducts}
              cartFilter={cartFilter}
            />

            <div className="products__list">
              {cartFilter?.map((prod) => {
                return (
                  <div className="products__list--cards" key={prod?.id}>
                    <div className="products__list--cards-content">
                      <div className="products__list--cards-image">
                        <img
                          onClick={() => detailNavigate(prod.id)}
                          src={`${
                            prod?.images !== "null" || undefined || ""
                              ? prod?.thumbnail
                              : prod?.images
                          }`}
                          alt={prod?.thumbnail}
                        />
                      </div>
                      <div className="products__list--cards-body">
                        <p className="products__list--cards-category">
                          {prod?.category}
                        </p>
                        <h3 className="products__list--cards-title">
                          {prod?.title}
                        </h3>
                        <div className="products__list--cards-text">
                          <h5 className="products__list--cards-text-price">
                            ${prod?.price}
                          </h5>
                          <Rating stars={prod?.rating} />
                        </div>

                        <div className="products__list--cards-cart-btn">
                          <div style={{ display: "none" }}>
                            <button>+</button>
                            <span>{}</span>
                            <button>-</button>
                          </div>
                          <Button
                            bgColor="#fe696a"
                            width="100%"
                            borderRadius="6px"
                            boxShadow="0"
                            padding="10px"
                            onClick={() => handleAddProduct(prod)}
                            fontSize="14px"
                            color="white"
                          >
                            <FiShoppingCart className="cart" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {!loading && (
            <div className="pagination-btn">
              <button onClick={handlePrev}>Prev</button>
              {allProducts.map((_, index) => {
                return (
                  <button
                    className={
                      currentPage === index ? "active" : "page-btn__number"
                    }
                    key={index}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <Spinner spinner={spinner} />
      )}
    </section>
  );
}

export default Shop;
