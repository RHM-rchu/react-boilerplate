import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { PageHeader, Form, FormGroup, Col, Button, FormControl, InputGroup, Glyphicon, HelpBlock } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validateEmail } from '../helpers.js'
import { goBack } from 'react-router-redux'




/**
 *
 * Define Form elelemnts and attribues for output
 *
 */
const FIELDS = {
  clinic: {
    type: 'input',
    label: 'Clinc Name',
    id: 'clinicname',
    placeholder: 'Clinicname',
    validate: ['blank']
  },
  email: {
    type: 'input',
    label: 'email',
    id: 'email',
    placeholder: 'Email',
    validate: ['blank', 'email'],
    glyph: 'envelope'
  },
}

/**
 *
 * Edit List Clinics
 *
 */
class ClinicEdit extends React.Component {
  // add or edit form_data
  // form_type

  constructor(props) {
    super(props)
    this.form_type = props.initialValues.clinicUid > 0 ? 'Edit' : 'Add'

    // bind <this> to formSubmit
    this.formSubmit = this.formSubmit.bind(this)
  }


  render() {

    const fieldsList = Object.keys(FIELDS).map(function(key, i) {
      if(FIELDS[key].glyph) {
        return <Field key={i} name={key} component={ClinicEdit.renderFieldsWGlyph}/>
      } else {
        return <Field key={i} name={key} component={ClinicEdit.renderFields}/>
      }

    })

    return (
      <div>
        <PageHeader>Clinic {this.form_type}</PageHeader>
        <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
          <FormGroup>
            <Col smOffset={2} sm={8}>
              {fieldsList}
              <Button type="submit" disabled={this.props.invalid || this.props.submitting}><Glyphicon glyph="floppy-disk"/> Save Clinic </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }


  /**
   *
   * Render a Generic form field
   *
   */
  static renderFields(props) {
    const fieldConfig = FIELDS[props.input.name]
    return (
      <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
        <Col sm={3}>{fieldConfig.label}</Col>
        <Col sm={8}>
          <FormControl {...props.input} id={fieldConfig.id} type={fieldConfig.type} placeholder={fieldConfig.placeholder}/>
          <FormControl.Feedback/>
          <HelpBlock>{props.meta.touched && props.meta.error ? props.meta.error : null}</HelpBlock>
        </Col>
      </FormGroup>
    )
  }
  static renderFieldsWGlyph(props) {
    const fieldConfig = FIELDS[props.input.name]
    return (
      <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
        <Col sm={3}>{fieldConfig.label}</Col>
        <Col sm={8}>
          <InputGroup>
            <FormControl {...props.input} id={fieldConfig.id} type={fieldConfig.type} placeholder={fieldConfig.placeholder}/>
            <InputGroup.Addon>
              <Glyphicon glyph={fieldConfig.glyph}/>
            </InputGroup.Addon>
          </InputGroup>
          <FormControl.Feedback/>
          <HelpBlock>{props.meta.touched && props.meta.error ? props.meta.error : null}</HelpBlock>
        </Col>
      </FormGroup>
    )
  }


  // form submit
  formSubmit(values) {
    // console.log(values)
    this.props.dispatch({
      type: 'clinics.' +  this.form_type,
      clinicUid: values.clinicUid,
      clinic: values.clinic,
      email: values.email,
    })

    // redirect to previous pages
    this.props.dispatch(goBack())
  }

}




// decorate component
ClinicEdit = reduxForm({
  form: 'clinic_edit', //unique form name
  fields: _.keys(FIELDS),
  validate: validate,
}, null, null)(ClinicEdit)


// validate form
function validate(values) {
  let errors = {}
  _.each(FIELDS, (type, field) => {
    _.each(FIELDS[field].validate, (check, key) => {
      switch(check) {
      case 'email':
        if(! validateEmail(values[field])) {
          return errors.email = `${field} format is invalid`
        }
        break
      case 'blank':
      default:
        if(!values[field]) {
          return errors[field] = `Enter a ${field}`
        }
        break
      }
    })
  })
  return errors
}

// get selected item, defalt
function mapStateToProps(state, ownProps) {
  let form_data = {
    id: 0,
    clinic: '',
    email: '',
  }

  _.each(state.theDatas.list, (clinic, field) => {
    if(clinic.clinicUid === Number(ownProps.params.id)) {
      form_data = clinic
    }
  })

  return {
    initialValues: form_data
  }

}

ClinicEdit.propTypes = {
  initialValues: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
}

// connect vars to ClinicEdit
export default connect(mapStateToProps)(ClinicEdit)



