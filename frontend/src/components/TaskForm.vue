<template>
  <v-form class="mt-5" @submit.prevent="$emit('submit')" validate-on="submit">
    <v-row class="align-start">
      <v-col>
        <v-text-field
          variant="outlined"
          label="Escreva sua tarefa"
          :model-value="tarefa"
          @update:model-value="$emit('update:tarefa', $event)"
          :rules="[(v) => !!v || 'Campo obrigatório']"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col cols="auto" class="pt-1">
        <v-btn
        :disabled="!tarefa"
          color="success"
          type="submit"
          :icon="editando ? 'mdi-content-save' : 'mdi-plus'"
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  tarefa: String,
  editando: Boolean,
})

defineEmits(['update:tarefa', 'submit'])
</script>
