import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getTasks = () => {
  return api.get('/tarefas')
}

export const createTask = (task) => {
  return api.post('/tarefas', task)
}

export const updateTask = (id, task) => {
  return api.put(`/tarefas/${id}`, task)
}

export const deleteTask = (id) => {
  return api.delete(`/tarefas/${id}`)
}
