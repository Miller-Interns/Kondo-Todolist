


<script setup lang="ts">
import { ref } from 'vue'
import type { TodoCategory } from '../types/TodoCategory';
import TodoItem from './todo-item.vue'
import { useTodo } from '../composables/useTodo'


const props = defineProps<{ category: TodoCategory }>()
const { deleteCategory, addItem } = useTodo()


const title = ref(props.category.title)
const newItem = ref('')


function saveTitle() {
props.category.title = title.value
}


function remove() {
deleteCategory(props.category.id)
}


function add() {
addItem(props.category.id, newItem.value)
newItem.value = ''
}
</script>
<template>
  <div class="category-card">
    <!-- Category Header -->
    <div class="header">
      <input
        class="title-input"
        v-model="title"
        @blur="saveTitle"
      />
      <button class="delete-btn" @click="remove">✖</button>
    </div>

    <!-- Add New Item -->
    <div class="add-item">
      <input
        class="item-input"
        v-model="newItem"
        @keyup.enter="add"
        placeholder="Add new item..."
      />
      <button class="add-btn" @click="add">Add</button>
    </div>

    <!-- Items List -->
    <div class="items">
      <todo-item
        v-for="i in category.items"
        :key="i.id"
        :item="i"
        :category-id="category.id"
      />
    </div>
  </div>
</template>

<style scoped>
.category-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title-input {
  flex: 1;
  font-size: 18px;
  padding: 5px 8px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
}

.title-input:focus {
  border-bottom-color: #42b883;
}

.delete-btn {
  background: #ff4d4d;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.delete-btn:hover {
  background: #d93636;
}

/* Add Item Section */
.add-item {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.item-input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.add-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.add-btn:hover {
  background: #36996f;
}

/* Items Section */
.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>