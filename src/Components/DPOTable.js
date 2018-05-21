import React, { Component } from 'react';
import { Table } from 'reactstrap';

class DPOTable extends Component {
  render() {
    return (
      <Table>
      	<thead>
	      	<tr>
	      		<th>Etat</th>
	      		<th>Nom</th>
	      		<th>Email</th>
	      		<th>Date</th>
	      		<th/>
	      	</tr>
      	</thead>
      	<tbody>
      		{ this.props.children }
      	</tbody>
      </Table>
    );
  }
}

export default DPOTable;
