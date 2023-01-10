<script setup lang="ts">
import { ref, watch, computed, watchEffect, onMounted, Ref } from 'vue'
import { getThirds, getThird } from '@/api/thirds'
import type { Third } from '@/api/thirds'
import { Icon } from '@iconify/vue'
import { type } from 'os'
const third = ref<Third>()
const eventTyps: Record<
  string,
  { color: string; icon: string; title: string }
> = {
  created: {
    color: '#0054A6',
    icon: 'mdi-pencil-outline ',
    title: 'Created at:',
  },
  updated: {
    color: '#0054A6',
    icon: 'mdi-update ',
    title: 'Update at:',
  },
  tickets: {
    color: '#0096C7',
    icon: 'mdi-ticket-confirmation-outline',
    title: 'Tickets:',
  },
  note: {
    color: '#0096b1',
    icon: 'mdi-calendar-text',
    title: 'Note',
  },
}
// const items = ref<any>([
//   {
//     color: '#0096C7',
//     icon: 'mdi-calendar-text',
//     title: 'Note',
//   },
//   {},
//   {
//     color: '#0054A6',
//     icon: 'mdi-ticket-confirmation-outline',
//     title: 'Tickets',
//   },
//   {
//     color: '#0096C7',
//     icon: 'mdi-chat-processing',
//     title: 'Conversation',
//   },
//   {},
// ])

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
type EventItemType = {
  key: string
  date: string
  title: string
  details?: object
}
const events = computed(() => {
  if (!third.value) {
    return
  }
  const noteEvent: EventItemType[] = (third.value?.note ?? []).map((t) => ({
    key: 'note',
    title: 'Note',
    date: t.date,
    details: t,
    name: t.name,
    content: t.content,
  }))
  const ticketEvent: EventItemType[] = (third.value?.tickets ?? []).map(
    (t) => ({
      key: 'tickets',
      title: 'Ticket was created at',
      date: t.date,
      details: t,
      name: t.name,
      status: t.status,
      channel: t.channel,
    })
  )
  const thirdEvent: EventItemType[] = [
    { key: 'created', date: third.value!.created_at, title: 'Created at' },
    { key: 'updated', date: third.value!.updated_at, title: 'updated at' },
  ]
  console.log(ticketEvent, 'tetddd')
  return [...ticketEvent, ...thirdEvent, ...noteEvent]
    .sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date)
    })
    .map((e) => ({ ...e, style: eventTyps[e.key] }))
})
</script>
<template >
  <v-timeline align-top dense class="mt-16">
    <v-timeline-item
      v-for="(event, i) in events"
      :key="i"
      :color="event.style.color"
      :icon="event.style.icon"
      fill-dot
    >
      <v-card :color="event.style.color" dark>
        <v-card-title class="text-h6 d-flex justify-space-between">
          {{ event.title }}:
          <div class="text-right">
            <v-icon>mdi-calendar-range</v-icon> {{ event.date.slice(0, 10) }}-
            <v-icon>mdi-clock-outline</v-icon>{{ event.date.slice(11, 19) }}
          </div>
          <template v-if="event.key === 'tickets'">
            <div>
              <v-icon v-if="event.channel === 'SMS'" large>
                mdi-message-processing</v-icon
              ><v-icon v-if="event.channel === 'whatsapp'" large
                >mdi-whatsapp</v-icon
              ><v-icon v-if="event.channel === 'messenger'" large
                >mdi-facebook-messenger</v-icon
              >
            </div>
            <div>Status: {{ event.status }}</div>
          </template>
        </v-card-title>
        <v-card-text class="white text--primary" v-if="event.key === 'note'">
          <template>
            <p>{{ event.content }}</p>
            <div>

            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

