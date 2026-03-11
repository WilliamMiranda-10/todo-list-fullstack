<template>
  <v-row justify="center">
    <v-btn-toggle
      :model-value="filtro"
      @update:model-value="$emit('update:filtro', $event)"
      mandatory
      color="blue"
    >
      <v-btn color="primary" value="todas">Todas</v-btn>
      <v-btn color="warning" value="pendentes">Pendentes </v-btn>
      <v-btn color="success" value="concluidas">Concluídas </v-btn>
    </v-btn-toggle>
  </v-row>
</template>

<script setup>
defineProps({
  filtro: String,
})

defineEmits(['update:filtro'])
</script>
