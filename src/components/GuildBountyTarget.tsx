import * as React from 'react'
import {WaypointProps} from './Waypoint'

export interface GuildBountyTargetProps {
  name: string
  zone: string
  waypoint: WaypointProps
}

export class GuildBountyTarget extends React.Component<GuildBountyTargetProps, undefined> {
  render () {
    const {name, waypoint} = this.props
    return <li>{name} - {waypoint.name}</li>
  }
}
