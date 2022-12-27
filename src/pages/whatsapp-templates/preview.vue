<script setup lang="ts">
import { getWabaTemplates } from '@/api/waba_templates'
import type { WabaTemplate } from '@/api/waba_templates'
import { render } from 'mustache'
import { ref, watch, whatchEffect, computed } from 'vue'

const waba_templates = ref<WabaTemplate[]>([])
const selected_template = ref<WabaTemplate>()
// const bodyText = ref()
const body = computed(() => {
  return selected_template.value?.components.find((e) => e.type === 'BODY')
})

const header = computed(() => {
  return selected_template.value?.components.find((e) => e.type === 'HEADER')
})

const buttons = computed(() => {
  return selected_template.value?.components.find((e) => e.type === 'BUTTONS')
})

const footer = computed(() => {
  return selected_template.value?.components.find((e) => e.type === 'FOOTER')
})
// const url = computed(() => {
//   return selected_template.value?.components.buttons.value?.find((e) => e.type === 'URL')
// })

// let res = body.text.match(/{{\W+}}/)
// console.log(res)

// rgx of the {{1}}, {{2}} ...
const regex = /{{\w+}}/g

console.log(body?.value?.text, 'body')

// the match of the rgx in the bodyTemplate
const bodyInput = computed(() => {
  return body?.value.text.match(regex)
})

// default value of the bodyText
const bodyText = computed(() => {
  return numbers?.value?.map((n) => body?.value?.example?.body_text[n])
})

// the jason of the mustach data
const vars = computed(() => {
  const obj = {}
  for (const key of bodyInput.value) {
    obj[key.slice(2, -2)] = defaultVal(key)
  }
  return obj
})

let numbers = computed(() => {
  return bodyInput?.value.map((n) => n.slice(2, -2) - 1)
})

function defaultVal(key: string) {
  return bodyText.value[key.slice(2, -2) - 1][0]
}

// the body resulte by using the mustach method
let output = computed(() => {
  return render(body?.value.text, vars?.value)
})

// function changeBodyText () {

// }

// function   watch: {
//   bodyText: {
//       handler(newBodyText) {
//         // this will be run immediately on component creation.
//       },
//       // force eager callback execution
//       immediate: true
//     }
//   }

// for (const key of defaultVal.value) {
//   defaultVal(key) = inputModel(key)
//   }

// )

// let BodyTextRes = computed(() => {
//   let r = body?.value.text
//   for(const key of bodyInput.value ){
//    r = r.replace(key,defaultVal(key))
//   }
//   return r

// })

getWabaTemplates().then((promise) => (waba_templates.value = promise.data))
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="">
        <v-select
          v-model="selected_template"
          label="select one of waba templates"
          :items="waba_templates"
          item-text="name"
          return-object
        ></v-select>
      </v-col>

      <v-col class="">
        <v-col col="1" class="d-flex justify-center mb-6">
          <v-card
            class="px-10 pb-2"
            width="600"
            v-if="selected_template && bodyInput"
          >
            <v-card-text>
              <div>whatsapp templates</div>
              <p class="text-h5 text--primary">modifier dans le modèle</p>
            </v-card-text>
            <div class="">
              <v-text-field
                v-for="(input, i) in bodyText"
                :key="i"
                v-model="bodyText[i]"
                color="success"
                label=""
                hide-details="auto"
              ></v-text-field>
            </div>
          </v-card>

          <v-app-bar
            absolute
            width="390"
            height="705"
            class="ml-16 mt-16 rounded-xl pt-16 pr-2"
            src="/phone3.png"
            fade-img-on-scroll
            scroll-target="#scrolling-techniques-3"
            shrink-on-scroll
            prominent
          >
            <template v-slot:img="{ props }">
              <v-img v-bind="props" width="500" cover></v-img>
            </template>

            <v-col v-if="selected_template" cols="12">
              <v-card
                color="grey lighten-3"
                absolute
                max-width="400"
                height="100"
                class="mx-auto mt-16 rounded-t-xl"
              >
                <template v-if="header">
                  <template v-if="(header.format === 'IMAGE')" height="100">
                    <v-img
                      class="mx-auto"
                      height="100"
                      width="200"
                      v-bind:src="header.example.header_handle[0]"
                    ></v-img>
                  </template>

                  <template v-if="(header.format === 'DOCUMENT')">
                    <v-img
                      class="mx-auto"
                      height="100"
                      width="200"
                      v-bind:src="header.example.pdfImg[0]"
                    ></v-img>

                  </template>
                </template>

                <v-list two-line>
                  <v-list-item>
                    <v-list-item-content max-height="100" v-if="body">
                      <v-card-text
                        class="text-h7 font-weight-medium d-inline-block"
                        style="max-width: 400px; max-height: 96px"
                      >
                        {{ bodyInput && body.example ? output : body.text }}
                        <br />
                        <!-- {{ vars }} -->
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
                        >
                          mdi-phone
                        </v-icon>
                        <v-icon
                          v-if="button.type === 'URL'"
                          class="mr-1"
                          size="20"
                        >
                          mdi-web
                        </v-icon>
                        {{ button.text }}
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-app-bar>
        </v-col>
      </v-col>
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
