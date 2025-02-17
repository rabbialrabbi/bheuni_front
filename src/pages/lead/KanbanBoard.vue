<script setup>
import draggable from "vuedraggable";
import TaskCard from "@/components/lead/Kanban/TaskCard.vue";
import {useStore} from "vuex";
const store = useStore();
let in_progress = computed(()=>store.getters['leads/kanbans_in_progress'])
let bad_timing = computed(()=>store.getters['leads/kanbans_bad_timing'])
let not_interested = computed(()=>store.getters['leads/kanbans_not_interested'])
let not_qualified = computed(()=>store.getters['leads/kanbans_not_qualified'])

onMounted(async ()=> {
  await store.dispatch('leads/fetchLeads')
})


let add = function(status){
  let id = event.target.id
  store.commit('leads/UPDATE_KANBAN',{id,status})
  store.dispatch('leads/updateStatus',{status,leadId:id})
}
</script>

<template>
  <BaseBreadcrumb title="Kanban" :breadcrumbs="[
  {
    title: 'Lead',
    disabled: false,
    href: '#'
  },
  {
    title: 'Kanban',
    disabled: true,
    href: '#'
  }
]">

  </BaseBreadcrumb>
  <VRow>
    <VCol cols="12" md="12">
      <VCard
        class="mx-auto"
      >
        <VCardText class="pt-4">
          <VRow justify="end"
                class="pa-4"
          >
            <VCol
              cols="12"
              md="3"
              class="bg-red-lighten-4"
            >
              <h3 class="text-center my-10">In Progress</h3>
              <draggable
                class="list-group drop-height"
                :list="in_progress"
                group="people"
                @add="add('1')"
                item-key="title"
              >
                <template #item="{ element, index }">
                  <TaskCard
                    :id="element.id"
                    :task="element"
                    class="mt-3 cursor-move"
                  ></TaskCard>
                </template>
              </draggable>
            </VCol>
            <VCol
              cols="12"
              md="3"
              class="bg-pink-lighten-4"
            >
              <h3 class="text-center my-10">Bad Timing</h3>
              <draggable
                class="list-group drop-height"
                :list="bad_timing"
                group="people"
                @add="add('2')"
                item-key="id"
              >
                <template #item="{ element, index }">
                  <TaskCard
                    :task="element"
                    class="mt-3 cursor-move"
                  ></TaskCard>
                </template>
              </draggable>
            </VCol>
            <VCol
              cols="12"
              md="3"
              class="bg-purple-lighten-4"
            >
              <h3 class="text-center my-10">Not Interested</h3>
              <draggable
                class="list-group drop-height"
                :list="not_interested"
                group="people"
                @add="add('3')"
                item-key="title"
              >
                <template #item="{ element, index }">
                  <TaskCard
                    :task="element"
                    class="mt-3 cursor-move"
                  ></TaskCard>
                </template>
              </draggable>
            </VCol>
            <VCol
              cols="12"
              md="3"
              class="bg-blue-lighten-4"
            >
              <h3 class="text-center my-10">Not Qualified</h3>
              <draggable
                class="list-group drop-height"
                :list="not_qualified"
                group="people"
                @change="log"
                item-key="title"
                @add="add('4')"
              >
                <template #item="{ element, index }">
                  <TaskCard
                    :task="element"
                    class="mt-3 cursor-move"
                  ></TaskCard>
                </template>
              </draggable>
            </VCol>

          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
 .drop-height{
  min-height: 200px;
}
</style>
