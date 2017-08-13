import React from 'react'
import { PageHeader, Form, FormGroup, Col, Button, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

/**
 *
 * Edit List Clinics
 *
 */
class ClinicEdit extends React.Component {
  // add or edit form_data
  form_type

  constructor(props) {
    super(props)
    this.form_type = props.initialValues.clinicUid > 0 ? 'edit' : 'add'
  }

  render() {
    return (
      <div>
        <PageHeader>Clinic {'edit' === this.form_type ? 'Edit' : 'Add'}</PageHeader>
        <Form horizontal>
          <Field name="clinic" component={ClinicEdit.renderClinicName}/>
          <Field name="email" component={ClinicEdit.renderEmail}/>
          <FormGroup>
            <Col smOffset={2} sm={8}>
              <Button type="submit">Save Clinic</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  /**
   *
   * Render the clinic name form field
   *
   */
  static renderClinicName(props) {
    return (
      <FormGroup>
        <Col sm={2}>ClincName</Col>
        <Col sm={8}>
          <FormControl {...props.input} id="clinicname" type="text" placeholder="Clinicname"/>
        </Col>
      </FormGroup>
    )
  }

  /**
   *
   * Render the email name form field
   *
   */
  static renderEmail(props) {
    return (
      <FormGroup>
        <Col sm={2}>Email</Col>
        <Col sm={8}>
          <InputGroup>
            <FormControl {...props.input} id="email" type="text" placeholder="Email"/>
            <InputGroup.Addon>
              <Glyphicon glyph="email"/>
            </InputGroup.Addon>
          </InputGroup>
        </Col>
      </FormGroup>
    )
  }

}



// decorate component
ClinicEdit = reduxForm({
  form: 'clinic_edit',
}, null, null)(ClinicEdit)

// export connected class
function mapStateToProps(state, own_props) {
  let form_data = {
    id: 0,
    clinic: '',
    email: '',
  }
  for(const clinic of state.theDatas.list) {
    if(clinic.clinicUid === Number(own_props.params.id)) {
      form_data = clinic
    }
  }
  return {
    initialValues: form_data
  }

}

export default connect(mapStateToProps)(ClinicEdit)



