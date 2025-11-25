<template>
<div class="center">
<h1>Kian A. Kondo</h1>
<p>Started: November 23, 2025</p>
<button @click="go" class="todo">Go to App</button>
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
.center{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100vh}

.todo{
    margin-top:20px;
    padding:10px 20px;
    font-size:16px;
    cursor:pointer;
    border-radius: 8px; /* small curve */

}
.todo:hover{
    transform: translateY(-4px); /* moves up (floating) */
  box-shadow: 0 8px 20px rgba(0,0,0,0.25); /* bigger shadow = floating */
}
</style>