<script setup>
import { CirclePlusIcon,EditIcon,TrashIcon } from 'vue-tabler-icons';
import ProductForm from "@/components/product/ProductForm.vue";
import confirmation from "@/_helper/alert";
import {useProductStore} from "@/stores/product";
import {formatCurrency} from '@/utils/helpers'

let productStore = useProductStore()
let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Product List' })
let itemsPerPage = ref(10)
let product = ref(null)
const breadcrumbs= [
  {
    title: 'Product',
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
    { title: 'SKU', key: 'SKU', align: 'end' },
    { title: 'Category', key: 'category', align: 'end' },
    { title: 'Price', key: 'price', align: 'end' },
    { title: 'Current Stock', key: 'current_stock_quantity', align: 'end' },
    { title: 'Action', key: 'actions', align: 'center', sortable: false },
  ]


watch(name,(newData)=>{
  search.value = String(Date.now())
})

onMounted(()=> productStore.getCategoryList())
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
  await productStore.getProductList(config)
  loading.value = false
}

const editProduct = (productId)=>{
  product.value = productStore.products.find(x => x.product_id === productId)
  productStore.productFormStatus = true
}

const deleteProduct = async (productId)=>{
  let alert =  confirmation.delete()
  alert.then(res=>{
    if(res.isConfirmed)
      productStore.deleteProduct(productId)
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
            @click="product=null;productStore.productFormStatus=true"
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
            :items="productStore.products"
            :items-length="productStore.totalProductItem"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          >
            <!-- Actions -->
            <template #item.price="{ item }">
              {{formatCurrency(item.price)}}
            </template>
            <template #item.actions="{ item }">
                <div class="text-no-wrap">
                  <IconBtn
                    class="actionBtn"
                    size="small"
                    @click="editProduct(item.product_id)"
                  >
                    <EditIcon/>
                  </IconBtn>

                  <IconBtn
                    class="actionBtn"
                    size="small"
                    @click="deleteProduct(item.product_id)"
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
  <v-dialog v-model="productStore.productFormStatus" max-width="600px">
    <ProductForm
      :product="product"
    ></ProductForm>
  </v-dialog>

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
