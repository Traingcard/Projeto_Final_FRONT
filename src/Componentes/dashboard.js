import React from 'react'
import Menulateral from './menu';
import '../App.css';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <div class="menu">
          <Menulateral updateUser={this.props.updateUser} />
        </div>
        <div>

        </div>
      </div>

    )
  }
}
