import React, { useEffect } from 'react'
import { Heading3, Section, Separator, Title } from '../common/commonStyles'
import { Map, ProductLocationImage } from './Product.styles'
import { GoogleMap, Marker, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const ProductLocation = ( { location, mapImage } ) => {

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-embed',
    googleMapsApiKey: "AIzaSyBfXnlL0aMbJeEYtPeGREqHbZyucuF2dEs"
  });

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: -34.8175116,
    lng: -55.9816102
  };

  const options = {
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const handleClick = () => {
    window.open('https://maps.google.com/maps?ll=-34.817485,-55.981634&z=18&t=m&hl=en&gl=US&mapclient=apiv3&cid=14512687725435160489', '_blank')
  }

  return (
    <Section color='white'>
        <Title color='color2'>¿Dónde recoger el vehículo?</Title>
        <Separator color='primary' />
        <Heading3 margin='10px 0'>{ location }</Heading3>
        {/* <ProductLocationImage src={mapImage} alt="mapa de la localización" /> */}
        <Map>
          {
            isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                options={options}
                zoom={15}
              >
                { /* Child components, such as markers, info windows, etc. */ }
                <MarkerF
                  title={'Car One'}
                  onClick={handleClick}
                  position={center}
                />

              </GoogleMap>
            )
          }
        </Map>
    </Section>
  )
}

export default ProductLocation