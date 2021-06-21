import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {docs:[]}
    }
    refreshList() {
        fetch(process.env.REACT_APP_API+'doctor')
            .then(response => response.json())
            .then(data => {
                this.setState({docs:data});

            });
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    render() {
        const {docs} = this.state;
        return (
            <div>
                <Table className="mt-4" striped bordered hover-size="sm">
                    <thead>
                        <tr>
                            <th>Doctor Id</th>
                            <th>Doctor Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map(doc =>
                            <tr key={doc.DoctorId}>
                                <td>{doc.DoctorId}</td>
                                <td>{doc.DoctorName}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}