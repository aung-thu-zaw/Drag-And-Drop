import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface Tasks {
  id: number;
  name: string;
  description: string;
}

export const useBoardStore = defineStore("boardStore", () => {
  const columns = ref<any>(null);
  const column = ref<any>(null);

  const getAllColumn = async () => {
    const data = await $fetch("http://localhost:3001/columns");

    columns.value = data;
  };

  const getColumn = async (columnId: string) => {
    const data = await $fetch(`http://localhost:3001/columns/${columnId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    column.value = data;
  };

  const addANewColumn = async (columnName: string) => {
    await $fetch("http://localhost:3001/columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uuidv4(), name: columnName, tasks: [] }),
    });

    await getAllColumn();
  };

  const deleteColumn = async (columnId: string) => {
    await $fetch(`http://localhost:3001/columns/${columnId}`, {
      method: "DELETE",
    });

    await getAllColumn();
  };

  const getLastTaskId = async () => {
    await getAllColumn();

    let maxId = 0;
    columns.value.forEach((column: any) => {
      column.tasks.forEach((task: any) => {
        if (task.id > maxId) {
          maxId = task.id;
        }
      });
    });

    return maxId;
  };

  const addANewTask = async (
    columnId: string,
    taskData: { name: string; description: string }
  ) => {
    let lastTaskId = await getLastTaskId();

    const columnToUpdate = columns.value.find(
      (column: any) => column.id === columnId
    );

    if (columnToUpdate) {
      columnToUpdate.tasks.push({
        id: lastTaskId + 1,
        name: taskData.name,
        description: taskData.description,
      });
    }

    await $fetch(`http://localhost:3001/columns/${columnId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(columnToUpdate),
    });

    return { status: "success" };
  };

  const updateTask = async (
    columnId: string,
    taskId: number,
    taskData: { name: string; description: string }
  ) => {
    await getColumn(columnId);

    const taskIndex = column.value.tasks.findIndex(
      (task: { id: number }) => task.id === taskId
    );

    if (taskIndex !== -1) {
      column.value.tasks[taskIndex].name = taskData.name;
      column.value.tasks[taskIndex].description = taskData.description;

      await fetch(`http://localhost:3001/columns/${columnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(column.value),
      });

      await getAllColumn();
    } else {
      console.error("Task not found");
    }
  };

  const deleteTask = async (columnId: string, taskId: number) => {
    await getColumn(columnId);

    const taskIndex = column.value.tasks.findIndex(
      (task: { id: number }) => task.id === taskId
    );

    if (taskIndex !== -1) {
      column.value.tasks.splice(taskIndex, 1);

      await fetch(`http://localhost:3001/columns/${columnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(column.value),
      });

      await getAllColumn();
    } else {
      console.error("Task not found");
    }
  };

  return {
    columns,
    getAllColumn,
    addANewColumn,
    updateTask,
    deleteColumn,
    addANewTask,
    deleteTask,
  };
});
