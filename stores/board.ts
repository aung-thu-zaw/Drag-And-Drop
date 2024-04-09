import { defineStore } from "pinia";

interface Tasks {
  id: number;
  name: string;
  description: string;
}

export const useBoardStore = defineStore("boardStore", () => {
  const columns = ref<any>(null);

  const getAllColumn = async () => {
    const data = await $fetch("http://localhost:3001/columns");

    columns.value = data;
  };

  return { columns, getAllColumn };
});
