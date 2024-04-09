<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const props = defineProps<{ column: any; task: any }>();

const store = useBoardStore();

const handleDeleteTask = () => {
  if (window.confirm("Are you sure you want to proceed?")) {
    store.deleteTask(props.column.id, props.task.id);
  }
};
</script>

<template>
  <UTooltip text="Delete task" :popper="{ arrow: true, placement: 'top' }">
    <button
      type="button"
      class="text-xs font-bold text-red-500 hover:text-red-600 transition-all"
      @click="handleDeleteTask"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </UTooltip>
</template>
