<script setup>
import { CirclePlusIcon,EditIcon,TrashIcon } from 'vue-tabler-icons';
import SupplierForm from "@/components/supplier/SupplierForm.vue";
import confirmation from "@/_helper/alert";
import {useSupplierStore} from "@/stores/supplier";

let supplierStore = useSupplierStore()
let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Supplier List' })
let itemsPerPage = ref(10)
let supplier = ref(null)
const breadcrumbs= [
  {
    title: 'Supplier',
    disabled: false,
    href: '#'
  },
  {
    title: 'List',
    disabled: true,
    href: '#'
  }
]

const headers = [
    {
      title: 'Name',
      align: 'start',
      key: 'name',
    },
    {
      title: 'Email',
      align: 'start',
      key: 'email',
    },
    {
      title: 'Phone',
      align: 'start',
      key: 'phone',
    },
   {
      title: 'Address',
      align: 'start',
      key: 'address',
    },
   { title: 'Action', key: 'actions', align: 'center', sortable: false },
  ]


watch(name,(newData)=>{
  search.value = String(Date.now())
})

const loadItems = async ({ page, itemsPerPage, sortBy }) =>{
  loading.value = true
  let config = {
    params:{
      page,
      itemsPerPage,
      sortBy,
      q: name.value
    }
  }
  await supplierStore.getSupplierList(config)
  loading.value = false
}

const editSupplier = (supplierId)=>{
  supplier.value = supplierStore.suppliers.find(x => x.supplier_id === supplierId)
  supplierStore.supplierFormStatus = true
}

const deleteSupplier = async (supplierId)=>{
  let alert =  confirmation.delete()
  alert.then(res=>{
    if(res.isConfirmed)
      supplierStore.deleteSupplier(supplierId)
  })
}
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-card
        class="mx-auto"
      >
        <template v-slot:title>
          <v-btn
            class="mt-4"
            color="success"
            prepend-icon="mdi-plus"
            text="Create"
            variant="flat"
            flat
            @click="supplier=null;supplierStore.supplierFormStatus=true"
          ></v-btn>
        </template>

        <v-card-text class="pt-4">
          <VRow justify="end">
            <VCol
              cols="3"
            >
              <v-text-field
                v-model="name"
                class="ma-2"
                density="compact"
                placeholder="Search"
                hide-details
                variant="outlined"
              ></v-text-field>
            </VCol>
          </VRow>

          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="supplierStore.suppliers"
            :items-length="supplierStore.totalSupplierItem"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          >
            <!-- Actions -->
            <template #item.actions="{ item }">
              <div class="text-no-wrap">
                <IconBtn
                  class="actionBtn"
                  size="small"
                  @click="editSupplier(item.supplier_id)"
                >
                  <EditIcon/>
                </IconBtn>

                <IconBtn
                  class="actionBtn"
                  size="small"
                  @click="deleteSupplier(item.supplier_id)"
                >
                  <TrashIcon/>
                </IconBtn>

              </div>
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="supplierStore.supplierFormStatus" max-width="600px">
    <SupplierForm
      :supplier="supplier"
    ></SupplierForm>
  </v-dialog>

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
