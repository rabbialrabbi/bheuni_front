<script setup>
import {ref, watch} from 'vue';
import {positiveNumberValidation, requiredValidator} from "@/utils/validators";
import { useStore } from 'vuex';

const props = defineProps(['lead','counselor'])

const store = useStore();
const refForm = ref('')
const formData = ref({
  counselor_id: props.counselor,
});

/* Reset errors if any*/
onMounted(async ()=> {
  store.dispatch('leads/fetchCounselor')
  refForm.value?.resetValidation()
})
const assignCounselor = () => {
  let status = refForm.value?.validate()
  status.then(async x => {
    if (x.valid) {
      let cid = formData.value
      cid = cid.counselor_id
      let leadId = props.lead
      await store.dispatch('leads/assignCounselor',{cid,leadId})
      store.state.leads.activationModalStatus = false
    }
  })
};

</script>
<template>

  <v-card>
    <v-card-title>
      Assign Counselor
    </v-card-title>
    <v-card-text>
      <v-form
        ref="refForm"
        @submit.prevent="assignCounselor"
      >
        <v-select
          v-model="formData.counselor_id"
          :items="store.getters['leads/counselorOptions']"
          label="Select Counselor"
          :rules="[requiredValidator]"
          :error-messages="store.state.leads.assignedError.name"
        ></v-select>
        <v-card-actions>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn @click="store.state.leads.activationModalStatus=false">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


