<script setup>
import StatusUpdateForm from "@/components/application/StatusUpdateForm.vue";
import confirmation from "@/_helper/alert";
import { useStore } from 'vuex';

const store = useStore();

let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Application List' })
let itemsPerPage = ref(10)
let applications = computed(()=>store.state.applications.applications)
let totalApplicationItem = 0
let selectedApplication = ref()
let selectedStatus = ref('')
const breadcrumbs= [
  {
    title: 'Application',
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
  ...counselor,
  { title: 'Status', key: 'status_name', align: 'end' },
  { title: 'Action', key: 'actions', align: 'center', sortable: false },
]


watch(name,(newData)=>{
  search.value = String(Date.now())
})

onMounted(async ()=> {
  await store.dispatch('applications/fetchApplications')
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
  await store.dispatch('applications/fetchApplications',config)
  loading.value = false
}
const UpdateStatus = (applicationId)=>{
  let application = store.state.applications.applications.find(x=>x.id == applicationId)
  if(application && application.status){
    selectedStatus.value = application.status
  }else{
    selectedStatus.value = null
  }
  selectedApplication.value = applicationId
  store.state.applications.statusUpdateModalStatus = true
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
            :items="applications"
            :items-length="store.state.applications.totalApplications"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
          >

            <template #item.actions="{ item }">
              <div class="text-no-wrap">
                <IconBtn
                  v-if="$can('change', 'application-status')"
                  class="actionBtn"
                  size="small"
                  @click="UpdateStatus(item.id)"
                  title="Update status"
                >
                  <BrowserCheckIcon/>
                </IconBtn>
              </div>
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="store.state.applications.statusUpdateModalStatus" max-width="600px">
    <StatusUpdateForm
      :application="selectedApplication"
      :status="selectedStatus"
    ></StatusUpdateForm>
  </v-dialog>

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
