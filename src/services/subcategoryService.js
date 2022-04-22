import http from "./httpService";

const apiEndpoint = "/subcategories";

export function getSubcategories() {
  return http.get(apiEndpoint);
}

export function getSubcategoriesForCategory(id) {
  return http.get(apiEndpoint + "?category_id=" + id);
}
