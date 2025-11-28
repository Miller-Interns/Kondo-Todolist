<template>
  <div class="item" :class="{ done: item.done }">
    <label v-if="!editing" class="check-wrapper">
      <input type="checkbox" :checked="item.done" @change="toggle" />
      <span class="checkmark"></span>
    </label>

    <!-- Text or edit input -->
    <template v-if="editing">
      <input class="edit-input" 
             v-model="editText" 
             @keyup.enter="saveEdit" 
             @keyup.esc="cancelEdit" 
             @blur="saveEdit"
             ref="editInput" />
    </template>
    <template v-else>
      <span class="text">{{ item.text }}</span>
    </template>

    <!-- Edit / Save / Cancel buttons -->
    <button v-if="!editing" 
            class="edit-btn" 
            @click="startEdit">
      <Pencil :size="18" /> &nbsp; Edit
    </button>
    <div v-else class="edit-actions">
      <button class="save-btn" 
              @click="saveEdit">Save</button>
      <button class="cancel-btn" 
              @click="cancelEdit">Cancel</button>
    </div>

    <button class="delete-btn" 
            @click="remove">
      <Trash2 :size="18" />
    </button>
  </div>
</template>


<script setup lang="ts">
import type { TodoItem } from '../types/TodoItem'
import { useTodo } from '../composables/use-todo'
import { Trash2, Pencil } from "lucide-vue-next"
import { ref, nextTick } from 'vue'
const props = defineProps<{ item: TodoItem; categoryId: string }>()

const { toggleItem, deleteItem, updateItem } = useTodo()

const editing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement | null>(null)

function toggle() {
  toggleItem(props.categoryId, props.item.id)
}

function remove() {
  deleteItem(props.categoryId, props.item.id)
}

function startEdit() {
  editing.value = true
  editText.value = props.item.text
  // focus input after it's rendered
  nextTick(() => {
    editInput.value?.focus()
    // move cursor to end
    if (editInput.value) {
      const val = editInput.value.value
      editInput.value.setSelectionRange(val.length, val.length)
    }
  })
}

function saveEdit() {
  const text = editText.value.trim()
  if (!text) {
    // don't save empty text; keep editing
    return
  }
  updateItem(props.categoryId, props.item.id, text)
  editing.value = false
}

function cancelEdit() {
  editing.value = false
  editText.value = ''
}
</script>


<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f8f8f8;
  margin-bottom: 10px;
  transition: background 0.3s, transform 0.3s;
}

.item.done {
  background: #e6ffe6;
  transform: scale(0.98);
}

/* TEXT ANIMATION */
.text {
  flex: 1;
  transition: color 0.3s, opacity 0.3s, text-decoration-color 0.3s;
}

.item.done .text {
  color: gray;
  opacity: 0.7;
  text-decoration: line-through;
}

/* CUSTOM CHECKBOX */
.check-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
}

.check-wrapper input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: white;
  border: 2px solid #aaa;
  border-radius: 6px;
  transition: all 0.3s;
}

.check-wrapper input:checked+.checkmark {
  background-color: #4caf50;
  border-color: #4caf50;
}

.checkmark::after {
  content: "";
  position: absolute;
  display: none;
}

/* Checkmark tick */
.check-wrapper input:checked+.checkmark::after {
  display: block;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

/* Delete Button */
.delete-btn {
  background: transparent;
  border: none;
  color: #ff5c5c;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  transition: transform 0.2s, color 0.2s;
}

.delete-btn:hover {
  transform: scale(1.2);
  color: #ff1a1a;
}

/* Edit input and buttons */
.edit-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  outline: none;
  background: #fff;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
}

.edit-input:focus {
  border-color: #42b883;
  box-shadow: 0 6px 18px rgba(66, 184, 131, 0.12);
}

.edit-btn {
  background: transparent;
  border: none;
  color: #666;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.12s, transform 0.08s, color 0.12s;
}

.edit-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
  color: #333;
}

.edit-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.save-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.12);
}

.save-btn:hover {
  background: #36996f;
}

.cancel-btn {
  background: transparent;
  border: 1px solid #e9e9e9;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #555;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.03);
}
</style>
