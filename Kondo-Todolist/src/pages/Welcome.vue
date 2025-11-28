<template>
  <div class="bg">
    <div class="center">
      <h1>Kian A. Kondo</h1>
      <p>Exercise Started: November 23, 2025</p>
      <button @click="go" class="todo">Go to App</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()



function go() {
  router.push('/app')
}
</script>


<style scoped>
.bg {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;

}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  font-weight: 500;
}

.todo {
  margin-top: 20px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: #42b883;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.todo:hover {
  background: #36996f;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.3);
}

.todo:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.2);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }

  .todo {
    padding: 12px 28px;
    font-size: 15px;
  }
}
</style>