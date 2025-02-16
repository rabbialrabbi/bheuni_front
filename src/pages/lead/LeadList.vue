<script setup>
import { CirclePlusIcon,EditIcon,TrashIcon } from 'vue-tabler-icons';
import CounselorAssignForm from "@/components/lead/CounselorAssignForm.vue";
import confirmation from "@/_helper/alert";

import { useStore } from 'vuex';

const store = useStore();

let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Lead List' })
let itemsPerPage = ref(10)
let product = ref(null)
let leads = computed(()=>store.state.leads.leads)
let totalLeadItem = 0
let selectedLead = ref()
let selectedCounselor = ref()
const breadcrumbs= [
  {
    title: 'Lead',
    disabled: false,
    href: '#'
  },
  {
    title: 'List',
    disabled: true,
    href: '#'
  }
]

let counselor = [{ title: 'Counselor', key: 'counselor', align: 'end' }]
const headers = [
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  { title: 'Email', key: 'email', align: 'end' },
  { title: 'Phone', key: 'phone', align: 'end' },
  { title: 'Status', key: 'status', align: 'end' },
  ...counselor,
  { title: 'Action', key: 'actions', align: 'center', sortable: false },
]


watch(name,(newData)=>{
  search.value = String(Date.now())
})

onMounted(async ()=> {
  await store.dispatch('leads/fetchLeads')
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
  await store.dispatch('leads/fetchLeads',config)
  loading.value = false
}

const AssignCounselor = (leadId)=>{
  let lead = store.state.leads.leads.find(x=>x.id == leadId)
  if(lead && lead.counselor_id){
    selectedCounselor.value = lead.counselor_id
  }else{
    selectedCounselor.value = null
  }
  selectedLead.value = leadId
  store.state.leads.activationModalStatus = true
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
            @click="product=null;"
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
            :items="leads"
            :items-length="totalLeadItem"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          >

            <template #item.actions="{ item }">
              <div class="text-no-wrap">
                <IconBtn
                  v-if="$can('assign', 'lead')"
                  class="actionBtn"
                  size="small"
                  @click="AssignCounselor(item.id)"
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
  <v-dialog v-model="store.state.leads.activationModalStatus" max-width="600px">
    <CounselorAssignForm
      :lead="selectedLead"
      :counselor="selectedCounselor"
    ></CounselorAssignForm>
  </v-dialog>

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
