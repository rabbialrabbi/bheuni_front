<script setup>
import {useProductStore} from '@/stores/product';
import {ref, watch} from 'vue';
import {positiveNumberValidation, requiredValidator} from "@/utils/validators";

const props = defineProps(['product'])
const productStore = useProductStore();

const refForm = ref('')
const formData = ref({
  name: '',
  SKU: '',
  category_id: '',
  price: '',
  initial_stock_quantity: ''
});

watch(
  () => props.product,
  (newVal) => {
    formData.value = newVal ? {...newVal, initial_stock_quantity: newVal.current_stock_quantity} : {
      name: '',
      SKU: '',
      price: '',
      initial_stock_quantity: ''
    };
  },
  {immediate: true}
);
/* Reset errors if any*/
onMounted(()=> {
  productStore.errors = {}
  refForm.value?.resetValidation()
})
const saveProduct = () => {
  let status = refForm.value?.validate()
  status.then(x => {
    if (x.valid) {
      if (props.product) {
        productStore.updateProduct(props.product.product_id, formData.value);
      } else {
        productStore.createProduct(formData.value);
      }
    }
  })
};

</script>
<template>

  <v-card>
    <v-card-title>
      {{ product ? 'Edit Product' : 'Add Product' }}
    </v-card-title>
    <v-card-text>
      <v-form
        ref="refForm"
        @submit.prevent="saveProduct"
      >
        <v-text-field
          label="Product Name"
          v-model="formData.name"
          :rules="[requiredValidator]"
          :error-messages="productStore.errors.name"
        />
        <v-text-field
          label="SKU"
          v-model="formData.SKU"
          :rules="[requiredValidator]"
          :error-messages="productStore.errors.SKU"
        />
        <v-select
          v-model="formData.category_id"
          label="Category"
          :items="productStore.categories"
        ></v-select>
        <v-text-field
          label="Price"
          v-model="formData.price"
          type="number"
          :rules="[requiredValidator,positiveNumberValidation]"
          :error-messages="productStore.errors.price"
        />
        <v-text-field
          label="Initial Stock"
          v-model="formData.initial_stock_quantity"
          type="number"
          :rules="[requiredValidator,positiveNumberValidation]"
          :error-messages="productStore.errors.initial_stock_quantity"
          />
        <v-card-actions>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn text @click="productStore.productFormStatus=false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


