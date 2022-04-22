import React, { Component } from "react";
import Select from "./common/select";
import { getCategories } from "../services/categoryService";
import { getSubcategoriesForCategory } from "../services/subcategoryService";
import { saveProduct } from "../services/productService";

class AddProductTR extends Component {
  state = {
    data: {
      product: "",
      categories: [],
      subcategories: [],
      selectedCategoryId: "",
      selectedSubcategoryId: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    const data = { ...this.state.data };
    data.categories = categories;
    this.setState({ data });
  }

  handleCategorySelection = async (e) => {
    const { data: subcategories } = await getSubcategoriesForCategory(
      e.target.value
    );
    const data = { ...this.state.data };
    data.subcategories = subcategories;
    data.selectedCategoryId = e.target.value;
    data.selectedSubcategoryId = "";
    this.setState({ data });
  };

  handleSubCategorySelection = (e) => {
    const data = { ...this.state.data };
    data.selectedSubcategoryId = e.target.value;
    this.setState({ data });
  };

  validate = () => {
    const errors = {};
    const { data } = { ...this.state };
    if (data.product.trim() === "") errors.product = "Product is required.";
    if (data.selectedCategoryId === "")
      errors.category = "Category is required";
    if (data.selectedSubcategoryId === "")
      errors.subcategory = "Sub-category is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleAddProduct = async () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const product = {
      title: this.state.data.product,
      subcategory: this.state.data.selectedSubcategoryId,
    };
    await saveProduct(product);
    this.props.onAddProduct();
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  render() {
    const { errors } = this.state;
    return (
      <tr>
        <td align="center" valign="center">
          <button
            onClick={this.handleAddProduct}
            type="button"
            className="btn btn-link"
          >
            Save
          </button>
        </td>
        <td>
          <input
            value={this.state.data.product}
            onChange={this.handleChange}
            name="product"
            type="text"
          />
          {errors.product && (
            <div className="alert alert-danger">{errors.product}</div>
          )}
        </td>
        <td>
          <Select
            list={this.state.data.categories}
            onChange={this.handleCategorySelection}
          />
          {errors.category && (
            <div className="alert alert-danger">{errors.category}</div>
          )}
        </td>
        <td>
          <Select
            list={this.state.data.subcategories}
            onChange={this.handleSubCategorySelection}
          />
          {errors.subcategory && (
            <div className="alert alert-danger">{errors.subcategory}</div>
          )}
        </td>
      </tr>
    );
  }
}

export default AddProductTR;
