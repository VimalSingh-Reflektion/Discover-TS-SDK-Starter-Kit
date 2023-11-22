import { BASE_PATH } from './constants';

const getProductUrl = (product: any, includeBasePath = false) => {
  const basename = includeBasePath ? BASE_PATH : '';
  return `${basename}/product/detail${product?.sku_url_key}`;
};

export default getProductUrl;