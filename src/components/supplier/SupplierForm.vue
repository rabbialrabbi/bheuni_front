<script setup>
import {useSupplierStore} from '@/stores/supplier';
import {ref, watch} from 'vue';
import {positiveNumberValidation, requiredValidator} from "@/utils/validators";

const emit = defineEmits(['closeSupplierForm'])
const props = defineProps(['supplier'])
const supplierStore = useSupplierStore();

const refForm = ref('')
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
});

watch(
  () => props.supplier,
  (newVal) => {
    formData.value = newVal ? {...newVal} : {
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  },
  {immediate: true}
);
/* Reset errors if any*/
onMounted(()=> {
  supplierStore.errors = {}
  refForm.value?.resetValidation()
})
const saveSupplier = () => {
  let status = refForm.value?.validate()
  status.then(x => {
    if (x.valid) {
      if (props.supplier) {
        supplierStore.updateSupplier(props.supplier.supplier_id, formData.value);
      } else {
        supplierStore.createSupplier(formData.value);
      }
    }
  })

};

</script>
<template>

  <v-card>
    <v-card-title>
      {{ supplier ? 'Edit Supplier' : 'Add Supplier' }}
    </v-card-title>
    <v-card-text>
      <v-form
        ref="refForm"
        @submit.prevent="saveSupplier"
      >
        <v-text-field
          label="Supplier Name"
          v-model="formData.name"
          :rules="[requiredValidator]"
          :error-messages="supplierStore.errors.name"
        />
        <v-text-field
          label="Email"
          v-model="formData.email"
          :error-messages="supplierStore.errors.email"
        />
        <v-text-field
          label="Phone"
          v-model="formData.phone"
          :error-messages="supplierStore.errors.phone"
        />
        <v-text-field
          label="Address"
          v-model="formData.address"
          :error-messages="supplierStore.errors.address"
          />
        <v-card-actions>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn text @click="supplierStore.supplierFormStatus=false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


