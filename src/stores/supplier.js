import { defineStore } from 'pinia';
import api from '@/_helper/api'

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: [],
    totalSupplierItem: 0,
    categories:[],
    errors:{},
    supplierFormStatus:false,
  }),
  actions: {
    async getSupplierList(params) {
      const response = await api.get('/suppliers',params);
      let suppliersData = response.data
      this.suppliers = suppliersData.data;
      this.totalSupplierItem = suppliersData.meta.total;
    },
    async createSupplier(data) {
     await api.post('/suppliers', data).then(res=>{
       this.supplierFormStatus = false
       this.getSupplierList();
     }).catch(err=>{
        if(err.response.data.errors){
          this.showFormErrors(err.response.data.errors)
        }
      });
    },
    async updateSupplier(id, data) {
      await api.put(`/suppliers/${id}`, data).then(res=>{
        this.getSupplierList();
        this.supplierFormStatus = false
      }).catch(err=>{
        if(err.response.data.errors){
          this.showFormErrors(err.response.data.errors)
        }
      });;
    },
    async deleteSupplier(id) {
      await api.delete(`/suppliers/${id}`);
      this.getSupplierList();
    },
    showFormErrors(resErrors){
      for(let key in resErrors){
        this.errors[key] = resErrors[key][0]
      }
    }
  }
});
