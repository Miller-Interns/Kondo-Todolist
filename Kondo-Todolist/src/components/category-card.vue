

<script setup lang="ts">
import { ref } from 'vue'
import type { TodoCategory } from '../types/TodoCategory';
import TodoItem from './todo-item.vue'
import { useTodo } from '../composables/useTodo'
import { Trash2 } from "lucide-vue-next"
const props = defineProps<{ category: TodoCategory }>()
const emit = defineEmits<{ (e: 'deleted', id: TodoCategory['id']): void }>()
const { deleteCategory, addItem } = useTodo()

const title = ref(props.category.title)
const newItem = ref('')

function saveTitle() {
  props.category.title = title.value
}

function remove() {
  // update store if available
  deleteCategory?.(props.category.id)
  // notify parent so it can remove the category from its reactive list immediately
  emit('deleted', props.category.id)
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
      <button class="delete-btn" @click="remove"> <Trash2 :size="18" class="delete-btn-text" />Delete</button>
        
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
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.category-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}

.title-input {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  padding: 8px 12px;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  outline: none;
  background: transparent;
  color: #333;
  transition: border-color 0.2s;
}

.title-input:focus {
  border-bottom-color: #42b883;
}

.title-input::placeholder {
  color: #999;
}

.delete-btn {
  background: #ff6b6b;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.delete-btn:hover {
  background: #ff5252;
  transform: scale(1.05);
}

.delete-btn:active {
  transform: scale(0.98);
}

.delete-btn-text {
  display: inline-flex;
}

/* Add Item Section */
.add-item {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.item-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1.5px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  background: #fafafa;
  transition: all 0.2s;
}

.item-input:focus {
  border-color: #42b883;
  background: white;
  box-shadow: 0 0 6px rgba(66, 184, 131, 0.15);
}

.item-input::placeholder {
  color: #999;
}

.add-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.add-btn:hover {
  background: #36996f;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(66, 184, 131, 0.3);
}

.add-btn:active {
  transform: translateY(0);
}

/* Items Section */
.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.items::-webkit-scrollbar {
  width: 6px;
}

.items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.items::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.items::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>