import React, { Component } from "react";
import CheckBox from "./common/checkBox";
import { getProducts } from "../services/productService";
import AddProductTR from "./addProductTableRow";
import _ from "lodash";

class Products extends Component {
  state = {
    products: [],
    sortColumn: { column: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  handleUpdateAfterAddProduct = async () => {
    const { data: products } = await getProducts();
    this.setState({ products });
    this.props.onAddProduct();
  };

  handleSort = (column) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.column == column)
      sortColumn.order = sortColumn.order == "asc" ? "desc" : "asc";
    else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.state;
    if (column !== sortColumn.column) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { products, sortColumn } = this.state;

    const productsSorted = _.orderBy(
      products,
      [sortColumn.column],
      [sortColumn.order]
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th className="clickable" onClick={() => this.handleSort("title")}>
              Product {this.renderSortIcon("title")}
            </th>
            <th
              className="clickable"
              onClick={() => this.handleSort("category")}
            >
              Category {this.renderSortIcon("category")}
            </th>
            <th
              className="clickable"
              onClick={() => this.handleSort("subcategory_name")}
            >
              Sub-category {this.renderSortIcon("subcategory_name")}
            </th>
          </tr>
        </thead>
        <tbody>
          {productsSorted.map((product) => (
            <tr key={product.id}>
              <td align="center" valign="center">
                <CheckBox />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.subcategory_name}</td>
            </tr>
          ))}
          {this.props.isAdding ? (
            <AddProductTR onAddProduct={this.handleUpdateAfterAddProduct} />
          ) : (
            ""
          )}
        </tbody>
      </table>
    );
  }
}

export default Products;
