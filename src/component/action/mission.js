import React, { Component } from 'react';

class mission extends Component {
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <form id="personal-info" noValidate="novalidate">
                                            <h4 className="form-header">
                                                <i className="fa fa-file-text-o" />
                                                Mission
                                            </h4>
                                            <div className="form-group row">
                                                <label htmlFor="input-5" className="col-sm-2 col-form-label">Company</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="input-5" name="company" required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-6" className="col-sm-2 col-form-label">Interested In</label>
                                                <div className="col-sm-10">
                                                    <select className="form-control valid" id="input-6" name="intersted" required aria-invalid="false">
                                                        <option>Web Development</option>
                                                        <option>Mobile Development</option>
                                                        <option>Digital Marketing</option>
                                                        <option>Graphic Designing</option>
                                                        <option>Ecommerce Industr</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-7" className="col-sm-2 col-form-label">Budget</label>
                                                <div className="col-sm-10">
                                                    <select className="form-control valid" id="input-7" name="budget" required aria-invalid="false">
                                                        <option>BUDGET</option>
                                                        <option>Less then 2000$</option>
                                                        <option>2000$ - 10000$</option>
                                                        <option>10000$ - 20000$</option>
                                                        <option>Above 20000$</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-8" className="col-sm-2 col-form-label">Select File</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" id="input-8" name="file" required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-9" className="col-sm-2 col-form-label">About Project</label>
                                                <div className="col-sm-10">
                                                    <textarea className="form-control" rows={4} id="input-9" name="aboutuser" required defaultValue={""} />
                                                </div>
                                            </div>
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-danger"><i className="fa fa-times" /> CANCEL</button>
                                                <button type="submit" className="btn btn-success"><i className="fa fa-check-square-o" /> SAVE</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div></div>
        );
    }
}

export default mission;