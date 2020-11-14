import axios from "axios";
const CancelToken = axios.CancelToken;

export const filterProductsService = (params) => {
  const source = CancelToken.source();
  let results = null;
  let msgError = null;
  let msgBody = null;
  const suspender = async () => {
    try {
      const { data } = await axios.post(`/products/filter_products`, params, {
        cancelToken: source.token,
      });
      msgError = false;
      msgBody = data.message.msgBody;
      results = data.products;
    } catch (error) {
      msgBody = error.response.data.message
        ? error.response.data.message.msgBody
        : error.message;
      msgError = true;
      results = [];
      alert(msgBody)
    }
  };
  return {
    read: async () => {
      if (msgError === null) await suspender();
      return { results, msgBody, msgError };
    },
  };
};


export const fetchProductsService = () => {
  const source = CancelToken.source();
  let results = null;
  let msgError = null;
  let msgBody = null;
  const suspender = async () => {
    try {
      const { data } = await axios.get(`/products`, {
        cancelToken: source.token,
      });
      msgError = false;
      msgBody = data.message.msgBody;
      results = data.products;
    } catch (error) {
      msgBody = error.response.data.message
        ? error.response.data.message.msgBody
        : error.message;
      msgError = true;
      results = [];
      alert(msgBody)
    }
  };
  return {
    read: async () => {
      if (msgError === null) await suspender();
      return { results, msgBody, msgError };
    },
  };
};

