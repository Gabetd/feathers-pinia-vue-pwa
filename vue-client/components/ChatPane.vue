<script setup lang="ts">
import MessageList from './MessageList.vue'
defineProps<{ store: any }>()


</script>

<template>
<main class="flex flex-column">
  <header class="title-bar flex flex-row flex-center">
    <div class="title-wrapper block center-element">
    {{
      store.holiday.emojii || ''
    }} <img class="logo" crossorigin="anonymous" src="https://raw.githubusercontent.com/feathersjs/feathers/ae85fa216f12f7ff5d15e7039640e27a09989ea4/docs/public/img/feathers-logo-horizontal.svg"
        alt="Feathers"> {{store.holiday.emojii || ''}}
    </div>
  </header>

  <div class="flex flex-row flex-1 clear">
    <aside class="sidebar col col-3 flex flex-column flex-space-between">
      <header class="flex flex-row flex-center">
        <h4 class="font-300 text-center">
          <span class="font-600 online-count">{{store.userList.length}}</span> users
        </h4>
      </header>

      <ul class="flex flex-column flex-1 list-unstyled user-list">
        <li v-for="user in store.userList">
          <a class="block relative" href="#">
            <img :src="user.avatar" :alt="user.avatar" class="avatar" crossorigin="anonymous">
            <span class="absolute username">{{user.name}}</span>
          </a>
        </li>
      </ul>
      <footer class="flex flex-row flex-center">
        <a href="#" id="logout" class="button button-primary">
          Sign Out
        </a>
      </footer>
    </aside>

    <div class="flex flex-column col col-9">
      <MessageList :messages="store.messages" />
      <form class="flex flex-row flex-space-between" id="send-message">
        <input type="text" name="text" class="flex flex-1">
        <button class="button-primary" type="submit">Send</button>
      </form>
    </div>
  </div>
</main>
</template>