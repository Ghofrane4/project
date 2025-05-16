import { makeAutoObservable } from "mobx";

class ProductStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product) => {
    this.products.push(product);
  };

  removeProduct = (id) => {
    this.products = this.products.filter(product => product.id !== id);
  };

  getProducts(products) {
    console.log('products==>', products);
    
    this.products = products;
  }

  editProduct = (id, updatedProduct) => {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
    }
  };

}

const productStore = new ProductStore();
export default productStore;
