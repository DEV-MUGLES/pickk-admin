import base from './Api';

const setStock = async (id: number, stock: number) =>
  base(true)
    .patch(`/partner/products/${id}/`, {
      stock,
    })
    .then(res => res.data);

const ProductService = {
  setStock,
};

export default ProductService;
