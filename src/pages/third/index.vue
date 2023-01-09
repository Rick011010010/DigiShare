<script setup lang="ts">
// <<<<<<<<<<<<<<<<<<<< THIRD >>>>>>>>>>>>>>>>>>

import { ref, watch, computed, watchEffect } from 'vue'

import type { Third } from '@/api/thirds'
import { getThirds, getThird } from '@/api/thirds'
const thirdData = ref<Third[]>([])
const thirdDataById = ref()
const lding = ref(true)
const router = useRouter()
getThirds()
  .then((promise) => (thirdData.value = promise.data))
  .finally(() => {
    lding.value = false
  })
console.log(thirdData.value, 'valueeeeeeeeeee')

watchEffect(() => {
  // console.log('meeee')
  // console.log(thirdData.value, 'hamza')
  console.log(thirdDataById.value, 'hhhhhhhhhhhhhhhh')
})

const dataById = (id: number) => {
  console.log(id, 'idddddddddddddd')
  getThird(id).then((res) => (thirdDataById.value = res.data))
  console.log(getThird(id), 'hhhhhhhhhhhhhhhh')
}

function goToView(id: number) {
  router.push({ name: 'thirdView', params: {id} })
}
// <<<<<<<<<<<<<<<<<<<< THIRD >>>>>>>>>>>>>>>>>>

const { t } = useI18n()
const headers: DataTableHeader[] = [
  { text: t('username'), value: 'username' },

  { text: t('name'), value: 'name' },
  { text: t('email'), value: 'email' },
  { text: t('joinDate'), value: 'joinDate' },
  { text: t('actions'), value: 'actions', sortable: false, align: 'end' },
]
</script>

<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="thirdData" :loading="lding">
      <template #item.username="{ item }">{{
        item?.first_name
      }}</template>
      <template #item.actions="{ item }">
        <v-btn @click="goToView(item.id)" fab dark small>
          <v-icon dark>
            $mdi-eye
          </v-icon>
        </v-btn>
      </template>
      <template #item.joinDate="{ item }">{{
        item?.created_at
      }}</template>
    </v-data-table>


    </v-col>
  </v-container>
</template>

<route lang="json">
{
  "meta": {
    "title": "third",
    "icon": "$mdi-account-group",
    "roles": [
      "admin"
    ],
    "drawerGroup": "admin",
    "dataCy": "userManage"
  }
}
</route>

<i18n lang="json">
{
  "en": {
    "confirmMsg": "Are you sure to delete this user?"
  },
  "zh": {
    "confirmMsg": "你确定要删除此用户吗？"
  }
}
</i18n>
