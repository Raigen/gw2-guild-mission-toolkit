import * as React from 'react';

export interface WaypointProps {
  name: string;
  code: string;
};

export class Waypoint extends React.Component<WaypointProps, undefined> {
    render() {
        const {name, code} = this.props
        return <span>{name}</span>
    }
}
