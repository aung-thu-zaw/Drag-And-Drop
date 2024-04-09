<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const props = defineProps<{ column: any }>();

const store = useBoardStore();

const isOpen = ref(false);
const form = reactive({
  name: ref(""),
  description: ref(""),
});

const handleAddNewTask = async () => {
  if (form.name) {
    const response = await store.addANewTask(props.column.id, form);

    if (response.status === "success") {
      isOpen.value = false;
      form.name = "";
      form.description = "";
    }
  } else {
    window.alert("You need to add task name!");
  }
};
</script>

<template>
  <UTooltip text="Add a new task" :popper="{ arrow: true, placement: 'top' }">
    <button
      type="button"
      class="text-xs font-bold border w-6 h-6 rounded-sm bg-background border-neutral-500"
      @click="isOpen = true"
    >
      <i class="fa-solid fa-plus"></i>
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
            Add A New Task
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

      <form @submit.prevent="handleAddNewTask" class="space-y-5">
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
            <i class="fa-solid fa-save"></i>
            Save
          </button>
        </div>
      </form>
    </UCard>
  </UModal>
</template>
