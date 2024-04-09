<script lang="ts" setup>
import Task from "~/components/Task.vue";
import AddTaskButton from "~/components/AddTaskModal.vue";
import DeleteColumnButton from "~/components/DeleteColumnButton.vue";

defineProps<{ column: any }>();
</script>

<template>
  <div class="w-full">
    <UContainer
      class="bg-secondary p-5 rounded-md border border-neutral-500 space-y-3.5"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-sm font-bold text-gray-200">
          {{ column.name }}
        </h1>

        <div class="flex items-center space-x-3">
          <AddTaskButton v-if="column.name === 'Todo'" :column="column" />

          <DeleteColumnButton v-if="column.name !== 'Todo'" :column="column" />
        </div>
      </div>

      <div v-if="column.tasks.length" class="space-y-3.5">
        <Task
          v-for="task in column.tasks"
          :key="task.id"
          :column="column"
          :task="task"
        />
      </div>

      <div v-else class="p-8">
        <p
          class="text-xs font-bold text-center text-gray-400 bg-background rounded-sm px-5 py-3 border border-neutral-500"
        >
          <i class="fa-solid fa-tasks mr-1.5"></i>
          There are no tasks.
        </p>
      </div>
    </UContainer>
  </div>
</template>
