import * as React from 'react';
import {WaypointProps} from './Waypoint';

export interface GuildBountyPath {
  waypoints: WaypointProps[];
  direction: string;
}

export interface GuildBountyProps {}

export class GuildBounty extends React.Component<GuildBountyProps, undefined> {
    render() {
        return <h1>Guild Bounty</h1>
    }
}
