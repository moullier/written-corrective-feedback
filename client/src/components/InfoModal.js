import React from "react";


function InfoModal (props) {
    return <h1>Hello, {props.name}</h1>;
  }
let addAssnModal = <div className="modal" id="addAssnModal" tabIndex="-1" role="dialog">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">Add New Assignment</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearNewClass}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <div className="form-group">
        <label htmlFor="inputAssnTitle">Assignment Title</label>
        <input
          type="text" 
          className="form-control mb-4"
          id="inputAssnTitle"
          name="newAssignmentTitle"
          placeholder="Enter Assignment Title"
          onChange={this.handleChange}
        />
        <label htmlFor="inputAssnDesc">Assignment Description</label>
        <input
          type="textarea"
          className="form-control mb-4"
          id="inputAssnDesc"
          name="newAssignmentDescription"
          placeholder="Enter Assignment Description"
          onChange={this.handleChange}
        />
      </div>
      <span id="noTitle" className="initiallyHidden text-center">Enter an Assignment Title</span>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-primary" onClick={this.createNewAssignment}>Save changes</button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>;