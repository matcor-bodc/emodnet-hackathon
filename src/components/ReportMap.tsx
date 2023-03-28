import React, { useEffect, useRef, useState } from 'react'

import './style.css'
import { Map as OlMap, View } from 'ol'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import TileWMS from 'ol/source/TileWMS.js';

const COLOURS: any = {
  Animal: 'red',
  Litter: 'magenta',
  Other: 'purple'
}

interface Props {
  data: any[],
  setSelectedId: (id: string|number|undefined) => void
}

export const ReportMap = ({ data, setSelectedId }: Props) => {
  const [map, setMap] = useState<OlMap>()
  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    const baseLayer = new TileLayer({
      source: new OSM()
    })
    baseLayer.set('name', 'base-layer')

    const layer = new TileLayer({
      source: new TileWMS({
        url: 'https://ows.emodnet-humanactivities.eu/wms',
        params: {'LAYERS': 'vesseldensity_allavg', 'TILED': true},
        serverType: 'geoserver',
        transition: 0
      }),
    })
    layer.set('name', 'base-layer')

    const initialMap = new OlMap({
      target: 'map',
      layers: [
        baseLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })

    initialMap.addLayer(layer)

    setMap(initialMap)
  }, [])

  useEffect(() => {
    if (!data) return

    map?.on('click', e => {
      const feature = map?.forEachFeatureAtPixel(e.pixel, feature => {
        return feature
      })
      if (feature) {
        setSelectedId(feature.getId())
      } else {
        setSelectedId(undefined)
      }
    })

    const markerLayers: any = {}
    Object.keys(COLOURS).forEach((x: any) => {
      markerLayers[x] = new VectorLayer({
        source: new VectorSource(),
        style: {
          'circle-radius': 11,
          'circle-fill-color': COLOURS[x],
          'circle-stroke-color': '#eee',
          'circle-stroke-width': 3
        }
      })
    })

    data.forEach(x => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([x.longitude, x.latitude]))
      })
      marker.setId(x._id)
      markerLayers[x.type].getSource()?.addFeature(marker)
    })

    map?.getLayers().getArray()
      .filter(layer => layer.get('name') !== 'base-layer')
      .forEach(layer => map.removeLayer(layer))

    Object.values(markerLayers).forEach((x: any) => map?.addLayer(x))
  }, [data])

  return <div id='map' />
}
