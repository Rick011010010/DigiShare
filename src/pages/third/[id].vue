<script setup lang="ts">
import { ref, watch, computed, watchEffect, onMounted, Ref } from 'vue'
import { getThirds, getThird } from '@/api/thirds'
import type { Third } from '@/api/thirds'
import userDetailsVue from './components/userDetails.vue'
import timelineVue from './components/timeline.vue'
import activityVue from './components/activity.vue'
import campaignsVue from './components/campaigns.vue'
import interactionsVue from './components/interactions.vue'
import platformLinksVue from './components/platformLinks.vue'
import attachementVue from './components/attachement.vue'

const route = useRoute()
const third: Ref<Third> = ref({})
// <<<<<<<<<<<<<<<< GET DATA BY ID >>>>>>>>>>>>

function getThirdById() {
  getThird(+route.params.id).then((res) => (third.value = res.data))
}

onMounted(() => {
  getThirdById()
})
</script>
<template>
  <v-app id="inspire">
    <v-row class="mt-2">
      <v-col cols="3">
        <userDetailsVue />
      </v-col>

      <v-col cols="9">
        <v-tabs fixed-tabs>
          <v-tab>Timeline</v-tab>
          <v-tab>Activity</v-tab>
          <v-tab>Interactions</v-tab>
          <v-tab>Campaigns</v-tab>
          <v-tab>Platform links </v-tab>
          <v-tab>Attachments</v-tab>
          <v-tab-item><timelineVue /></v-tab-item>
          <v-tab-item><activityVue /></v-tab-item>
          <v-tab-item><interactionsVue /></v-tab-item>
          <v-tab-item><campaignsVue /></v-tab-item>
          <v-tab-item><platformLinksVue /></v-tab-item>
          <v-tab-item><attachementVue /></v-tab-item>
        </v-tabs>


      </v-col>
    </v-row>
  </v-app>
</template>
<style></style>

<route lang="json">
{
  "meta": {
    "title": "third/view12",
    "icon": "$mdi-web",
    "roles": ["admin"],
    "dataCy": "userManage"
  },
  "name": "thirdView"

}
</route>
