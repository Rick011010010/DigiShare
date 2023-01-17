<script setup lang="ts">
import AppGoogleMaps from '@/components/AppGoogleMaps.vue'
import { ref, watch, computed, watchEffect, onMounted } from 'vue'
import type { PropType, Ref } from 'vue'
import { getThirds, getThird } from '@/api/thirds'
import type { Third } from '@/api/thirds'
// <<<<<<<<<<< REFS >>>>>>>>>>>
const staticInfos = ref<object[]>([])
const avatar: Ref<string> = ref('')
const img: Ref<string> = ref('')
console.log(img.value, 'i die')

// <<<<<<<<<<< GETTING PROPS >>>>>>>>>>>

const props = defineProps({
  bigThird: {
    type: Object as PropType<Third>,
    required: true,
  },
})

const third: Ref<Third> = ref(props.bigThird)

const generalInfos = computed(() => {
  return [
    {
      value:
        props.bigThird?.name ||
        `${props.bigThird.first_name} ${props.bigThird.last_name}`,
      icon: 'mdi-account',
    },
    { value: props.bigThird.gender, icon: 'mdi-gender-male-female' },
    {
      value: props.bigThird.is_company ? 'Company' : 'Individual',
      text: 'type',
    },
    {
      value: props.bigThird.verified ? 'Verified' : 'Not Verified',
      icon: 'mdi-check-decagram',
    },
    { value: props.bigThird?.active, icon: 'mdi-account-badge' },
    {
      value: props.bigThird.premium ? 'Premium' : 'Not Premium',
      icon: 'mdi-crown',
    },
    { value: props.bigThird.tags?.[0], icon: 'mdi-tag-multiple', type: 'tags' },
  ]
})
const contactInfos = computed(() => {
  return [
    { value: props.bigThird.phone, icon: 'mdi-phone' },
    { value: props.bigThird.mobile, icon: 'mdi-cellphone' },
    { value: props.bigThird.email, icon: 'mdi-email' },
    // {value: props.bigThird.whatsapp, icon: 'mdi-tag-multiple'},
    // {value: props.bigThird.messanger, icon: 'mdi-tag-multiple'},
    // {value: props.bigThird.telegram, icon: 'mdi-tag-multiple'},
  ]
})
const details = computed(() => {
  return [
    { value: props.bigThird.lang, icon: 'mdi-web' },
    { value: props.bigThird?.note[0]?.content, icon: 'mdi-note' },
    { value: props.bigThird.birthday, icon: 'mdi-calendar-month' },
    { value: props.bigThird.created_at, icon: 'mdi-pencil' },
    { value: props.bigThird.updated_at, icon: 'mdi-update' },
    { value: props.bigThird.source, text: 'source' },
    { value: props.bigThird.mode, text: 'creation mode' },
    {
      value: props.bigThird.data?.company_name,
      icon: 'mdi-domain',
      type: props.bigThird.is_company ? 'Company' : 'Individual',
    },
  ]
})
const locations = computed(() => {
  return [
    { value: props.bigThird.city?.name, icon: 'mdi-web' },
    { value: props.bigThird.adress, icon: 'mdi-map-marker' },
    {
      value: props.bigThird.data?.location,
      mama: 'mdi-calendar-month',
      type: 'location',
    },
  ]
})
const groupes = computed(() => {
  return [
    { value: props.bigThird.groups, icon: 'mdi-web' },
    { value: props.bigThird.entity, icon: 'mdi-note' },
    { value: props.bigThird.region, icon: 'mdi-calendar-month' },
    { value: props.bigThird.business, icon: 'mdi-calendar-month' },
    { value: props.bigThird.zone, icon: 'mdi-calendar-month' },
  ]
})

const ticketsLength: Ref<object[]> = ref()

const expastionPanels = computed(() => {
  return [
    {
      title: 'General Infos',
      targetedObject: generalInfos.value,
      panel: [0],
    },
    {
      title: 'Contact Infos',
      targetedObject: contactInfos.value,
      panel: [1],
    },
    {
      title: 'Details',
      targetedObject: details.value,
      panel: [2],
    },
    {
      title: 'locations',
      targetedObject: locations.value,
      panel: [3],
    },
    {
      title: 'Groupes',
      targetedObject: groupes.value,
      panel: [4],
    },
  ]
})

