<script setup lang="ts">

defineProps<{ messages: any }>()

</script>

<template >
  <main class="chat flex flex-column flex-1 clear">
    <div v-for="message in messages" 
      :class="{['messageId-' + message.id]: 1}" 
      class="message flex flex-row">
      <img :src="message.user.avatar" :alt="message.user.name" class="avatar" crossorigin="anonymous">
      <div class="message-wrapper">
        <p class="message-header"> {{message.userName}}
          <span class="sent-date font-300">{{message.prettyD}}</span>
        </p>
        <a v-if="message.anchor" href={{message.anchor}}>
          <p class="${contentClass} font-300">{{message.text}}</p>
        </a>
        <p v-else class="${contentClass} font-300">{{message.text}}</p>
      </div>
    </div>
  </main>
</template>