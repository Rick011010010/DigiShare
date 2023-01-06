<script setup lang="ts" >
</script>


<template>
  <v-app id="inspire">
    <v-app-bar color="white" class="" max-height="65">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>contact name

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-row class="mt-2">
      <v-col cols="3">
        <v-sheet rounded="lg"> contact component </v-sheet>
      </v-col>

      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs  >
            <v-tab>Timeline</v-tab>
            <v-tab>Activity</v-tab>
            <v-tab>Interactions</v-tab>
            <v-tab>Campaigns</v-tab>
            <v-tab>Platform links </v-tab>
          </v-tabs>
        </template>
      </v-col>
    </v-row>
  </v-app>
</template>




<route lang="json">
    {
      "meta": {
        "title": "third/view",

        "icon": "$mdi-web",
        "roles": ["admin"],

        "dataCy": "userManage"
      }
    }
    </route>
