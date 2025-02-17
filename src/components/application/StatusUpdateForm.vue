<script setup>
import {ref, watch} from 'vue';
import {positiveNumberValidation, requiredValidator} from "@/utils/validators";
import { useStore } from 'vuex';

const props = defineProps(['application','status'])

const store = useStore();
const refForm = ref('')

const applicationStats = ref(props.status)

/* Reset errors if any*/
onMounted(async ()=> {
  refForm.value?.resetValidation()
})
const updateStatus = () => {
  let status = refForm.value?.validate()
  status.then(async x => {
    if (x.valid) {
      let status = applicationStats.value
      let applicationId = props.application
      await store.dispatch('applications/updateStatus',{status,applicationId})
      store.state.applications.statusUpdateModalStatus = false
    }
  })
};

</script>
<template>

  <v-card>
    <v-card-title>
      Update Status
    </v-card-title>
    <v-card-text>
      <v-form
        ref="refForm"
        @submit.prevent="updateStatus"
      >
        <v-radio-group
          v-model="applicationStats"
          :rules="[requiredValidator]"
          :error-messages="store.state.applications.statusError.status"
        >
          <v-radio label="In progress" value="2"></v-radio>
          <v-radio label="Approved" value="1"></v-radio>
          <v-radio label="Rejected" value="0"></v-radio>
        </v-radio-group>
        <v-card-actions>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn @click="store.state.applications.statusUpdateModalStatus=false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


