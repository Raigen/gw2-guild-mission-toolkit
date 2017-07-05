import * as React from 'react'

import { Link, Route, RouteComponentProps } from 'react-router-dom'

import { GuildBounty } from './components/GuildBounty'
import { GuildTrek } from './components/GuildTrek'
// import IconButton from 'material-ui/IconButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import {
//   BottomNavigation,
//   BottomNavigationItem,
// } from 'material-ui/BottomNavigation'

const Home = () =>
  <div>
    <h2>Home</h2>
  </div>

const Bounty = (props: RouteComponentProps<undefined>) => {
  const params = new URLSearchParams(location.search)
  const difficulty = params.has('diff')
    ? Number.parseInt(params.get('diff'), 10)
    : 3
  return <GuildBounty difficulty={difficulty} />
}

const Trek = () => <GuildTrek />

const App = () =>
    <MuiThemeProvider>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/bounty'>Gilden Kopfgeldjagd</Link></li>
          <li><Link to='/trek'>Gilden Reise</Link></li>
        </ul>
        <hr />
        <Route exact path='/' component={Home} />
        <Route path='/bounty' component={Bounty} />
        <Route path='/trek' component={Trek} />
      </div>
    </MuiThemeProvider>

export default App
