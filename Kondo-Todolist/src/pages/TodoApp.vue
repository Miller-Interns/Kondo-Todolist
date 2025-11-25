<script setup lang="ts">
import { ref } from 'vue'
import CategoryCard from '../components/category-card.vue'
import { useTodo } from '../composables/useTodo'

const { categories, addCategory } = useTodo()
const newCat = ref('')

function createCategory() {
  if (!newCat.value.trim()) return
  addCategory(newCat.value)
  newCat.value = ''
}
</script>

<template>
  <div class="app-container">

    <!-- Page Title -->
    <h2 class="header">My TODO Categories</h2>

    <!-- Create Category UI -->
    <div class="add-category">
      <input
        v-model="newCat"
        placeholder="Enter category name..."
        @keyup.enter="createCategory"
        class="add-input"
      />
      <button class="add-btn" @click="createCategory">Add</button>
    </div>

    <!-- Category Cards -->
    <div class="cards-container">
      <category-card
        v-for="c in categories"
        :key="c.id"
        :category="c"
      />
    </div>

  </div>
</template>

<style scoped>
/* Full page layout */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  min-height: 100vh;
  background: #f7f7f7;
}

/* Header Title */
.header {
  font-size: 40px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Avenir', Helvetica, sans-serif;
}

/* Add Category Section */
.add-category {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 400px;
}

.add-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: 0.2s;
}

.add-input:focus {
  border-color: #42b883;
  outline: none;
  box-shadow: 0 0 4px rgba(66, 184, 131, 0.4);
}

.add-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.add-btn:hover {
  background: #36996f;
}

/* Category Cards Layout */
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
}
</style>
