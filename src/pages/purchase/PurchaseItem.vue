<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import {usePurchaseStore} from "@/stores/purchase";
import {formatCurrency} from '@/utils/helpers'

const route = useRoute()
const purchaseStore = usePurchaseStore()
const purchaseId = ref(route.params.id)
const purchase = ref()

onMounted(async ()=>{
  // await purchaseStore.getPurchaseList()
  purchase.value = purchaseStore.purchases.find(x=>x.purchase_id == purchaseId.value)
});

let page = reactive({ title: 'Purchase Order' })
const breadcrumbs= [
  {
    title: 'Purchase',
    disabled: true,
    href: '#'
  },
  {
    title: 'List',
    disabled: false,
    href: '/purchase/list'
  },
  {
    title: purchaseId.value,
    disabled: true,
    href: '#'
  }
]



</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="print-col"
    >
      <VCard class="invoice-preview-wrapper pa-12">
        <div v-if="purchase" class="purchase-order-preview">
          <VRow>
            <VCol
              cols="12"
            >
              <h2>Purchase Order # {{purchase.purchase_id}}</h2>
              <p><strong>Supplier : {{purchase.supplier}}</strong> </p>
              <p><strong>Purchase Date: {{ purchase.purchase_date}}</strong> </p>
              <p><strong>Total Amount : {{ formatCurrency(purchase.total_amount) }}</strong></p>

            </VCol>
            <VCol
              cols="12"
            >
              <h3>Items</h3>
              <v-table>
                <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in purchase.purchase_items" :key="item.purchase_item_id">
                  <td>{{item.product_name}}</td>
                  <td>{{item.quantity}}</td>
                  <td>{{formatCurrency(item.unit_price)}}</td>
                  <td class="text-right">{{formatCurrency(item.total_price)}}</td>
                </tr>
                <tr>
                  <td class="text-right" colspan="3">Sub Total</td>
                  <td class="text-right">{{formatCurrency(purchase.total_amount)}}</td>
                </tr>
                </tbody>
              </v-table>
            </VCol>

          </VRow>
        </div>
        <div v-else>
          <p>Loading purchase order...</p>
        </div>
      </VCard>
    </VCol>

  </VRow>

</template>

<style scoped>
.purchase-order-preview {
  max-width: 700px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h2, h3 {
  margin-top: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
