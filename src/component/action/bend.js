import React, { Component } from 'react';
import axios from 'axios'

class Bend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            department: [],
            position: [],
            salary: [],
            shift: [],
            username: '',
            password: '',
            name: '',
            age: '',
            address: '',
            phone: '',
            id_department: '',
            id_salary: '',
            id_shift: '',
            id_position: '',
        }
    }

    componentDidMount() {
        this.getUser();
        this.getAllDepartment();
        this.getAllPosition();
        this.getAllSalary();
        this.getAllShift()
    };

    getUser = () => {
        axios.get('/api/account/views')
            .then(res => {
                if (res.status === 200) {
                    const news = res.data;
                    this.setState({ news: news.news });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllDepartment = () => {
        axios.get('/api/department/views')
            .then(res => {
                if (res.status === 200) {
                    const department = res.data;
                    this.setState({ department: department.department });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllPosition = () => {
        axios.get('/api/position/getAll')
            .then(res => {
                if (res.status === 200) {
                    const position = res.data;
                    this.setState({ position: position.position });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllSalary = () => {
        axios.get('/api/salary/getAll')
            .then(res => {
                if (res.status === 200) {
                    const salary = res.data;
                    this.setState({ salary: salary.salary });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllShift = () => {
        axios.get('/api/shift/getAll')
            .then(res => {
                if (res.status === 200) {
                    const shift = res.data;
                    this.setState({ shift: shift.shift });
                }
            })
            .catch(error => console.log(error)
            );
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(event);

    };

    handleInsertUser = () => {
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            age: this.state.age,
            address: this.state.address,
            phone: this.state.phone,
            id_department: this.state.id_department,
            id_position: this.state.id_position,
            id_salary: this.state.id_salary,
            id_shift: this.state.id_shift,
        };

        axios.post('/api/user/insert', newUser)
            .then(res => {
                let news = this.state.news;
                news = [newUser, ...news];
                this.setState({ news: news });
            })
            .catch(error => console.log(error));
    }
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
                                                    <form onSubmit={this.handleInsertUser}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Username</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="username" className="form-control" placeholder="Jhon Deo" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Name</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your full name" name="name" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Age</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" placeholder="Your age" name="age" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your address" name="address" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" placeholder="Your number phone" name="phone" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Department</label>
                                                                    <select className="form-control single-select select2-hidden-accessiblecol-sm-10" aria-hidden="true"
                                                                        name="id_department" onChange={this.handleInputChange}>
                                                                        {this.state.department.map((item, key) =>
                                                                            <option value={item.id_department} key={key}>{item.department_name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>


                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Salary</label>
                                                                    <select className="form-control single-select select2-hidden-accessiblecol-sm-10" aria-hidden="true"
                                                                        name="id_salary" onChange={() => this.handleInputChange()}>
                                                                        {this.state.salary.map((item, key) =>
                                                                            <option value={item.id_salary} key={key}>{item.money + ' $'}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Shift</label>
                                                                    <select className="form-control single-select select2-hidden-accessiblecol-sm-10" aria-hidden="true"
                                                                        name="id_shift" onChange={() => this.handleInputChange()}>
                                                                        {this.state.shift.map((item, key) =>
                                                                            <option value={item.id_shift} key={key}>{item.shift_name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Position</label>
                                                                    <select className="form-control single-select select2-hidden-accessiblecol-sm-10" aria-hidden="true"
                                                                        name="id_position" onChange={() => this.handleInputChange()}>
                                                                        {this.state.position.map((item, key) =>
                                                                            <option value={item.id_position} key={key}>{item.position_name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-light px-5"><i className="icon-lock" />Submit</button>
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
                                                        <th scope="col">Function</th>
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
                                                            <th>{item.department_name}</th>
                                                            <th>{item.money + ' $'}</th>
                                                            <th>{item.shift_name}</th>
                                                            <th>{item.position_name}</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataUser(item)}> <i className="fa fa-edit" /></button>

                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target={"#modal-animation-" + item.id_account} > <i className="fa fa-times" /></button>
                                                                <div className="modal fade" id={"modal-animation-" + item.id_account} style={{ display: 'none' }} aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content animated bounceIn">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">Alert</h5>
                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">×</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <p>Do you want delete {this.state.name}</p>
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-light" data-dismiss="modal"><i className="fa fa-times" /> No</button>
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deleteUser(item)}><i className="fa fa-square" /> Yes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
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