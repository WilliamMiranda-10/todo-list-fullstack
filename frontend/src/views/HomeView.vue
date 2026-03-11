<template>
  <v-container class="d-flex justify-center">
    <v-card max-width="800" width="100%">
      <v-card-title class="text-center text-h5 font-weight-bold mt-5">📝 TODO LIST </v-card-title>
      <v-card-text>
        <TaskForm v-model:tarefa="tarefa" :editando="editando" @submit="addTarefa" />

        <v-row class="text-center mt-4">
          <v-col>
            <div class="text-caption">Total</div>
            <v-badge color="blue" :content="totalTarefas" />
          </v-col>
          <v-col>
            <div class="text-caption">Concluídas</div>
            <v-badge color="success" :content="tarefasConcluidas" />
          </v-col>

          <v-col>
            <div class="text-caption">Pendentes</div>
            <v-badge color="error" :content="tarefasPendentes" />
          </v-col>

          <v-progress-linear class="mt-4" height="8" color="success" :model-value="porcentagem">
          </v-progress-linear>
        </v-row>

        <TaskFilters v-model:filtro="filtro" />
        <v-row justify="center" class="mt-4" v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
        <TaskLists
          v-else
          :tarefasFiltradas="tarefasFiltradas"
          @editar="editar"
          @deletarTarefa="deletarTarefa"
          @toggle="toggleConcluida"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskLists from '@/components/TaskLists.vue'
import { getTasks, createTask, updateTask, deleteTask } from '@/services/taskService.js'

const todasTarefas = ref([])

const filtro = ref('todas')
const tarefa = ref('')

const editando = ref(false)
const tarefaEditandoId = ref(null)
const loading = ref(true)

onMounted(async () => {
  const response = await getTasks()
  todasTarefas.value = response.data
  loading.value = false
})

const tarefasFiltradas = computed(() => {
  if (filtro.value === 'concluidas') {
    return todasTarefas.value.filter((t) => t.concluida)
  }
  if (filtro.value === 'pendentes') {
    return todasTarefas.value.filter((t) => !t.concluida)
  }
  return todasTarefas.value
})

const totalTarefas = computed(() => {
  return todasTarefas.value.length
})

const tarefasConcluidas = computed(() => {
  return todasTarefas.value.filter((t) => t.concluida).length
})

const tarefasPendentes = computed(() => {
  return todasTarefas.value.filter((t) => !t.concluida).length
})

const porcentagem = computed(() => {
  if (todasTarefas.value.length === 0) {
    return 0
  }
  return (tarefasConcluidas.value / todasTarefas.value.length) * 100
})

const addTarefa = async () => {
  if (!tarefa.value.trim()) return

  if (editando.value) {
    await updateTask(tarefaEditandoId.value, {
      titulo: tarefa.value,
      concluida: false,
    })

    editando.value = false
    tarefaEditandoId.value = null
  } else {
    await createTask({
      titulo: tarefa.value,
      descricao: '',
      concluida: false,
    })
  }

  tarefa.value = ''

  const response = await getTasks()
  todasTarefas.value = response.data
}
const editar = (task) => {
  editando.value = true
  tarefa.value = task.titulo
  tarefaEditandoId.value = task.id
}

const deletarTarefa = async (id) => {
  if (!confirm('Deseja deletar esta tarefa?')) return

  await deleteTask(id)
  const response = await getTasks()
  todasTarefas.value = response.data
}

const toggleConcluida = async (task) => {
  await updateTask(task.id, {
    titulo: task.titulo,
    concluida: !task.concluida,
  })

  const response = await getTasks()
  todasTarefas.value = response.data
}
</script>
