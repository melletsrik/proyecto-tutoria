<script setup>
import '@/assets/estilos/MenuCard.css';

defineProps(['icon', 'text']);
</script>


<template>
  <div class="card">
    <i class="material-icons">{{ icon }}</i>
    <p>{{ text }}</p>
  </div>
</template>
