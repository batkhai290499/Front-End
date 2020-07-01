import React, { Component } from 'react';

class attendance extends Component {
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-lg-2">
                                {/* Large Size Modal */}
                                <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal">You Are Come In ?</button>
                                {/* Modal */}
                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">You Are Come In ?</div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleAttendance}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    
                                                                    <label className="col-sm-12 col-form-label">Time in</label>
                                                                    <div className="col-sm-10">
                                                                        <input  name="time_in" className="form-control"
                                                                            onChange={this.handleInputChange} value={new Date().toLocaleTimeString()} disabled/>
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Shift</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="cash" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5"><i className="icon-lock" />Yes</button>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default attendance;