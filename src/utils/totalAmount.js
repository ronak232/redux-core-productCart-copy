const totalAmount = (cartItems) => {
  let totalAmount = cartItems
    ?.map((item) => item.price * item.quantity)
    ?.reduce((total, value) => total + value, 0);

  let roundTwoDollar = Math.round((totalAmount + Number.EPSILON) * 100) / 100;

  return roundTwoDollar;
};

export default totalAmount;
