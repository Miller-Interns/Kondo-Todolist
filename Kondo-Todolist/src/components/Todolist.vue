<script setup lang="ts">
import { useRouter } from 'vue-router'
//import { ref, onMounted } from 'vue'


const router = useRouter()


const goToApp = () => {
router.push('/app')
}
</script>

<template>
<div class="landing-container">
<h1 class="title">Kian A. Kondo</h1>
<p class="subtitle">Exercise Started: November 23 2025</p>
<button class="go-btn" @click="goToApp">Go to app</button>
</div>
</template>

<style scoped>
.landing-container {
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
}


.title {
font-size: 3rem;
font-weight: bold;
margin-bottom: 10px;
}


.subtitle {
font-size: 1.2rem;
margin-bottom: 20px;
}


.go-btn {
background-color: #3b82f6;
padding: 10px 20px;
border-radius: 5px;
color: white;
font-size: 1.1rem;
cursor: pointer;
border: none;
}


.go-btn:hover {
background-color: #2563eb;
}
</style>
