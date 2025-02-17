<script setup>
import { CirclePlusIcon,EditIcon,TrashIcon,PencilIcon} from 'vue-tabler-icons';
import CounselorAssignForm from "@/components/lead/CounselorAssignForm.vue";
import StatusUpdateForm from "@/components/lead/StatusUpdateForm.vue";
import confirmation from "@/_helper/alert";
import { useStore } from 'vuex';

const store = useStore();

let loading = ref(true)
let name = ref('')
let search = ref('')
let page = reactive({ title: 'Lead List' })
let itemsPerPage = ref(10)
let leads = computed(()=>store.state.leads.leads)
let totalLeadItem = 0
let selectedLead = ref()
let selectedCounselor = ref()
let selectedStatus = ref('')
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
  { title: 'Status', key: 'status_name', align: 'end' },
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
const UpdateStatus = (leadId)=>{
  let lead = store.state.leads.leads.find(x=>x.id == leadId)
  if(lead && lead.status){
    selectedStatus.value = lead.status
  }else{
    selectedStatus.value = null
  }
  selectedLead.value = leadId
  store.state.leads.statusUpdateModalStatus = true
}

const moveToApplication = async (leadId)=>{
  let alert =  confirmation.general('Do you want to move to application')
  alert.then(async res=>{
    if(res.isConfirmed)
      await store.dispatch('leads/moveToApplication',{leadId})
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
            :items="leads"
            :items-length="store.state.leads.totalLeads"
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
                  title="Assign counselor"
                >
                  <PencilIcon/>
                </IconBtn>
                <IconBtn
                  v-if="$can('change', 'lead-status')"
                  class="actionBtn"
                  size="small"
                  @click="UpdateStatus(item.id)"
                  title="Update status"
                >
                  <BrowserCheckIcon/>
                </IconBtn>

                <IconBtn
                  v-if="$can('move', 'lead-application')"
                  class="actionBtn"
                  size="small"
                  @click="moveToApplication(item.id)"
                  title="Move to application section"
                >
                  <NavigationIcon />
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
  <v-dialog v-model="store.state.leads.statusUpdateModalStatus" max-width="600px">
    <StatusUpdateForm
      :lead="selectedLead"
      :status="selectedStatus"
    ></StatusUpdateForm>
  </v-dialog>

</template>

<style>
.actionBtn{
  cursor: pointer;
}
</style>
