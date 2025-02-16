// src/stores/posStore.js
import { defineStore } from 'pinia';
import api from '@/_helper/api'

export const usePosStore = defineStore('pos', {
  state: () => ({
    products: [],
    totalProductItem: 0,
    categories:[],
    productList: [],
    supplierList: [],
    purchases: [],
  }),
  actions: {
    async getProductList(params) {
      const response = await api.get('/products',params);
      let productsData = response.data
      this.products = productsData.data;
      this.totalProductItem = productsData.meta.total;
    },
    async createProduct(data) {
      await api.post('/products', data);
      this.getProductList();
    },
    async updateProduct(id, data) {
      await api.put(`/products/${id}`, data);
      this.getProductList();
    },
    async deleteProduct(id) {
      await api.delete(`/products/${id}`);
      this.getProductList();
    },
    async getCategoryList() {
      const response = await api.get('/categories');
      let productsData = response.data
      this.categories = productsData.data;
    },

    async fetchSuppliers() {
      const response = await apiClient.get('/suppliers');
      this.suppliers = response.data;
    },
    async createSupplier(data) {
      await apiClient.post('/suppliers', data);
      this.fetchSuppliers();
    },
    async updateSupplier(id, data) {
      await apiClient.put(`/suppliers/${id}`, data);
      this.fetchSuppliers();
    },
    async deleteSupplier(id) {
      await apiClient.delete(`/suppliers/${id}`);
      this.fetchSuppliers();
    },

    async fetchPurchases() {
      const response = await apiClient.get('/purchases');
      this.purchases = response.data;
    },
    async createPurchase(data) {
      await apiClient.post('/purchases', data);
      this.fetchPurchases();
    }
  }
});
