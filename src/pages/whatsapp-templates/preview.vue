<script setup lang="ts">
import { getWabaTemplates } from '@/api/waba_templates'
import type { WabaTemplate } from '@/api/waba_templates'
import { render } from 'mustache'
import { ref, watch, computed } from 'vue'

const waba_templates = ref<WabaTemplate[]>([])
const selected_template = ref<WabaTemplate>()

function getType(T: string) {
  return selected_template.value?.components.find((e) => e.type === T)
}

const body = computed(() => {
  return getType('BODY')
})

const header = computed(() => {
  return getType('HEADER')
})

const buttons = computed(() => {
  return getType('BUTTONS')
})

const footer = computed(() => {
  return getType('FOOTER')
})

// rgx of the {{1}}, {{2}} ...
const regex = /{{\w+}}/g

// the match of the rgx in the bodyTemplate
const bodyInput = computed(() => {
  return body.value?.text.match(regex)
})
// the variable indice in the default values
const variablIndice = computed(() => {
  return bodyInput.value?.map((n: string) => +n.slice(2, -2) - 1)
})

// default value of the bodyText
const bodyText = computed(() => {
  return variablIndice?.value?.map((n) => body?.value?.example?.body_text[n])
})

function defaultVal(key: string) {
  return bodyText.value?.[+key.slice(2, -2) - 1]?.[0]
}

// the body resulte by using the mustach method
const output = computed(() => {
  return render(body?.value.text, vars?.value)
})

// the jason of the mustach data
const vars = ref({})

//Img url
const url = ref('')

// watch of the template data
watch(selected_template, () => {
  const obj: object = {}
  if (bodyInput.value) {
    for (const key of bodyInput.value) {
      obj[key.slice(2, -2)] = defaultVal(key)
    }
  }

  vars.value = obj
  //img change url
  const urlInput: string = header?.value.example?.header_handle[0]
  if (header?.value.format === 'IMAGE') {
    url.value = urlInput
  }
})

getWabaTemplates().then((promise) => (waba_templates.value = promise.data))
</script>

<template>
  <v-container fluid>
    <v-row class="grid">
      <v-col cols="12" class="">
        <v-select
          v-model="selected_template"
          label="select one of waba templates"
          :items="waba_templates"
          item-text="name"
          return-object
          class=""
        ></v-select>
      </v-col>

      <v-row class="">
        <v-col col="6 ">
          <v-app-bar
            width="390"
            height="705"
            class="ml-16 rounded-xl pt-16 pr-2"
            src="/phone3.png"
            fade-img-on-scroll
            scroll-target="#scrolling-techniques-3"
            shrink-on-scroll
            prominent
            :elevation="0"
          >
            <template #img="{ props }">
              <v-img v-bind="props" width="500" cover></v-img>
            </template>

            <v-col v-if="selected_template" cols="12">
              <v-card
                color="grey lighten-3"
                absolute
                max-width="400"
                fab
                height="100"
                class="mx-auto mt-16 rounded-t-xl"
                :elevation="0"
              >
                <template v-if="header">
                  <template v-if="header.format === 'IMAGE'" height="100">
                    <v-img
                      class="mx-auto"
                      height="100"
                      width="200"
                      :src="url"
                    ></v-img>
                  </template>

                  <template v-if="header.format === 'DOCUMENT'">
                    <v-img
                      class="mx-auto"
                      height="100"
                      width="200"
                      :src="header.example.pdfImg[0]"
                    ></v-img>
                  </template>
                </template>

                <v-list
                  two-line
                  :elevation="0"
                  class="rounded-br-xl rounded-bl-0"
                >
                  <v-list-item>
                    <v-list-item-content max-height="100" v-if="body">
                      <v-card-text
                        class="text-h7 font-weight-thin d-inline-block"
                        style="max-width: 400px; max-height: 96px"
                      >
                        {{ output }}
                        <br />
                      </v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider inset></v-divider>
                  <v-list-item v-if="footer">
                    <v-list-item-content>
                      <v-list-item-title class="text-h16 font-weight-medium">{{
                        footer.text
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item>
                    <v-list-item-content v-if="buttons" flex=" flex-row ">
                      <v-btn
                        v-for="(button, i) in buttons.buttons"
                        depressed
                        :key="i"
                      >
                        <v-icon
                          v-if="button.type === 'PHONE_NUMBER'"
                          class="mr-1"
                          size="20"
                          color="blue"
                        >
                          mdi-phone
                        </v-icon>
                        <v-icon
                          v-if="button.type === 'URL'"
                          class="mr-1"
                          size="20"
                          color="blue"
                        >
                          mdi-web
                        </v-icon>
                        <p class="pt-4 blue--text" color="blue">
                          {{ button.text }}
                        </p>
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-app-bar>
        </v-col>
        <v-col col="6" class="d-flex justify-center mb-6 mx-lg-auto">
          <v-card class="px-10 pb-2" width="600">
            <v-card-text>
              <div>whatsapp templates</div>
            </v-card-text>
            <div class="" v-if="selected_template && bodyInput">
              <v-text-field
                v-for="(input, i) in vars"
                :key="i"
                v-model="vars[i]"
                color="success"
                label="body variables"
                hide-details="auto"
              ></v-text-field>
            </div>
            <div v-if="selected_template && header.format === 'IMAGE'">
              <v-text-field v-model="url" label="Image URL"></v-text-field>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<route lang="json">
{
  "meta": {
    "title": "whatsapp-templates",
    "icon": "$mdi-whatsapp",
    "drawerIndex": 0
  }
}
</route>
