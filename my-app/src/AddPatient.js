import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


export class AddPatient extends Component{
    constructor(props){
        super(props);
        this.state = {docs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API + 'doctor')
            .then(response => response.json())
            .then(data => {
                this.setState({docs:data});
            });
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'patient', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PatientId:null,
                PatientName:event.target.PatientName.value,
                AddressNum:event.target.AddressNum.value,
                Phone:event.target.Phone.value,
                DateofBirth:event.target.DateofBirth.value,
                Doctor:event.target.Doctor.value,
                DescPatient:event.target.DescPatient.value
            })
        })
            .then(res => {
                console.log(res)
            })
                .catch(error=>{
                    console.log('Failed');
                })
    }
        render(){
            return (
            <div className="container">
                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Patient
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="PatientName">
                                        <Form.Label>Patient Name</Form.Label>
                                        <Form.Control type="text" name="PatientName" required
                                            placeholder="Patient Name"/>
                                        </Form.Group>

                                        <Form.Group controlId="AddressNum">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="AddressNum" required
                                                placeholder="Address" />
                                        </Form.Group>

                                        <Form.Group controlId="Phone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" name="Phone" required
                                                placeholder="Phone" />
                                        </Form.Group>

                                        <Form.Group controlId="DateofBirth">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control type="date" name="DateofBirth" required
                                                placeholder="Date of Birth" />
                                        </Form.Group>

                                        <Form.Group controlId="Doctor">
                                            <Form.Label>Doctor</Form.Label>
                                            <Form.Control as="select" name="Doctor">
                                                {this.state.docs.map(doc=>
                                                    <option key={doc.DoctorId}>{doc.DoctorName}</option>)}
                                             </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="DescPatient">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" name="DescPatient" required
                                                placeholder="Description" />
                                        </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Patient
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
            )
    }
}