import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../pages/Welcome.vue'
import TodoApp from '../pages/todo-app.vue'


const routes = [
{ path: '/', name: 'Welcome', component: Welcome },
{ path: '/app', name: 'App', component: TodoApp }
]


const router = createRouter({
history: createWebHistory(),
routes
})


export default router