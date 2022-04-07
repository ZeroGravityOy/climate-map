import 'ol/ol.css'
import React, { createContext, useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import { fromLonLat } from 'ol/proj'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM, { ATTRIBUTION } from 'ol/source/OSM'
import olms from 'ol-mapbox-style'

interface Props {
  children: any
}

interface IMapContext {
  map?: Map
  mapToggleTerrain?: () => void
  mapResetNorth?: () => void
  getGeocoder?: () => any
  mapRelocate?: () => void
  mapZoomIn?: () => void
  mapZoomOut?: () => void
  activeLayers?: any[]
  layerGroups?: any[]
}

const osmLayer = new TileLayer({
  source: new OSM(),
})

const MapContext = createContext<IMapContext>({})

export const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<Map>(null)
  const [baseLayer, setBaseLayer] = useState(osmLayer)
  const [activeLayers, setActiveLayers] = useState<any[]>([])
  const [layerGroups, setLayerGroups] = useState<any[]>([])
  const mapRef = useRef()

  useEffect(() => {
    const options = {
      view: new View({ zoom: 5, center: fromLonLat([15, 62]) }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      overlays: [] as any[],
    }
    const mapObject = new Map(options)

    mapObject.setTarget(mapRef.current)

    setMap(mapObject)
    // olms(mapObject, 'https://tiles.stadiamaps.com/styles/alidade_smooth.json')
    return () => mapObject.setTarget(undefined)
  }, [])

  // TODO ZONE
  const getGeocoder = () => {}
  const mapRelocate = () => {}
  const mapResetNorth = () => {}
  const mapToggleTerrain = () => {}
  const mapZoomIn = () => {}
  const mapZoomOut = () => {}

  // use REDUX for these?
  const enableGroup = () => {}
  const disableGroup = () => {}
  const eetGroupState = () => {}
  const toggleGroup = () => {}
  const enableOnlyOneGroup = () => {}
  const isGroupEnable = () => {}

  const values = {
    map,
    mapToggleTerrain,
    mapResetNorth,
    getGeocoder,
    mapRelocate,
    mapZoomIn,
    mapZoomOut,
    activeLayers,
    layerGroups,
    enableGroup,
  }

  return (
    <MapContext.Provider value={values}>
      <Box
        ref={mapRef}
        id="map"
        className="ol-map"
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      ></Box>
      {children}
    </MapContext.Provider>
  )
}

export default MapContext
