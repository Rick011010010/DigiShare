<script setup lang="ts">
import { ref, watch, computed, watchEffect, onMounted, Ref } from 'vue'
import { getThirds, getThird } from '@/api/thirds'
import type { Third } from '@/api/thirds'
import { Icon } from '@iconify/vue'
const items = ref<any>([
  {
    color: '#0096C7',
    icon: 'mdi-calendar-text',
    title: 'Note',
  },
  {
    color: '#0054A6',
    icon: 'mdi-ticket-confirmation-outline',
    title: 'Tickets',
  },
  {
    color: '#0096C7',
    icon: 'mdi-chat-processing',
    title: 'Conversation',
  },
  {
    color: '#0054A6',
    icon: 'mdi-pencil-outline ',
    title: 'Origin',
  },
])

// <<<<<<<<<<< GET DATA BY ID >>>>>>>>>>
function getThirdById() {
  getThird(1).then((res) => {
    third.value = res.data
    console.log(third.value)
  })
}

onMounted(() => {
  getThirdById()
})
</script>
<template >
  <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown" class="mt-16" >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card :color="item.color" dark>
        <v-card-title class="text-h6"> {{ item.title }} </v-card-title>
        <v-card-text class="white text--primary">
          <p>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at. Est et nobis
            iisque percipit, an vim zril disputando voluptatibus, vix an
            salutandi sententiae.
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

