import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';


import { AddPatient } from './AddPatient';

import { EditPatient } from './EditPatient';

export class Patient extends Component {

    constructor(props) {
        super(props);
        this.state={pats:[],addModalShow:false,editModalsShow:false}
    }
    refreshList() {
        fetch(process.env.REACT_APP_API + 'patient')
            .then(response => response.json())
            .then(data => {
                this.setState({pats:data});

            });
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deletePat(patid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'patient/' + patid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
    }
}
    render(){
        const {pats,patid,patname,patadd,patphone,patdob,patdoc,patdes}=this.state;
        let addModalClose=()=>this.setState({addModalShow: false });
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>Doctor</th>
                            <th>Description</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pats.map(pat=>
                            <tr key={pat.PatientId}>
                                <td>{pat.PatientId}</td>
                                <td>{pat.PatientName}</td>
                                <td>{pat.AddressNum}</td>
                                <td>{pat.Phone}</td>
                                <td>{pat.DateofBirth}</td>
                                <td>{pat.Doctor}</td>
                                <td>{pat.DescPatient}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({
                                                editModalShow: true, patid: pat.PatientId, patname: pat.PatientName, patadd: pat.AddressNum,
                                                patphone: pat.Phone, patdob: pat.DateofBirth, patdoc: pat.Doctor, patdes: pat.DescPatient
                                            })}>
                                            Edit
                                            </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deletePat(pat.PatientId)}>
                                            Delete
                                            </Button>

                                        <EditPatient show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            patid={patid}
                                            patname={patname}
                                            patadd={patadd}
                                            patphone={patphone}
                                            patdob={patdob}
                                            patdoc={patdoc}
                                            patdes={patdes}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Patient
                    </Button>
                    <AddPatient show={this.state.addModalShow}
                        onHide={addModalClose}/>
                    
                 </ButtonToolbar>
            </div>
        )
    }
}