<template>
  <div class="bg-grey-lighten-3 shadow rounded px-3 pt-3 pb-5 border border-white" :id="task.id">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm" :id="task.id">{{task.name}}</p>
      <small>{{task.email}}</small>
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{task.created_at}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
