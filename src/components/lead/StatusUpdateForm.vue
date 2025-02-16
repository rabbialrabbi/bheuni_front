<script setup>
import {ref, watch} from 'vue';
import {positiveNumberValidation, requiredValidator} from "@/utils/validators";
import { useStore } from 'vuex';

const props = defineProps(['lead','status'])

const store = useStore();
const refForm = ref('')
const formData = ref({
  status: props.status,
});

/* Reset errors if any*/
onMounted(async ()=> {
  refForm.value?.resetValidation()
})
const updateStatus = () => {
  let status = refForm.value?.validate()
  status.then(async x => {
    if (x.valid) {
      let status = formData.value
      status = status.status
      let leadId = props.lead
      await store.dispatch('leads/updateStatus',{status,leadId})
      store.state.leads.statusUpdateModalStatus = false
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
          v-model="formData.status"
          :rules="[requiredValidator]"
          :error-messages="store.state.leads.statusError.status"
        >
          <v-radio label="In Progress" value="1"></v-radio>
          <v-radio label="Bad Timing" value="2"></v-radio>
          <v-radio label="Not Interested" value="3"></v-radio>
          <v-radio label="Not Qualified" value="4"></v-radio>
        </v-radio-group>
        <v-card-actions>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn @click="store.state.leads.statusUpdateModalStatus=false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


