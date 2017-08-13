import React from 'react'
import { PageHeader, Form, FormGroup, Col, Button, FormControl, InputGroup, Glyphicon, HelpBlock } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validateEmail } from '../helpers.js'



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
    this.form_type = props.initialValues.clinicUid > 0 ? 'Edit' : 'Add'
  }

  render() {
    return (
      <div>
        <PageHeader>Clinic {this.form_type}</PageHeader>
        <Form horizontal>
          <Field name="clinic" component={ClinicEdit.renderClinicName}/>
          <Field name="email" component={ClinicEdit.renderEmail}/>
          <FormGroup>
            <Col smOffset={2} sm={8}>
              <Button type="submit" disabled={this.props.invalid || this.props.submitting}><Glyphicon glyph="floppy-disk"/> Save Clinic </Button>
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
      <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
        <Col sm={2}>ClincName</Col>
        <Col sm={8}>
          <FormControl {...props.input} id="clinicname" type="text" placeholder="Clinicname"/>
          <FormControl.Feedback/>
          <HelpBlock>{props.meta.touched && props.meta.error ? props.meta.error : null}</HelpBlock>
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
              <Glyphicon glyph="envelope"/>
            </InputGroup.Addon>
          </InputGroup>
          <FormControl.Feedback/>
          <HelpBlock>{props.meta.touched && props.meta.error ? props.meta.error : null}</HelpBlock>
        </Col>
      </FormGroup>
    )
  }

}



// decorate component
ClinicEdit = reduxForm({
  form: 'clinic_edit', //unique form name
  validate: function(values) {
    let errors = {}
    if(!values.email) {
      errors.email = "Email is required"
    } else if(! validateEmail(values.email)) {
      errors.email = "Email format is invalid"
    }
    if(!values.clinic) {
      errors.clinic = "Clinic Name is required"
    }
    return errors
  },
}, null, null)(ClinicEdit)

// get selected item, defalt
function mapStateToProps(state, ownProps) {
  let form_data = {
    id: 0,
    clinic: '',
    email: '',
  }
  for(const clinic of state.theDatas.list) {
    if(clinic.clinicUid === Number(ownProps.params.id)) {
      form_data = clinic
    }
  }
  return {
    initialValues: form_data
  }

}

// connect vars to ClinicEdit
export default connect(mapStateToProps)(ClinicEdit)



