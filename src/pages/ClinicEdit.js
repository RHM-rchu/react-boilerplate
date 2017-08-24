import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { PageHeader, Form, FormGroup, Col, Button, FormControl, InputGroup, Glyphicon, HelpBlock } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validateEmail } from '../helpers.js'
import { goBack } from 'react-router-redux'
import FilteredMultiSelect from 'react-filtered-multiselect'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
const BOOTSTRAP_CLASSES = {
  filter: 'form-control',
  select: 'form-control',
  button: 'btn btn btn-block btn-default',
  buttonActive: 'btn btn btn-block btn-primary',
}

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
  state = {
    selectedOptions: []
  }

  constructor(props) {
    super(props)
    this.form_type = props.initialValues.clinicUid > 0 ? 'Edit' : 'Add'

  }


  render() {

    let {selectedOptions} = this.state
console.log(`2.------>this.state`)
console.log(selectedOptions)
    const fieldsList = Object.keys(FIELDS).map(function(key, i) {
      if(FIELDS[key].glyph) {
        return <Field key={i} name={key} component={ClinicEdit.renderFieldsWGlyph}/>
      } else {
        return <Field key={i} name={key} component={ClinicEdit.renderFields}/>
      }

    })

// import options from './mockData2'
// let options = require('./mockData2')
let options = [
  {"id": 1, "name": "5*Gelish-Oplule"},
  {"id": 2, "name": "7*Uagren"},
  {"id": 3, "name": "8*Churkun"},
  {"id": 4, "name": "8401.00 Partial Photic Boundary"},
  {"id": 5, "name": "A Fine Disregard for Awkward Facts"},
  {"id": 6, "name": "A Momentary Lapse Of Sanity"},
  {"id": 7, "name": "A Series Of Unlikely Explanations"},
  {"id": 8, "name": "A Ship With A View"},
  {"id": 9, "name": "Abalule-Sheliz"},
  {"id": 10, "name": "Ablation"},
  {"id": 11, "name": "Absolutely No You-Know-What"},
  {"id": 12, "name": "Abundance Of Onslaught"},
  {"id": 13, "name": "Advanced Case Of Chronic Patheticism"},
  {"id": 14, "name": "All The Same, I Saw It First"},
  {"id": 15, "name": "All Through With This Niceness And Negotiation Stuff"},
  {"id": 16, "name": "Another Fine Product From The Nonsense Factory"},
  {"id": 17, "name": "Anticipation Of A New Lover's Arrival, The"},
  {"id": 18, "name": "Anything Legal Considered"},
  {"id": 19, "name": "Appeal To Reason"},
  {"id": 20, "name": "Arbitrary"},
  {"id": 21, "name": "Armchair Traveller"},
  {"id": 22, "name": "Arrested Development"},
  {"id": 23, "name": "Attitude Adjuster"},
  {"id": 24, "name": "Awkward Customer"},
  {"id": 25, "name": "Bad for Business"},
  {"id": 26, "name": "Beats Working"},
  {"id": 27, "name": "Big Sexy Beast"},
  {"id": 28, "name": "Bodhisattva, OAQS"},
  {"id": 29, "name": "Boo!"},
  {"id": 30, "name": "Bora Horza Gobuchul"},
  {"id": 31, "name": "Break Even"},
  {"id": 32, "name": "But Who's Counting?"},
  {"id": 33, "name": "Caconym"},
  {"id": 34, "name": "Cantankerous"},
  {"id": 35, "name": "Cargo Cult"},
  {"id": 36, "name": "Charitable View"},
  {"id": 37, "name": "Charming But Irrational"},
  {"id": 38, "name": "Clear Air Turbulence"},
  {"id": 39, "name": "Congenital Optimist"},
  {"id": 40, "name": "Contents May Differ"},
  {"id": 41, "name": "Conventional Wisdom"},
  {"id": 42, "name": "Credibility Problem"},
  {"id": 43, "name": "Death and Gravity"},
  {"id": 44, "name": "Demented But Determined"},
  {"id": 45, "name": "Determinist"},
  {"id": 46, "name": "Different Tan"},
  {"id": 47, "name": "Displacement Activity"},
  {"id": 48, "name": "Don't Try This At Home"},
  ]

    return (
      <div>
        <PageHeader>Clinic {this.form_type}</PageHeader>
        <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
          <FormGroup>
            <Col smOffset={2} sm={8}>
              {fieldsList}


              <div className="col-md-5">
                <FilteredMultiSelect
                  classNames={BOOTSTRAP_CLASSES}
                  onChange={this.multisel_handleSelectionChange}
                  options={options}
                  selectedOptions={selectedOptions}
                  textProp="name"
                  valueProp="id"
                />
                <p className="help-block">Press Enter when there's only one matching item to select it.</p>
              </div>
              <div className="col-md-5">
                {selectedOptions.length === 0 && <p>(nothing selected yet)</p>}
                {selectedOptions.length > 0 && <ol>
                  {selectedOptions.map((list, i) => <li key={list.id}>
                    {`${list.name} `}
                    <span style={{cursor: 'pointer'}} onClick={() => this.multisel_handleDeselect(i)}>
                      &times;
                    </span>
                  </li>)}
                </ol>}
              </div>

              <Button type="submit" disabled={this.props.invalid || this.props.submitting}><Glyphicon glyph="floppy-disk"/> Save Clinic </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }


  multisel_handleDeselect = (index) => {
    var selectedOptions = this.state.selectedOptions.slice()
    selectedOptions.splice(index, 1)
    this.setState({selectedOptions})
  }
  multisel_handleClearSelection = (e) => {
    this.setState({selectedOptions: []})
  }
  multisel_handleSelectionChange = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
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


  formSubmit = (values) => {
console.log(`1.------>values`)
console.log(this.state.selectedOptions)
    this.props.dispatch({
      type: 'clinics.' +  this.form_type,
      clinicUid: values.clinicUid,
      clinic: values.clinic,
      email: values.email,
    })
    // redirect to previous pages
    // this.props.dispatch(goBack())
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
    clinicUid: 0,
    clinic: '123',
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
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
}

// connect vars to ClinicEdit
export default connect(mapStateToProps)(ClinicEdit)



