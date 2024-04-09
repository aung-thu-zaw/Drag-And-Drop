<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const store = useBoardStore();

const isOpen = ref(false);
const columnName = ref("");

const handleAddNewColumn = () => {
  store.addANewColumn(columnName.value);
  isOpen.value = false;
  columnName.value = "";
};
</script>

<template>
  <button
    type="button"
    class="text-sm font-bold border px-5 h-[66px] py-4 outline-none rounded-md bg-background border-neutral-500 hover:bg-secondary transition-all"
    @click="isOpen = true"
  >
    <i class="fa-solid fa-plus mr-1.5"></i>
    Add a new column
  </button>

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
            <i class="fas fa-columns mr-1.5"></i>
            Add A New Column
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

      <form @submit.prevent="handleAddNewColumn" class="space-y-5">
        <input
          type="text"
          class="px-5 py-4 rounded-md font-medium border w-full text-sm outline-none bg-secondary border-neutral-500 duration-200"
          placeholder="Enter column name ..."
          v-model="columnName"
        />

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
