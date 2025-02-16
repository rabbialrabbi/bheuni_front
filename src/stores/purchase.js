import { defineStore } from 'pinia';
import api from '@/_helper/api'
import router from "@/router";

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({
    purchases: [],
    totalPurchaseItem: 0,
    errors:{},
  }),
  actions: {
    async getPurchaseList(params) {
      const response = await api.get('/purchases',params);
      let purchasesData = response.data
      this.purchases = purchasesData.data;
      this.totalPurchaseItem = purchasesData.meta.total;
    },
    async createPurchase(data) {
      this.errors = {}
     await api.post('/purchases', data).then(res=>{
       this.getPurchaseList();
       router.push('/purchase/list')
     }).catch(err=>{
        if(err.response.data.errors){
          this.showFormErrors(err.response.data.errors)
        }
      });
    },
    showFormErrors(resErrors){
      for(let key in resErrors){
        this.errors[key] = resErrors[key][0]
      }
    }
  }
});