// <<<<<<<<<<<<<<<<<<< EXTRACT THE FIRST LETTER OF THE NAME >>>>>>>>>>>>>

const nameLetter = computed(() => {
  if (!generalInfos.value?.[0].value) {
    return
  }

  let names = generalInfos.value?.[0].value.split(' ')
  console.log(names, 'names')

  let initials = names[0].substring(0, 1).toUpperCase()
  console.log(initials, 'names')

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initials
})

// <<<<<<<<<<<<<<<< OTHERS >>>>>>>>>>>>>>
watch(generalInfos, () => {
  img.value = props.bigThird?.data?.avatar
  console.log(img.value, 'hhhhhhhhhhhhhhh')
  ticketsLength.value = props.bigThird?.tickets.length
})
const ite = ['default', 'ticket', 'conversation']
const selectModel = ref<string>('default')
</script>
<template>
  <v-container fluid>
    <v-card rounded> </v-card>
    <template>
      <v-row align="center">
        <v-col cols="12">
          <v-select
            v-model="selectModel"
            :items="ite"
            :menu-props="{ top: true, offsetY: true }"
            label="Label"
          ></v-select>
        </v-col>
      </v-row>
    </template>
    <v-card class="mx-auto" elevation="0" max-width="400">
      <template v-if="selectModel !== 'conversation'">
        <v-col class="text-center">
          <v-responsive>
            <v-avatar size="100" class="mx-auto" color="light-blue darken-4">
              <img v-if="Boolean(img)" :src="img" alt="John" />
              <span v-else class="white--text display-2">{{ nameLetter }}</span>
            </v-avatar>
          </v-responsive>
        </v-col>
        <v-col class="text-center">
          <h4>{{ img }}</h4>
          <h1>{{ generalInfos[0].value }}</h1>
        </v-col>
      </template>

      <div
        style="
          height: calc(100vw - 65vw);
          overflow-y: scroll;
          overflow-x: hidden;
        "
      >
        <!-- <<<<<<<<<<<<<<<<<<<<<< loop >>>>>>>> -->
        <v-row>
          <v-col cols="12">
            <v-row
              v-for="({ title, targetedObject, panel }, i) in expastionPanels"
              :key="i"
            >
              <v-col>
                <!-- <h4> {{ targetedObject }} </h4> -->
                <div>
                  <v-expansion-panels
                    v-model="panel"
                    flat
                    :disabled="false"
                    multiple
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header>{{
                        title
                      }}</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-list-item
                          v-for="(
                            { icon, type, value, text }, i
                          ) in targetedObject"
                          :key="i"
                        >
                          <template v-if="type !== 'Individual'">
                            <v-list-item-icon>
                              <v-icon v-if="icon" v-text="icon"></v-icon>
                              <span class="" v-else-if="text">
                                {{ text }} :
                              </span>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>
                                <div
                                  v-if="type === 'tags'"
                                  class="text-wrap body-3"
                                >
                                  <v-chip> {{ value?.name }} </v-chip>
                                  <v-chip class="ml-2">
                                    {{ value?.slug }}
                                  </v-chip>
                                </div>
                                <div
                                  v-else-if="type === 'location'"
                                  class="rounded-xl"
                                >
                                  <div class="rounded-xl">
                                    <app-google-maps
                                      :position_data="value"
                                      style="
                                        height: 100% !important;
                                        width: 100% !important;
                                      "
                                      :map_center="value"
                                    />
                                  </div>
                                </div>
                                <div v-else>
                                  <span class="body-3 text-wrap">
                                    {{ value ?? '- -' }}
                                  </span>
                                </div>
                              </v-list-item-title>
                            </v-list-item-content>
                          </template>
                          <template v-else-if="type === 'location'">
                            <h3>hollamf</h3>
                          </template>
                        </v-list-item>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex justify-center" v-if="selectModel === 'ticket'">
        <p class="mb-2 blue--text" style="bottom: 5px">
          {{
            ticketsLength > 1
              ? `${ticketsLength} Tickets`
              : ticketsLength == 1
              ? `${ticketsLength} Ticket`
              : ' 0 Ticket'
          }}
        </p>
      </div>
    </v-card>
  </v-container>
</template>

<style></style>
