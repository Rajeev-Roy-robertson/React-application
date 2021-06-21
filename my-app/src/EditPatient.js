import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditPatient extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'patient', {
            method: 'PUT',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PatientId: event.target.PatientId.value,
                PatientName: event.target.PatientName.value,
                AddressNum: event.target.AddressNum.value,
                Phone: event.target.Phone.value,
                DateofBirth: event.target.DateofBirth.value,
                Doctor: event.target.Doctor.value,
                DescPatient: event.target.DescPatient.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');

                })
    }
    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Patient
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form OnSubmit={this.handleSubmit}>
                                    <Form.Group ControlId="PatientId">
                                        <Form.Label>Patient ID</Form.Label>
                                        <Form.Control type="text" name="PatientId" required
                                            disabled
                                            defaultValue={this.props.patid}
                                            placeholder="Patient ID" />
                                    </Form.Group>

                                    <Form.Group controlId="PatientName">
                                        <Form.Label>Patient Name</Form.Label>
                                        <Form.Control type="text" name="PatientName" required
                                            defaultValue={this.props.patname}
                                            placeholder="Patient Name" />
                                    </Form.Group>

                                    <Form.Group controlId="AddresssNum">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="AddressNum" required
                                            defaultValue={this.props.patadd}
                                            placeholder="Patient Address" />
                                    </Form.Group>

                                    <Form.Group controlId="Phone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" name="Phone" required
                                            defaultValue={this.props.patphone}
                                            placeholder="Patient Phone" />
                                    </Form.Group>

                                    <Form.Group controlId="DateofBirth">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control type="date" name="DateofBirth" required
                                            defaultValue={this.props.patdob}
                                            placeholder="Date of Birth" />
                                    </Form.Group>

                                    <Form.Group controlId="Doctor">
                                        <Form.Label>Doctor</Form.Label>
                                        <Form.Control type="text" name="Doctor" required
                                            defaultValue={this.props.patdoc}
                                            placeholder="Doctor" />
                                    </Form.Group>

                                    <Form.Group controlId="DescPatient">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="DescPatient" required
                                            defaultValue={this.props.patdes}
                                            placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Patient
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