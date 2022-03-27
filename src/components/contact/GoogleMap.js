import React from 'react'
import GoogleMapReact from 'google-map-react'

function AnyReactComponent({ text }) {
  return <div>{text}</div>
}

const renderMarkers = (map, maps) => {
  const marker = new maps.Marker({
    position: { lat: 40.80559931781699, lng: -73.96543077328333 },
    map
  })
  return marker
}

function GoogleMapStyle() {
  const params = {
    center: {
      lat: 40.80559931781699,
      lng: -73.96543077328333
    },
    zoom: 11
  }

  return (
    <div className="letmeet-google-map">
      <GoogleMapReact
        // bootstrapURLKeys={{ key: /* Please, place your google map API key here */ }}
        defaultCenter={params.center}
        defaultZoom={params.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMapStyle
