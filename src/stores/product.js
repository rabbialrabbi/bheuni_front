// src/stores/posStore.js
import { defineStore } from 'pinia';
import api from '@/_helper/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    totalProductItem: 0,
    categories:[],
    errors:{},
    productFormStatus:false,
  }),
  actions: {
    async getProductList(params) {
      const response = await api.get('/products',params);
      let productsData = response.data
      this.products = productsData.data;
      this.totalProductItem = productsData.meta.total;
    },
    async createProduct(data) {
     await api.post('/products', data).then(res=>{
       this.productFormStatus = false
       this.getProductList();
     }).catch(err=>{
        if(err.response.data.errors){
          this.showFormErrors(err.response.data.errors)
        }
      });
    },
    async updateProduct(id, data) {
      await api.put(`/products/${id}`, data).then(res=>{
        this.getProductList();
        this.productFormStatus = false
      }).catch(err=>{
        if(err.response.data.errors){
          this.showFormErrors(err.response.data.errors)
        }
      });;
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
    showFormErrors(resErrors){
      for(let key in resErrors){
        this.errors[key] = resErrors[key][0]
      }
    }
  }
});
