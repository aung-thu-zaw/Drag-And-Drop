<script lang="ts" setup>
import BoardColumn from "~/components/BoardColumn.vue";
import AddColumnModal from "~/components/AddColumnModal.vue";
import { useBoardStore } from "~/stores/board";

const store = useBoardStore();

const { columns } = storeToRefs(store);

onMounted(() => store.getAllColumn());
</script>

<template>
  <div class="flex items-start justify-between min-h-screen p-10">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <BoardColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
      />

      <AddColumnModal />
    </div>
  </div>
</template>
