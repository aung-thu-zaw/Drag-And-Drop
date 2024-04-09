<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const props = defineProps<{ column: any }>();

const store = useBoardStore();

const handleDeleteColumn = (columnId: string) => {
  if (
    window.confirm("Are you sure you want to proceed?") &&
    props.column.name !== "Todo"
  ) {
    store.deleteColumn(columnId);
  }
};
</script>

<template>
  <UTooltip text="Delete column" :popper="{ arrow: true, placement: 'top' }">
    <button
      type="button"
      class="text-xs font-bold border w-6 h-6 rounded-sm bg-red-600 border-red-300"
      @click="handleDeleteColumn(column.id)"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </UTooltip>
</template>
