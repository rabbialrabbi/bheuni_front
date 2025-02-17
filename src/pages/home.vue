<script setup >

// imported components
import TotalOrder from '@/views/dashboards/default/components/TotalOrder.vue';
import {onMounted} from "vue";
import api from "@/_helper/api";

let totalLead = ref(0)
let totalApplication = ref(0)
let isAdmin = ref(0)
let mostActiveUser = ref([])
let mostCount = ref([])

onMounted(async ()=>{
  const res = await api.get(`/dashboard-data`);

  let data = res.data.data
  totalLead.value = data.totalLead
  totalApplication.value = data.totalApplication
  isAdmin.value = data.isAdmin
  mostActiveUser.value = data.mostActive ? data.mostActive.counselor : null
  mostCount.value = data.mostActive ? data.mostActive.application_count : 0
})

</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Lead -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        title="Total Lead"
        :value="totalLead"
        color="bg-secondary"
      />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Applicaiton -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        title="Total Application"
        :value="totalApplication"
        color="bg-primary"
      />
    </v-col>
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        v-if="isAdmin"
        :title="mostActiveUser.name + ' (MOST ACTIVE USER)'"
        :value="mostCount"
        color="bg-primary"
      />
    </v-col>
  </v-row>
</template>
