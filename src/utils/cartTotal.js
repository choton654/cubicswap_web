export function calculateCartTotal(products) {
  const total = products?.reduce((acc, el) => {
    el.product?.rangePerUnit
      ? (acc +=
          el.product?.rangePerUnit[el?.rangePreUnitIdx].pricePerUnit *
          el?.quantity)
      : (acc += el.product?.price * el?.quantity);
    return acc;
  }, 0);
  const totalItem = products?.reduce((acc, el) => {
    acc += el?.quantity;
    return acc;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  return { cartTotal, totalItem };
}
