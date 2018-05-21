import React, { Component } from 'react';
import { Input, Button } from 'reactstrap'

class DPORow extends Component {

  constructor (props) {

    super(props);

    this.state = {
      profileState: props.profile.state
    }
  }

  toggleProfileState () {

    let oldState = this.state.profileState;
    let newState = oldState === "published" ? "submitted" : "published";
    this.props.api.changeProfileState(this.props.profile.data.id, oldState, newState, data => {

      this.setState({profileState: newState})
    })
  }

  render() {

    var date;
    {
      let d = this.props.profile.createdAt !== undefined ?
                new Date(this.props.profile.createdAt) :
                new Date(this.props.profile.states[this.props.profile.state].modifiedAt);

      let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      let day = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();

      date = day + ' ' + monthNames[month] + ' ' + year;
    }

    return (
    	<tr>
        <td>
          <Input onChange={this.toggleProfileState.bind(this)} className={ this.state.profileState === "submitted" ? "highlighted" : "" } type="select" defaultValue={this.props.profile.state}>
            <option value="submitted">Submitted</option>
            <option value="published">Published</option>
          </Input>
        </td>
    		<td>{ this.props.profile.data.fullname }</td>
        <td>{ this.props.profile.data.email }</td>
        <td>{ date }</td>
    		<td><Button outline color="secondary" onClick={() => this.props.onSelect(this.props.profile.data.id, this.state.profileState)}>Voir</Button></td>
    	</tr>
    );
  }
}

export default DPORow;
