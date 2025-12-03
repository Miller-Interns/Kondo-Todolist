
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function go() {
  router.push({name: 'todo-app'})
}
</script>

<template>
  <div class="bg">
    <div class="card">
      <h1>Kian A. Kondo</h1>
      <p class="meta">Exercise Started: November 23, 2025</p>
      <button @click="go" class="todo">Go to App</button>
    </div>
  </div>
</template>


.
<style>
/* global reset so the page background touches the viewport edges */
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
/* page background - center everything */
.bg {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #acbe68 0%, #65b662 100%);
}

/* card that holds the content */
.card {
  width: 100%;
  max-width: 640px;
  padding: 36px;
  border-radius: 14px;
  background: linear-gradient(135deg, #e2eeb5 0%, #b6f7b3 100%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(12px);
}

/* title */
h1 {
  margin: 0 0 10px;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: #222;
  letter-spacing: -0.6px;
}

/* meta / description */
.meta {
  margin: 0 0 26px;
  color: #5f6b75;
  font-weight: 500;
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  line-height: 1.4;
}

/* primary button */
.todo {
  margin-top: 6px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background: #42b883;
  color: white;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 6px 18px rgba(66, 184, 131, 0.18);
}

.todo:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 26px rgba(66, 184, 131, 0.22);
}

.todo:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(66, 184, 131, 0.16);
}

/* responsive tweaks */
@media (max-width: 480px) {
  .card {
    padding: 20px;
    border-radius: 12px;
  }

  .todo {
    width: 100%;
    padding: 12px;
    font-size: 0.95rem;
  }
}
</style>