<script setup lang="ts">
import { ref } from 'vue'
import CategoryCard from '../components/category-card.vue'
import { useTodo } from '../composables/use-todo'
import { Plus, Home } from "lucide-vue-next"
import { useRouter } from 'vue-router'

const router = useRouter()
const todo = useTodo()
const newCat = ref('')

function createCategory() {
  if (!newCat.value.trim()) return
  todo.addCategory(newCat.value)
  newCat.value = ''
}

function onCategoryDeleted(id: string) {
  const index = todo.categories.findIndex(c => c.id === id)
  if (index > -1) {
    todo.categories.splice(index, 1)
  }
}
function homePage() {
  router.push({name: 'Welcome'})
}
</script>


<template>
  <div class="welcome-navigation">
    <button @click="homePage">
      <Home :size="18" /> Homepage
    </button>
  </div>
  <div class="app-container">
    <h2 class="header">TODO Categories</h2>
    <h3 class="description">Create your todo list and add the tasks you want to complete. <br />
      Click the checkbox when a task is done, click the pencil icon to edit it,<br />
      and click trash button if you want to remove the task.</h3>
    <div class="add-category">
      <input v-model="newCat" placeholder="Enter category name..." @keyup.enter="createCategory" class="add-input" />

      <button class="add-btn" @click="createCategory" @keyup.enter="createCategory">
        <Plus :size="18" /> Add
      </button>
    </div>

    <div class="cards-container">
      <category-card v-for="c in todo.categories" :key="c.id" :category="c" @deleted="onCategoryDeleted" />
    </div>
  </div>
</template>

<style scoped>
.welcome-navigation {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.welcome-navigation button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.welcome-navigation button:hover {
  background: #f9f9f9;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.welcome-navigation button:active {
  transform: translateY(0);
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40px 20px;
   background: linear-gradient(135deg, #e1f0ab 0%, #96f192 100%);
  background-size: 400% 400%;
  background-attachment: fixed;
}

.header {
  font-size: 48px;
  font-weight: bold;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif;
  margin-bottom: 40px;
  color: #333;
  text-align: center;
}

.description {
  max-width: 900px;
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 30px;
  font-weight: 400;
  text-align: center;
  opacity: 0.9;
  letter-spacing: -0.3px;
}

.add-category {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 500px;
}

.add-input {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background: white;
}

.add-input:focus {
  border-color: #42b883;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.2);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #36996f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.add-btn:active {
  transform: translateY(0);
}

.cards-container {
  display: grid;
  /* better breathing room and responsive columns */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  column-gap: 40px;
  row-gap: 40px;
  width: 100%;
  max-width: 1600px;
  margin-top: 20px;
  padding: 0 28px;
  align-items: start;
  /* keep cards top-aligned to avoid overlap */
  justify-items: stretch;
  /* make cards fill their grid cell */
  grid-auto-rows: auto;
}

@media (max-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 36px;
    row-gap: 36px;
    padding: 0 16px;
  }
}

@media (max-width: 900px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    column-gap: 28px;
    row-gap: 28px;
    padding: 0 12px;
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 20px;
    padding: 0 10px;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 20px 15px;
  }

  .header {
    font-size: 36px;
    margin-bottom: 30px;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
    padding: 0 10px;
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .add-category {
    flex-direction: column;
  }
}
</style>