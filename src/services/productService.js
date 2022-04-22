import http from "./httpService";

const apiEndpoint = "/products/";

export function getProducts() {
  return http.get(apiEndpoint);
}

export function saveProduct(product) {
  return http.post(apiEndpoint, product);
}
