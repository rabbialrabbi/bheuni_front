<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  CircleArrowDownLeftIcon,
  ShoppingBagIcon,
  BuildingStoreIcon, PackageIcon
} from 'vue-tabler-icons';
const props = defineProps(['value','title','color'])
const tab = ref('1');



</script>

<template>
  <v-card elevation="0" :class="color" class="overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-3">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat" >
          <div v-if="props.color=='bg-primary'">
            <PackageIcon stroke-width="1.5" width="20" />
          </div>
          <div v-else-if="props.color=='bg-secondary'">
            <BuildingStoreIcon stroke-width="1.5" width="20" />
          </div>
          <div v-else="props.color=='bg-deep-purple-lighten-2'">
            <ShoppingBagIcon stroke-width="1.5" width="20" />
          </div>

        </v-btn>
        <div class="ml-auto z-1">

        </div>
      </div>
      <v-tabs-window v-model="tab" class="z-1">
        <v-tabs-window-item value="1">
          <v-row>
            <v-col cols="6">
              <h2 class="text-h1 font-weight-medium">
                {{value}}
                <a href="#">
                  <CircleArrowDownLeftIcon stroke-width="1.5" width="28" class="text-white" />
                </a>
              </h2>
              <span class="text-subtitle-1 text-medium-emphasis text-white">{{title}}</span>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
