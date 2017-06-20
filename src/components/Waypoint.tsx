import * as CopyToClipboard from 'react-copy-to-clipboard'
import * as React from 'react'

import AutoComplete from 'material-ui/AutoComplete'
import { IdToChatCode } from '../utils/base64ToHex'
import { POI } from '../utils/mapMarkerFilters'

export interface WaypointSelectionProps {
  pois: POI[]
  mapKey?: number
  onWaypointSelected?: (poi: POI) => void
}
interface WaypointSelectionState {
  searchText: string
  selectedId: number
}

export interface WaypointProps {
  name: string
  id: number
}

interface WaypointState {
  copied: boolean
}

export class WaypointSelection extends React.Component<
  WaypointSelectionProps,
  WaypointSelectionState
> {

  state = {
    searchText: '',
    selectedId: 0
  }

  waypointSelected (waypoint: { text: string; value: number }) {
    this.setState({
      searchText: waypoint.text,
      selectedId: waypoint.value
    })
    const selectedPoi = this.props.pois.find(
      poi => poi.poi_id === waypoint.value
    )

    if (this.props.onWaypointSelected && selectedPoi) {
      this.props.onWaypointSelected(selectedPoi)
    }
  }

  handleNewRequest = (waypoint: any) => this.waypointSelected(waypoint)

  render () {
    const pois = this.props.mapKey
      ? this.props.pois.filter(poi => poi.mapKey === this.props.mapKey)
      : this.props.pois
    return (
      <div>
        <AutoComplete
          hintText='waypoints'
          searchText={this.state.searchText}
          maxSearchResults={5}
          onNewRequest={this.handleNewRequest}
          dataSource={pois.map(poi => ({ text: poi.name, value: poi.poi_id }))}
        />
      </div>
    )
  }
}

export class Waypoint extends React.Component<WaypointProps, WaypointState> {

  state = { copied: false }

  setCopied () {
    this.setState({ copied: true })
    window.setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render () {
    const { name, id } = this.props
    const code = IdToChatCode(id)

    return (
      <span>
        {name}
        <CopyToClipboard text={code} onCopy={() => this.setCopied()}>
          <span>
            ({code}){' '}
            {this.state.copied &&
              <span style={{ color: 'green' }}> Copied</span>}
          </span>
        </CopyToClipboard>
      </span>
    )
  }
}
