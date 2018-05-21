import React, { Component } from 'react';
import DPOTable from './Components/DPOTable.js'
import DPORow from './Components/DPORow.js'

class ProfilePage extends Component {

  constructor (props) {

    super(props);

    this.state = {profiles: []}
    this.props.api.loadSubmittedProfiles(p => this.setState({profiles: p.concat(this.state.profiles)}))
    this.props.api.loadProfiles(p => this.setState({profiles: this.state.profiles.concat(p)}))
  }

  selectProfile(id, state) {

    this.props.history.push(`/${id}/${state}`);
  }

  render() {
    return (
      <div className="App">
        <header onClick={() => this.props.history.push("/")}>
          <div className="title">
            <img src='/logo.png' alt="logo"/>
          </div>
          <h2 className="subtitle">
            Panneau d'administration
          </h2>
        </header>
        <DPOTable>
         { this.state !== null ? this.state.profiles.map(p => <DPORow api={this.props.api} onSelect={this.selectProfile.bind(this)} key={p.data.id} profile={p}/>) : <tr/> }
        </DPOTable>
      </div>
    );
  }
}

export default ProfilePage
