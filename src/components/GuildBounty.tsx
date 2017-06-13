import * as React from 'react';

import {List, ListItem} from 'material-ui/List';
import {Waypoint, WaypointProps, WaypointSelection} from './Waypoint';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom'
import { POI } from '../utils/mapMarkerFilters';

export interface GuildBountyPath {
  waypoints: WaypointProps[];
  direction: string;
}

export interface GuildBountyTargetProps {
    name: string;
    difficulty: number;
    mapKey: number;
    special?: number;
}

interface GuildBountyTargetState {
    selectedWaypoint?: POI | undefined;
    isHidden: boolean;
}

export const EASY = 1;
export const MID = 2;
export const HARD = 3;

const targets: GuildBountyTargetProps[] = [
    { name: 'Brekkabek', mapKey: 17, difficulty: EASY },
    { name: 'Puubaduu', mapKey: 23, difficulty: EASY },
    { name: 'Trillia Midwell', mapKey: 21, difficulty: EASY },
    { name: '2-MULT', mapKey: 29, difficulty: MID },
    { name: 'Bücherwurm Bwikki', mapKey: 27, difficulty: MID },
    { name: 'Halbgare Komali', mapKey: 39, difficulty: MID },
    { name: 'Jähzorniger Felix', mapKey: 32, difficulty: MID },
    { name: 'Sotzz das Schlitzohr', mapKey: 24, difficulty: MID, special: 3 },
    { name: 'Yanonka, die Rattenhüterin', mapKey: 21, difficulty: MID },
    { name: 'Ander "Wildmann" Westward', mapKey: 873, difficulty: HARD, special: 1 },
    { name: 'Diplomat Tarban', mapKey: 54, difficulty: HARD },
    { name: 'Gefangene 1141', mapKey: 25, difficulty: HARD },
    { name: 'Großer Mayana', mapKey: 53, difficulty: HARD, special: 2 },
    { name: 'Reckin Michiele', mapKey: 53, difficulty: HARD },
    { name: 'Schamane Arderus', mapKey: 22, difficulty: HARD },
    { name: 'Tricksende Trekksa', mapKey: 20, difficulty: HARD, special: 4 },
    { name: '"Unterkonstabler" Brooke', mapKey: 31, difficulty: HARD },
    { name: 'Verschlagene Teesa', mapKey: 30, difficulty: HARD }
];

export interface GuildBountyProps {
    difficulty: number;
}

class GuildBountyTarget extends React.Component<GuildBountyTargetProps, GuildBountyTargetState> {
    state: GuildBountyTargetState = {
        selectedWaypoint: undefined,
        isHidden: false
    }
    handleWaypointSelected = (poi: POI) => {
        this.setState({
            selectedWaypoint: poi
        })
    }

    render() {
        const {name, mapKey} = this.props;
        const {selectedWaypoint: waypoint} = this.state;
        return !this.state.isHidden && <ListItem disabled>
            <h4>{name} <IconButton onClick={() => this.setState({isHidden: true})}><DeleteIcon /></IconButton></h4>
            {waypoint
                ? <div>
                    <Waypoint id={waypoint.poi_id} name={waypoint.name} />
                    <IconButton onClick={() => this.setState({selectedWaypoint: undefined})}><DeleteIcon /></IconButton>
                </div>
                : <WaypointSelection pois={(window as any).waypoints} mapKey={mapKey} onWaypointSelected={this.handleWaypointSelected} />
            }
        </ListItem>
    }
}

export class GuildBounty extends React.Component<GuildBountyProps, undefined> {
    render() {
        return <div>
            <h1>Guild Bounty</h1>
            <ul>
                <li><Link to="/bounty?diff=1">leicht</Link></li>
                <li><Link to="/bounty?diff=2">mittel</Link></li>
                <li><Link to="/bounty?diff=3">schwer</Link></li>
            </ul>
            <List>
                {targets
                    .filter(target => target.difficulty <= this.props.difficulty)
                    .map(target => <GuildBountyTarget key={target.name} name={target.name} difficulty={target.difficulty} mapKey={target.mapKey} />)
                }
            </List>
        </div>
    }
}
