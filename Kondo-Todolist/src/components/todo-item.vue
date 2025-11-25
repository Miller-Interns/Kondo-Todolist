<template>
<div class="item">
<input type="checkbox" :checked="item.done" @change="toggle" />
<span :class="{ done: item.done }">{{ item.text }}</span>
<button @click="remove">Delete</button>
</div>
</template>


<script setup lang="ts">
import type { TodoItem } from '../types/TodoItem'
import { useTodo } from '../composables/useTodo'


const props = defineProps<{ item: TodoItem; categoryId: string }>()
const { toggleItem, deleteItem } = useTodo()


function toggle() {
toggleItem(props.categoryId, props.item.id)
}


function remove() {
deleteItem(props.categoryId, props.item.id)
}
</script>


<style scoped>
.done{text-decoration:line-through;color:gray}
</style>