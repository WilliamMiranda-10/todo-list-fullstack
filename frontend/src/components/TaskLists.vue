<template>
  <v-alert v-if="tarefasFiltradas.length === 0" type="info" class="mt-4">
    Nenhuma tarefa encontrada
  </v-alert>

  <v-list v-else class="mt-4" lines="one" density="comfortable">
    <transition-group name="list">
      <v-list-item v-for="tarefa in tarefasFiltradas" :key="tarefa.id">
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              color="success"
              :model-value="tarefa.concluida"
              @update:model-value="$emit('toggle', tarefa)"
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title
          :class="{ 'text-decoration-line-through  text-grey-darken-1': tarefa.concluida }"
          >{{ tarefa.titulo }}</v-list-item-title
        >

        <template v-slot:append>
          <v-btn
            color="primary"
            icon="mdi-pencil"
            variant="text"
            @click="$emit('editar', tarefa)"
          ></v-btn>
          <v-btn
            color="error"
            icon="mdi-delete"
            variant="text"
            density="comfortable"
            @click="$emit('deletarTarefa', tarefa.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </transition-group>
  </v-list>
</template>

<script setup>
defineProps({
  tarefasFiltradas: Array,
})

defineEmits(['editar', 'deletarTarefa', 'toggle'])
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
