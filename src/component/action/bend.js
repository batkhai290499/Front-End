import React, { Component } from 'react';
import axios from 'axios'

class Bend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        axios.get('/api/account/views')
            .then(res => {
                if (res.status == 200) {
                    const news = res.data;
                    this.setState({ news: news.news });
                }
            })
            .catch(error => console.log(error)
            );
    };


    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">

                        <div className="row ">
                            <div className="col-lg-2">
                                {/* Large Size Modal */}
                                <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal">Create Account</button>
                                {/* Modal */}
                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-xl modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Create Account</div>
                                                
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Username</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Jhon Deo" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" className="form-control" placeholder="Password" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Name</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your full name" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Age</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" placeholder="Your age" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your address" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your number phone" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Department</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="pick a department" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Salary</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Input salary" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Shift</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="round input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Position</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" className="form-control" placeholder="Password Input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>{/*end row*/}
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">List Account</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Password</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Age</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Department</th>
                                                        <th scope="col">Salary</th>
                                                        <th scope="col">Shift</th>
                                                        <th scope="col">Position</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.news.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{item.username}</th>
                                                            <th>{item.password}</th>
                                                            <th>{item.name}</th>
                                                            <th>{item.age}</th>
                                                            <th>{item.address}</th>
                                                            <th>{item.phone}</th>
                                                            <th>{item.id_department}</th>
                                                            <th>{item.id_salary}</th>
                                                            <th>{item.id_shift}</th>
                                                            <th>{item.id_position}</th>
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overlay toggle-menu" />
                    </div>
                </div>

            </div>
        );
    }
}

export default Bend;