<script>
export default {
  name: 'AppGoogleMaps',
  props: {
    position_data: {
      type: Object,
      required: true,
    },
    map_center: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    mapOptions() {
      return {
        clickableIcons: false,
        styles: [
          {
            featureType: 'administrative.country',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }
    },
  },
  methods: {
    ...useMapTools(),

    onClick(e) {
      console.log(e, 'hamza')
      this.$emit('update:position_data', e.latLng)
      // this.$refs.results.$el.scrollTop = 0
    },
  },
}
</script>

<template>
  <div class="locationGeocoder demo">
    <googlemaps-map
      :center="toLatLng(position_data)"
      class="map"
      :options="mapOptions"
      :zoom="10"
      @click="onClick"
    >
      <googlemaps-marker
        v-if="position_data"
        title="Searched location"
        :position="toLatLng(position_data)"
      />
    </googlemaps-map>
  </div>
</template>

<style scoped>
.demo {
  height: 400%;
  display: flex;
  flex-direction: column;
}
.panes {
  flex: 1;
  display: flex;
  width: 10px !important;
  flex-direction: row;
  align-items: stretch;
}
.map {
  flex: 1;
}
</style>
