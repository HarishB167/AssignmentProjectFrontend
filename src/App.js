import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import Products from "./components/products";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = { isAdding: false };

  handleClick() {
    this.setState({ isAdding: true });
  }

  hideAddRow = () => {
    this.setState({ isAdding: false });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row m-5">
          <button
            type="button"
            onClick={() => this.handleClick()}
            className="btn btn-primary m-2"
          >
            Add
          </button>
          <Products
            isAdding={this.state.isAdding}
            onAddProduct={this.hideAddRow}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
