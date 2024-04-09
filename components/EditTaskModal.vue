<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const props = defineProps<{ column: any; task: any }>();

const store = useBoardStore();

const isOpen = ref(false);
const form = reactive({
  name: ref(props.task.name),
  description: ref(props.task.description),
});

const handleEditTask = async () => {
  if (form.name) {
    await store.updateTask(props.column.id, props.task.id, form);
    isOpen.value = false;
    form.name = props.task.name;
    form.description = props.task.description;
  } else {
    window.alert("You need to add task name!");
  }
};
</script>

<template>
  <UTooltip text="Edit task" :popper="{ arrow: true, placement: 'top' }">
    <button
      type="button"
      class="text-xs font-bold text-gray-300 hover:text-gray-400 transition-all"
      @click="isOpen = true"
    >
      <i class="fa-solid fa-edit"></i>
    </button>
  </UTooltip>

  <UModal v-model="isOpen" prevent-close :overlay="false">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
      class="bg-background border border-neutral-500"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6">
            <i class="fa-solid fa-tasks mr-1.5"></i>
            Edit Task
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <form @submit.prevent="handleEditTask" class="space-y-5">
        <input
          type="text"
          class="px-5 py-4 rounded-md font-medium border w-full text-sm outline-none bg-secondary border-neutral-500 duration-200"
          placeholder="Enter task name ..."
          v-model="form.name"
        />

        <textarea
          cols="30"
          rows="6"
          class="px-5 py-4 rounded-md font-medium border w-full text-sm outline-none bg-secondary border-neutral-500 duration-200"
          placeholder="Enter task description ..."
          v-model="form.description"
        ></textarea>

        <div class="flex items-center justify-end">
          <button
            type="submit"
            class="px-6 py-3 rounded-md text-xs font-bold border border-neutral-500 hover:bg-secondary transition-all"
          >
            <i class="fa-solid fa-screwdriver-wrench"></i>
            Save Changes
          </button>
        </div>
      </form>
    </UCard>
  </UModal>
</template>
