import base from './Api';

const setStock = async (stockData: {id: number; stock: number}[]) =>
  base(true)
    .patch(`/partner/products/`, stockData)
    .then(res => res.data);

const ProductService = {
  setStock,
};

export default ProductService;
