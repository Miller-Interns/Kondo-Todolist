

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
      <button class="delete-btn" @click="remove" aria-label="Delete category" title="Delete category">
        <Trash2 :size="16" /> Delete
      </button>
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
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
  z-index: 0;
}

.category-card:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.8);
  z-index: 5;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}


.title-input {
  flex: 1 1 auto;
  min-width: 0; /* allow to shrink inside flex */
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 600;
  /* ensure the input content doesn't sit under the absolute delete button */
  padding: 8px 12px;
  padding-right: 72px;
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
  position: static; /* remove absolute positioning */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #ff6b6b;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}


.delete-btn:hover {
  background: #ff5252;
  transform: scale(1.06);
  box-shadow: 0 6px 18px rgba(255,82,82,0.18);
}

.delete-btn:active {
  transform: scale(0.96);
}


/* Add Item Section */
.add-item {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
}

.item-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1.5px solid #e0e0e0;
  /* ensure the input content doesn't sit under the absolute delete button */
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  padding-right: calc(var(--delete-offset) + 8px);
  transition: font-size 0.12s ease, padding 0.12s ease;
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
  min-width: 56px;
  padding: 6px 10px;
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

@media (max-width: 900px) {
  .header {
    --delete-offset: 56px;
    gap: 8px;
  }

  .title-input {
    font-size: 16px;
    padding: 6px 8px;
  }

  .delete-btn {
    min-width: 44px;
    padding: 6px 8px;
    font-size: 12px;
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 420px) {
  .header {
    --delete-offset: 48px;
  }

  .title-input {
    font-size: 15px;
    padding: 6px 6px;
  }

  .delete-btn {
    min-width: 40px;
    padding: 6px 6px;
    font-size: 12px;
  }
}
</style>