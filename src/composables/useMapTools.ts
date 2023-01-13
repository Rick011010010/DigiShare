export function useMapTools(){


  function toLatLng({longitude, latitude}){
      return {lat: latitude || 0, lng: longitude || 0}
  }
  return { toLatLng }
}
