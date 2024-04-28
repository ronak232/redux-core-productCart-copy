function Spinner({ spinner }) {
  return (
    <div className="product__loader">
      <img className="product__loader--img" src={`${spinner}`} alt="" />
    </div>
  );
}

export default Spinner;
