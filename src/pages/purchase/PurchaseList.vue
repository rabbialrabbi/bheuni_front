<script setup>
import {TrashIcon } from 'vue-tabler-icons';
import confirmation from "@/_helper/alert";
import {usePurchaseStore} from "@/stores/purchase";
import {formatCurrency} from '@/utils/helpers'

let purchaseStore = usePurchaseStore()
let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Purchase List' })
let itemsPerPage = ref(10)
const breadcrumbs= [
  {
    title: 'Purchase',
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
      title: 'Purchase ID',
      align: 'start',
      key: 'purchase_id',
    },
    { title: 'Supplier', key: 'supplier', align: 'start' },
    { title: 'Total Amount', key: 'total_amount', align: 'end' },
    { title: 'Purchase At', key: 'purchase_date', align: 'end' },
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
  await purchaseStore.getPurchaseList(config)
  loading.value = false
}

const deletePurchase = async (purchaseId)=>{
  let alert =  confirmation.delete()
  alert.then(res=>{
    if(res.isConfirmed)
      purchaseStore.deletePurchase(purchaseId)
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
            :items="purchaseStore.purchases"
            :items-length="purchaseStore.totalPurchaseItem"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          >
            <template #item.purchase_id="{ item }">
              <RouterLink :to="'/purchase/' + item.purchase_id ">
                #{{ item.purchase_id }}
              </RouterLink>
            </template>
            <template #item.total_amount="{ item }">
              {{formatCurrency(item.total_amount)}}
            </template>
            <!-- Actions -->
            <template #item.actions="{ item }">
              <div class="text-no-wrap">
                <IconBtn
                  class="actionBtn"
                  size="small"
                  @click="deletePurchase(item.purchase_id)"
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

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
