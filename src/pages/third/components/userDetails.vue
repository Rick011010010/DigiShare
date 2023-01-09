<script setup lang="ts">
import { ref, watch, computed, watchEffect, onMounted, Ref } from 'vue'
import { getThirds, getThird } from '@/api/thirds'
import type { Third } from '@/api/thirds'
import { values } from 'lodash'
import { log } from 'console'
const staticInfos = ref<object[]>([])

const third: Ref<Third> = ref({})
const items = ref<any>([
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'person', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' },
  { text: 'location', icon: 'mdi-map-marker' },
  { text: 'email', icon: 'mdi-email' },
  { text: 'mobile', icon: 'mdi-cellphone' },
  { text: 'phone', icon: 'mdi-phone' },
  { text: 'createdAt', icon: 'mdi-pencil' },
  { text: 'updatedAt', icon: 'mdi-update' },
  { text: 'language', icon: 'mdi-web ' },
  { text: 'tages', icon: 'mdi-tag-multiple' },
  { text: 'note', icon: 'mdi-note' },
  { text: 'group', icon: 'mdi-account-multiple' },
  { text: 'birthday', icon: 'mdi-calendar-month' },
  { text: 'gender', icon: 'mdi-gender-male-female' },
  { text: 'business' },
  { text: 'zone' },
  { text: 'entity' },
  { text: 'verified' },
  { text: 'city' },
  { text: 'region' },
  { text: 'status' },
  { text: 'country' },
  { text: 'priority' },
  { text: 'premium' },
  { text: 'active' },
  { text: 'creation mode' },
  { text: 'geolocation' },
  { text: 'zone' },
])

const personalInfos = ref<object[]>([
  { name: '', icon: 'mdi-account' },
  { address: '', icon: 'mdi-map-marker' },
  { email: '', icon: 'mdi-email' },
  { mobile: '', icon: 'mdi-cellphone' },
  { phone: '', icon: 'mdi-phone' },
  { lang: '', icon: 'mdi-web ' },
  { birthday: '', icon: 'mdi-calendar-month' },
  { gender: '', icon: 'mdi-gender-male-female' },
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

// <<<<<<<<<<<<<<<<<<< EXTRACT THE FIRST LETTER OF THE NAME >>>>>>>>>>>>>
function getInitials(str: string) {
  console.log(str, 'parametter')

  let names = str.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  console.log(initials)

  return initials
}

// <<<<< SET A NEW ARRAY FULL WITH OBJS WHICH CONTAIN STATTIC INFOS AND ICONS >>>>>
watch(third, () => {
  console.log('we are in')
  let arr = []
  for (let values of personalInfos.value) {
    let text = 'text'
    let obj = {}
    for (let keys of Object.keys(values)) {
      console.log(keys, 'keysss')

      if (keys in third.value) {
        obj[keys] = third.value[keys]
        obj[text] = obj[Object.keys(obj)[0]]
      } else {
        obj[keys] = values[keys]
      }
    }
    console.log(obj, 'deeee')
    // arr.push({ text: obj[Object.keys(obj)[0]], icon: values?.icon })
    arr.push(obj)
  }

  staticInfos.value = arr
  console.log(staticInfos.value)

  getInitials(third.value?.name)
})

// watchEffect(() => {
//   console.log(staticInfos.value, '2222222222')
// })
const panel = ref([0, 1])
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!-- <div>


    <v-expansion-panels
     v-model="panel"
      :disabled="false"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div> -->
        <v-card class="mx-auto" elevation="0" max-width="600" tile>
          <v-row>
            <v-col class="text-center">
              <v-responsive>
                <v-avatar size="100" class="mx-auto">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-responsive>
            </v-col>
            <v-col>
              <v-list disabled>
                <v-subheader>basic infos</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(item, i) in staticInfos" :key="i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ Boolean(item.text) ? item.text : '- -' }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
