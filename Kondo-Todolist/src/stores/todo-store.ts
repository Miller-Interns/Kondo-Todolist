import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { TodoCategory } from '../types/TodoCategory'


export const useTodoStore = defineStore('todo', () => {
const categories = ref<TodoCategory[]>(JSON.parse(localStorage.getItem('todo_data') || '[]'))


watch(categories, () => {
localStorage.setItem('todo_data', JSON.stringify(categories.value))
}, { deep: true })


return { categories }
})