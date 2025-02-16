<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const valid = ref(false);
const show1 = ref(false);
const formData = ref({
  email: 'admin@mail.com',
  password: '12345678',
  remember_me : null
});

const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const refForm = ref()
function login() {
  valid.value = true
  let status = refForm.value?.validate()
  status.then(x => {
    if (x.valid) {
      authStore.login(formData.value);
    }
  })
}
</script>

<template>
  <h5 class="text-h5 text-center my-4 mb-8">Sign in with Email address</h5>
  <v-form
    ref="refForm"
    @submit.prevent="login"
    class="mt-7 loginForm">
    <v-text-field
      v-model="formData.email"
      :rules="emailRules"
      label="Email Address"
      class="mt-4 mb-8"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="formData.password"
      :rules="passwordRules"
      label="Password"
      required
      density="comfortable"
      variant="outlined"
      color="primary"
      hide-details="auto"
      :append-icon="show1 ? '$eye' : '$eyeOff'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      class="pwdInput"
    ></v-text-field>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <v-checkbox
        v-model="formData.remember_me"
        label="Remember me?"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ml-auto">
<!--        <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot password?</a>-->
      </div>
    </div>
    <v-btn color="secondary" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
      Sign In</v-btn
    >

  </v-form>
  <div class="mt-5 text-right">
<!--    <v-divider />-->
<!--    <v-btn variant="plain" to="/auth/register" class="mt-2 text-capitalize mr-n2">Don't Have an account?</v-btn>-->
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}
.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}
.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
