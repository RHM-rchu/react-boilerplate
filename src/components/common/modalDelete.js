import React from "react"
import { Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"

/**
 *
 * Render Modal to confirm delete: float window from react-bootstrap
 *
 */
class ModalDelete extends React.Component {

  constructor(props){
    super(props)
    this.modalDeleteHide = this.modalDeleteHide.bind(this)
    this.itemDelete = this.itemDelete.bind(this)
  }

  render() {
    const {show, user, hideDelete, itemDelete} = this.props
    return(
      <Modal show={this.props.modalDelete.show}>
        <Modal.Header>
          <Modal.Title>
            <b>{this.props.modalDelete.component}</b><br />
            {this.props.modalDelete.message} &nbsp;
            <strong>{this.props.modalDelete.name}</strong>!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.modalDeleteHide}>No</Button>
          <Button bsStyle="primary" onClick={this.itemDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  /**
   *
   * Close Prompt to delete Clinic:
   *  onClick action from `render()`
   *  dispatch values
   *
   */
  modalDeleteHide(event) {
    this.props.dispatch({
      type: 'modal.modalDeleteHide',
    })
  }

  /**
   *
   * Delete Clinic
   *
   */
  itemDelete(event){
    this.props.dispatch({
      type: 'modal.modalClinicDelete',
      id: this.props.modalDelete.id
    })
    // hide modal
    this.props.dispatch({
      type: 'modal.modalDeleteHide',
    })

  }

}


/**
 *
 * onClick method from component Element like .src/components/ClinicListElement.js
 *
 */
function mapStateToProps(state) {
  // set data for delete modal
  let modalDelete
  if(state.theDatas.modal && state.theDatas.modal.listDelete) {
    modalDelete = state.theDatas.modal.listDelete
  } else {
    modalDelete = {
      show: false,
      id: 0,
      name: '',
      message: '',
      component: '',
    }
  }

  return {
    modalDelete: modalDelete
  }
}

// connect method to get access to state
export default connect(mapStateToProps)(ModalDelete)
