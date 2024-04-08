<script lang="ts" setup>
import { useBoardStore } from "~/stores/board";

const boardStore = useBoardStore();
</script>

<template>
  {{ boardStore.board }}
</template>

<style lang="css" scoped></style>
