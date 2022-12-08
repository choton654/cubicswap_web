import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const AddCartMutation = async (addCartData) => {
  const axios = (await import("axios")).default;

  await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, addCartData);
};

export const GetCartData = async () => {
  const axios = (await import("axios")).default;

  const {
    data: { cart },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`);
  return cart;
};

export const RemovefromCartMutation = async (removeCartData) => {
  const axios = (await import("axios")).default;
  const {
    data: { cart },
  } = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
    removeCartData
  );
  return cart;
};

export const AddCheckoutMutation = async (addCheckoutData) => {
  const axios = (await import("axios")).default;

  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/checkout`,
    addCheckoutData
  );
};

export const GetCheckoutData = async () => {
  const axios = (await import("axios")).default;

  const {
    data: { checkout },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/checkout`);
  return checkout;
};

export const AddOrderMutation = async (addOrderData) => {
  const axios = (await import("axios")).default;

  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
    addOrderData
  );
};

export const GetOneOrder = async (orderId, productId) => {
  const axios = (await import("axios")).default;

  const {
    data: { order },
  } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/singelorder`,
    {
      orderId,
      productId,
    }
  );
  return order;
};

export const UpdateCheckoutItemMutation = async (checkoutData) => {
  const axios = (await import("axios")).default;
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/checkout/update`,
    checkoutData
  );
};

export const GetAllCategory = async (pageParam) => {
  const axios = (await import("axios")).default;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?pageNumber=${pageParam}`
  );
  return data;
};

export const GetOneCategory = async (catId, pageParam) => {
  const axios = (await import("axios")).default;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${catId}&pageNumber=${pageParam}`
  );
  return data;
};

export const GetOneProduct = async (id) => {
  const axios = (await import("axios")).default;
  const {
    data: { product },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
  return product;
};

export const AddProductMutation = async (addProductData) => {
  const axios = (await import("axios")).default;

  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/create`,
    addProductData
  );
};

export const AddAddressMutation = async (addAddressData) => {
  const axios = (await import("axios")).default;
  const {
    data: { user },
  } = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`,
    addAddressData
  );
  return user;
};

export const GetAuthUser = async () => {
  const axios = (await import("axios")).default;

  const {
    data: { user },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`);
  return user;
};

export const LoginMutation = async (loginData) => {
  const axios = (await import("axios")).default;

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
    loginData
  );
  return data;
};

export const RegisterUser = async (registerData) => {
  const axios = (await import("axios")).default;

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`,
    registerData
  );
  return data;
};

export const ForgetPasswordMutation = async (email) => {
  const axios = (await import("axios")).default;

  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/forgotpassword`,
    { email }
  );
};
export const ReasetPasssword = async (password) => {
  const axios = (await import("axios")).default;

  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/resetpassword/${resetToken}`,
    {
      password,
    }
  );
};

export const GetAllSeller = async () => {
  const axios = (await import("axios")).default;
  const {
    data: { users },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/all`);
  return users;
};

export const CreateSellerMutation = async (createSellerData) => {
  const axios = (await import("axios")).default;
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/add`,
    createSellerData
  );
};

export const GetTopProducts = async () => {
  const axios = (await import("axios")).default;
  const {
    data: { topProds },
  } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/top`);
  return topProds;
};

export const GetMyProducts = async (pageParam, storeId) => {
  const axios = (await import("axios")).default;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/me/${storeId}?pageNumber=${pageParam}`
  );
  return data;
};

export const GetRecivedOrders = async () => {
  const axios = (await import("axios")).default;

  const {
    data: { receivedOrders },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/receivedOrders`
  );
  return receivedOrders;
};

export const GetMyOrders = async (pageParam) => {
  const axios = (await import("axios")).default;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/myorders?pageNumber=${pageParam}`
  );
  return data;
};

export const SearchForProducts = async (keyword) => {
  const axios = (await import("axios")).default;
  const {
    data: { products },
  } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/products?keyword=${keyword}&limit=${10}`
  );
  return products;
};
