import React, { useEffect, useRef, useState } from 'react'

import './style.css'
import { Geolocation, Map as OlMap, View } from 'ol'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat, toLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'

interface Props {
  position?: [number, number],
  setPosition: (position: [number, number]) => void
}

export const Map = ({ position, setPosition }: Props) => {
  const [map, setMap] = useState<OlMap>()
  const [initialized, setInitialized] = useState(false)
  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    const baseLayer = new TileLayer({
      source: new OSM()
    })
    baseLayer.set('name', 'base-layer')

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

    initialMap.on('click', event => {
      setPosition([toLonLat(event.coordinate)[0], toLonLat(event.coordinate)[1]])
    })

    const geolocation = new Geolocation({
      tracking: true
    })

    geolocation.on('change', e => {
      if (!position) {
        setPosition(e.target.getPosition())
      }
    })

    setMap(initialMap)
  }, [])

  useEffect(() => {
    if (!position || !map) return
    if (!initialized) {
      map?.setView(new View({ center: fromLonLat(position), zoom: 10 }))
    }

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
      style: {
        'circle-radius': 9,
        'circle-fill-color': 'red'
      }
    })

    const marker = new Feature({
      geometry: new Point(fromLonLat(position))
    })

    markerLayer.getSource()?.addFeature(marker)

    map?.getLayers().getArray()
      .filter(layer => layer.get('name') !== 'base-layer')
      .forEach(layer => map.removeLayer(layer))

    map.addLayer(markerLayer)
    setInitialized(true)
  }, [position, map])

  return <div id='map' />
}
