import 'whatwg-fetch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { MapFloor, getWaypoints } from './utils/mapMarkerFilters'

import App from './App'

injectTapEventPlugin()

window.fetch('/map_floor.json')
  .then(response => response.json())
  .then((data: MapFloor) => getWaypoints(data))
  .then(waypoints => (window as any).waypoints = waypoints)
  .then(() => {
    ReactDOM.render(
      <App />,
      document.querySelector('body')
    )
  })
  .catch(err => console.error(err))
