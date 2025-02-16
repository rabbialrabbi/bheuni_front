<script setup>
import { ref } from "vue";
import {TrashIcon} from "vue-tabler-icons";
import {useSupplierStore} from "@/stores/supplier";
import {useProductStore} from "@/stores/product";
import {requiredValidator,positiveNumberValidation} from "@/utils/validators"
import {usePurchaseStore} from "@/stores/purchase";

const supplierStore = useSupplierStore()
const productStore = useProductStore()
const purchaseStore = usePurchaseStore()

onMounted(()=>{
  supplierStore.getSupplierList()
  productStore.getProductList()
})

let productOptions = computed(()=> {
  return  productStore.products.map(column=> {
    return {'title':column.name,'value':column.product_id}
  })
})

let supplierOptions = computed(()=> {
  return  supplierStore.suppliers.map(column=> {
    return {'title':column.name,'value':column.supplier_id}
  })
})

let page = reactive({ title: 'Purchase Order' })
let refForm = ref()
const breadcrumbs= [
  {
    title: 'Purchase',
    disabled: false,
    href: '#'
  },
  {
    title: 'Create',
    disabled: true,
    href: '#'
  }
]

const purchaseOrder = ref({
  supplier_id: null,
  purchase_date: "",
  purchase_items: [
    {
      product_id: null,
      quantity: 0,
      unit_price: 0,
      total_price: 0
    },
  ],
  subtotal : null,
  paid : null,
});

// Add a new item to the purchase order
const addItem = () => {
  purchaseOrder.value.purchase_items.push({
    product_id: null,
    quantity: 0,
    unit_price: 0,
    total_price: 0,
  });
};

// Remove an item from the purchase order
const removeItem = (index) => {
  if(purchaseOrder.value.purchase_items.length >  1){
    purchaseOrder.value.purchase_items.splice(index, 1);
    calculateSupTotalPrice()
  }
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
const onProductSelect = (index) => {
  const item = purchaseOrder.value.purchase_items[index];
  const product = productStore.products.find(x=>x.product_id === item.product_id)
  item.quantity = 1
  item.unit_price = product.price
  updateTotalPrice(item)
}
const onUpdateQuantity = (index) => {
  const item = purchaseOrder.value.purchase_items[index];
  updateTotalPrice(item)
}
const onUpdatePrice = (index) => {
  const item = purchaseOrder.value.purchase_items[index];
  updateTotalPrice(item)
}
const updateTotalPrice = (item) => {
  item.total_price = formatCurrency(item.quantity * item.unit_price);
  calculateSupTotalPrice()
}
// Calculate total price for a specific item
const calculateSupTotalPrice = () => {
  let total = 0
  purchaseOrder.value.purchase_items.forEach(x => {
    total = total + parseFloat( x.quantity * x.unit_price)
  })
  purchaseOrder.value.subtotal = formatCurrency(total) ;
  purchaseOrder.value.paid = formatCurrency(total);
};

// Submit the purchase order to the backend API
const submitPurchaseOrder = async () => {
  let status = refForm.value?.validate()
  status.then(x => {
    if (x.valid) {
      purchaseStore.createPurchase(purchaseOrder.value)
    }
  })
};
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row
    justify="center"
  >
    <v-col
      cols="12"
      md="8"
    >
      <v-card>
        <v-card-text class="pt-4">
          <div class="create-purchase-order">
            <h2 class="mb-5">Create Purchase Order</h2>

            <!-- Supplier and Date -->
            <v-form ref="refForm" @submit.prevent="submitPurchaseOrder">
              <VRow>
                <VCol
                cols="12"
                xl="6"
                >
                  <v-select
                    label="Supplier ID"
                    v-model="purchaseOrder.supplier_id"
                    :items="supplierOptions"
                    type="number"
                    :rules="[requiredValidator]"
                    :error-messages="purchaseStore.errors.supplier_id"
                  ></v-select>
                </VCol>
                <VCol
                  cols="12"
                  xl="6"
                >
                  <v-text-field
                    label="Purchase Date"
                    v-model="purchaseOrder.purchase_date"
                    type="date"
                    :rules="[requiredValidator]"
                    :error-messages="purchaseStore.errors.purchase_date"
                  ></v-text-field>
                </VCol>

                <VCol
                  cols="12"
                >
                  <h3 class="mb-5">Purchase Items</h3>
                  <div
                    v-for="(item, index) in purchaseOrder.purchase_items" :key="index"
                    class="hover-container">
                    <!-- Your main content goes here -->
                    <div class="inner-content">
                      <VRow
                        no-gutters
                      >
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <v-select
                            label="Product"
                            v-model="item.product_id"
                            :items="productOptions"
                            @update:model-value="onProductSelect(index)"
                            :rules="[requiredValidator]"
                            :error-messages="purchaseStore.errors.product_id"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            label="Quantity"
                            v-model="item.quantity"
                            type="number"
                            @update:model-value="onUpdateQuantity(index)"
                            :rules="[requiredValidator,positiveNumberValidation]"
                            :error-messages="purchaseStore.errors[`purchase_items.${index}.quantity`]"
                          ></v-text-field>
                        </VCol>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            label="Unit Price"
                            v-model="item.unit_price"
                            type="number"
                            @update:model-value="onUpdatePrice(index)"
                            :rules="[requiredValidator,positiveNumberValidation]"
                            :error-messages="purchaseStore.errors[`purchase_items.${index}.unit_price`]"
                          ></v-text-field>
                        </VCol>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <v-text-field
                            label="Total Price"
                            v-model="item.total_price"
                            readonly
                          ></v-text-field>
                        </VCol>

                      </VRow>
                    </div>

                    <!-- Icon that shows on hover -->
                    <IconBtn
                      class="actionBtn icon"
                      size="small"
                      @click="removeItem(index)"
                    >
                      <TrashIcon/>
                    </IconBtn>
                  </div>
                </VCol>

                <VCol
                  cols="12"
                >
                  <VRow
                  justify="end"
                  style="margin-right: 23px"
                  >
                    <VCol
                    cols="12"
                    md="3"
                    class="ma-0 pa-0"
                    >
                      <v-text-field
                        label="Sub Total"
                        v-model="purchaseOrder.subtotal"
                        readonly
                      />
                    </VCol>
                  </VRow>
                  <VRow
                    justify="end"
                    style="margin-right: 23px"
                  >
                    <VCol
                      cols="12"
                      md="3"
                      class="ma-0 pa-0"
                    >
                      <v-text-field
                        label="Paid"
                        v-model="purchaseOrder.paid"
                        readonly
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>

              <VRow
                justify="space-between"
              >

                <VCol
                cols="12"
                xl="5"
                align="center"
                >
                  <v-btn @click="addItem" class="add-item" color="info">Add Item</v-btn>
                </VCol>
                <VCol
                  cols="12"
                  md="5"
                  align="center"
                >
                  <v-btn type="submit" color="success">Create Purchase Order</v-btn>
                </VCol>

              </VRow>

            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>



<style scoped>
.hover-container {
  position: relative;
  text-align: center;
}
.inner-content{
  margin-right: 23px;
}

.icon {
  position: absolute;
  top: 0px;
  right: -20px;
  font-size: 24px;
  color: gray;
  transition: opacity 0.3s ease;
  padding: 15px;
  cursor: pointer;
}
</style>
