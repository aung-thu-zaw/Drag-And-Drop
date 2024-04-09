<script lang="ts" setup>
import DeleteTaskButton from "~/components/DeleteTaskButton.vue";

defineProps<{ column: any; task: any }>();
</script>

<template>
  <div>
    <UCard
      class="bg-background rounded-sm outline-none h-20 flex flex-col items-start justify-center ring-0 border border-neutral-500 text-sm"
    >
      <div
        class="flex items-center justify-between w-full"
        :class="{ 'mb-2': task.description }"
      >
        <h1 class="text-sm font-bold w-full">
          {{ task.name }}
        </h1>

        <div class="flex items-center justify-between space-x-3 ml-3">
          <EditTaskModal :column="column" :task="task" />

          <DeleteTaskButton :column="column" :task="task" />
        </div>
      </div>

      <p class="text-xs line-clamp-1 text-gray-400 w-full">
        {{ task.description }}
      </p>
    </UCard>
  </div>
</template>
