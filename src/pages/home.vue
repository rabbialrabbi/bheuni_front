<script setup >

// imported components
import TotalOrder from '@/views/dashboards/default/components/TotalOrder.vue';
import {onMounted} from "vue";
import api from "@/_helper/api";

let productValue = ref(0)
let supplierValue = ref(0)
let purchaseValue = ref(0)

</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Earning -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        title="Total Product"
        :value="productValue"
        color="bg-secondary"
      />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        title="Total Supplier"
        :value="supplierValue"
        color="bg-primary"
      />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Income -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalOrder
        title="Total Purchase"
        :value="purchaseValue"
        color="bg-deep-purple-lighten-2"
      />
    </v-col>
  </v-row>
</template>
