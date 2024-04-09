<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const store = useBoardStore();
const { columns } = storeToRefs(store);

onMounted(() => store.getAllColumn());
</script>

<template>
  <div class="flex items-start justify-between min-h-screen p-10 space-x-5">
    <div v-for="(column, index) in columns" :key="index" class="w-full">
      <UContainer
        class="bg-secondary p-5 rounded-md border border-neutral-500 space-y-3.5"
      >
        <h1 class="text-sm font-bold text-gray-200">
          <span v-if="column.name === 'Todo'" class="mr-1.5">
            <i class="fas fa-tasks"></i>
          </span>
          <span v-else-if="column.name === 'In Progress'" class="mr-1.5">
            <i class="fas fa-spinner"></i>
          </span>
          <span v-else-if="column.name === 'Complete'" class="mr-1.5">
            <i class="fas fa-check-circle"></i>
          </span>
          <span v-else-if="column.name === 'Review'" class="mr-1.5">
            <i class="fas fa-eye"></i>
          </span>
          {{ column.name }}
        </h1>

        <div v-for="(task, index) in column.tasks" :key="index">
          <UCard
            class="bg-background rounded-sm outline-none h-16 flex items-center justify-start ring-0 border border-neutral-500 text-sm"
          >
            {{ task.name }}
          </UCard>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
