import React, { Component } from 'react';
import axios from 'axios'
import Select from 'react-select';
import swal from 'sweetalert';
import openSocket from 'socket.io-client';

class Bend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            department: [],
            position: [],
            salary: [],
            shift: [],
            listById: [],
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
            id_role: '',
            selectedDepartment: null,
            selectedPosition: null,
            selectedSalary: null,
            selectedShift: null,
            selectedRole: null,
        }
    }

    componentDidMount() {
        this.getUser();
        this.getAllDepartment();
        this.getAllPosition();
        this.getAllSalary();
        this.getAllShift();
        this.getAllRole()
    };
    componentWillMount() {
        let socket = openSocket('http://localhost:4000/test')
         console.log(socket);
    }
    getUser = () => {
        axios.get('/api/account/views')
            .then(res => {
                if (res.status === 200) {
                    const news = res.data;
                    this.setState({ news: news.news });
                    console.log(this.state.news);

                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllDepartment = () => {
        axios.get('/api/department/getAll')
            .then(res => {
                if (res.status === 200) {

                    const department = res.data;
                    //console.log(department);

                    var dataDepartmentOption;
                    var departmentOption = [];
                    department.department.forEach(e => {
                        dataDepartmentOption = { value: e.id_department, label: e.department_name };
                        departmentOption.push(dataDepartmentOption);
                    });
                    this.setState({
                        department: department.department,
                        listDepartment: departmentOption
                    });
                    //console.log(this.state.listDepartment);
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
                    var dataPositionOption;
                    var positionOption = [];

                    position.position.forEach(e => {
                        dataPositionOption = { value: e.id_position, label: e.position_name }
                        positionOption.push(dataPositionOption)
                    })
                    this.setState({
                        position: position.position,
                        listPosition: positionOption
                    });
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
                    var dataSalaryOption;
                    var salaryOption = [];
                    salary.salary.forEach(e => {
                        dataSalaryOption = { value: e.id_salary, label: e.money + '$' }
                        salaryOption.push(dataSalaryOption)
                    })

                    this.setState({
                        salary: salary.salary,
                        listSalary: salaryOption
                    });
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
                    var dataShiftOption;
                    var shiftOption = [];
                    shift.shift.forEach(e => {
                        dataShiftOption = { value: e.id_shift, label: e.shift_name }
                        shiftOption.push(dataShiftOption)
                    })
                    this.setState({
                        shift: shift.shift,
                        listShift: shiftOption
                    });
                }
            })
            .catch(error => console.log(error)
            );
    }

    getAllRole = () => {
        axios.get('/api/role/getAll')
            .then(res => {
                if (res.status === 200) {
                    const role = res.data;
                    var dataRoleOption;
                    var roleOption = [];
                    role.role.forEach(e => {
                        dataRoleOption = { value: e.id_role, label: e.role_name }
                        roleOption.push(dataRoleOption)
                    })
                    this.setState({
                        role: role.role,
                        listRole: roleOption
                    });
                    console.log(this.state.listRole);

                }
            })
            .catch(error => console.log(error)
            );
    }

    getAllUserById = (item) => {
        axios.get(`/api/account/getById/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const listById = res.data[0];
                    // var dep = this.state.listDepartment.filter((value) => {
                    //     console.log(value.value)
                    //     return  value.value == listById.id_department
                    // })
                    this.setState({
                        listById: listById.listById,
                        id_account: listById.id_account,
                        username: listById.username,
                        password: listById.password,
                        name: listById.name,
                        age: listById.age,
                        address: listById.address,
                        phone: listById.phone,
                        selectedDepartment: { value: listById.id_department, label: listById.department_name },
                        selectedSalary: { value: listById.id_salary, label: listById.money },
                        selectedShift: { value: listById.id_shift, label: listById.shift_name },
                        selectedPosition: { value: listById.id_position, label: listById.position_name },
                        selectedRole: { value: listById.id_role, label: listById.role_name }
                    });
                    console.log(this.state.selectedDepartment);
                }
            })
            .catch(error => console.log(error)
            );
    }

    handleChangeDepartment = (selectedDepartment) => {
        this.setState({ selectedDepartment });
    }

    handleChangePosition = (selectedPosition) => {
        this.setState({ selectedPosition });
    }

    handleChangeSalary = (selectedSalary) => {
        this.setState({ selectedSalary });
    }

    handleChangeShift = (selectedShift) => {
        this.setState({ selectedShift });
    }

    handleChangeRole = (selectedRole) => {
        this.setState({ selectedRole });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(value);

    };

    handleInsertUser = (event) => {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            age: this.state.age,
            address: this.state.address,
            phone: this.state.phone,
            id_department: this.state.selectedDepartment.value,
            id_position: this.state.selectedPosition.value,
            id_salary: this.state.selectedSalary.value,
            id_shift: this.state.selectedShift.value,
            id_role: this.state.selectedRole.value,
        };

        axios.post('/api/user/insert', newUser)
            .then(res => {
                let news = this.state.news;
                news = [newUser, ...news];
                this.setState({ news: news });
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
                this.modalClose()
            })


            .catch(error => console.log(error));
    }

    getDataAccount = (item) => {
        console.log(item);

        this.setState({
            id_account: item.id_account,
            username: item.username,
            password: item.password,
            name: item.name,
            age: item.age,
            address: item.address,
            phone: item.phone,
            department_name: item.department_name,
            money: item.money,
            shift_name: item.shift_name,
            position_name: item.position_name,
            role_name: item.role_name
        })

    }
    handleEditUser = (event) => {
        event.preventDefault();

        const newEditUser = {
            id_account: this.state.id_account,
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            age: this.state.age,
            address: this.state.address,
            phone: this.state.phone,
            id_department: this.state.selectedDepartment.value,
            id_position: this.state.selectedPosition.value,
            id_salary: this.state.selectedSalary.value,
            id_shift: this.state.selectedShift.value,
            id_role: this.state.selectedRole.value,
        };
        console.log(newEditUser);

        axios.post('/api/user/edit', newEditUser)
            .then(res => {
                console.log(res);
                let key = this.state.id_account;
                this.setState(prevState => ({
                    news: prevState.news.map(
                        elm => elm.id_account === key ? {
                            ...elm,
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
                            id_role: this.state.id_role,
                        } : elm
                    )
                }))
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
                this.modalClose()
                //console.log(this.state.name);
            })
            .catch(error => console.log(error));
    };
    modalClose = () => {
        this.componentDidMount();
    }

    render() {
        const { selectedDepartment } = this.state;
        const { selectedPosition } = this.state;
        const { selectedSalary } = this.state;
        const { selectedShift } = this.state;
        const { selectedRole } = this.state;
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
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
                                                                <label className="col-sm-3 col-form-label">Department</label>
                                                                <Select
                                                                    value={selectedDepartment}
                                                                    onChange={this.handleChangeDepartment}
                                                                    options={this.state.listDepartment}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-3 col-form-label">Position</label>
                                                                <Select
                                                                    value={selectedPosition}
                                                                    onChange={this.handleChangePosition}
                                                                    options={this.state.listPosition}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-3 col-form-label">Shift</label>
                                                                <Select
                                                                    value={selectedShift}
                                                                    onChange={this.handleChangeShift}
                                                                    options={this.state.listShift}
                                                                />
                                                            </div>

                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-3 col-form-label">Salary</label>
                                                                <Select
                                                                    value={selectedSalary}
                                                                    onChange={this.handleChangeSalary}
                                                                    options={this.state.listSalary}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-3 col-form-label">Role</label>
                                                                <Select
                                                                    value={selectedRole}
                                                                    onChange={this.handleChangeRole}
                                                                    options={this.state.listRole}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <button type="submit" className="btn btn-light px-5"><i className="icon-lock" />Submit</button>
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
                                                        <th scope="col">Role</th>
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
                                                            <th>{item.role_name}</th>

                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getAllUserById(item.id_account)}> <i className="fa fa-edit" /></button>

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
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deletePosition(item)}><i className="fa fa-square" /> Yes</button>
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
                                <div className="modal fade" id="formemodaledit" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Edit Account</div>
                                                <div className="card-body">
                                                    <form >
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Username</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="username" className="form-control"
                                                                            value={this.state.username} onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Password</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="password" className="form-control"
                                                                            value={this.state.password} name="password" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Name</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control"
                                                                            value={this.state.name} name="name" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Age</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control"
                                                                            value={this.state.age} name="age" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Address</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control"
                                                                            value={this.state.address} name="address" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Phone</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control"
                                                                            value={this.state.phone} name="phone" onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-12 col-form-label">Department</label>
                                                                <Select
                                                                    value={selectedDepartment}
                                                                    onChange={this.handleChangeDepartment}
                                                                    options={this.state.listDepartment}
                                                                    placeholder={this.state.department_name}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-12 col-form-label">Position</label>
                                                                <Select
                                                                    value={selectedPosition}
                                                                    onChange={this.handleChangePosition}
                                                                    options={this.state.listPosition}
                                                                    placeholder={this.state.position_name}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-12 col-form-label">Shift</label>
                                                                <Select
                                                                    value={selectedShift}
                                                                    onChange={this.handleChangeShift}
                                                                    options={this.state.listShift}
                                                                    placeholder={this.state.shift_name}
                                                                />
                                                            </div>

                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-12 col-form-label">Salary</label>
                                                                <Select
                                                                    value={selectedSalary}
                                                                    onChange={this.handleChangeSalary}
                                                                    options={this.state.listSalary}
                                                                    placeholder={this.state.money}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <label className="col-sm-12 col-form-label">Role</label>
                                                                <Select
                                                                    value={selectedRole}
                                                                    onChange={this.handleChangeRole}
                                                                    options={this.state.listRole}
                                                                    placeholder={this.state.role_name}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-lg-6 col-xl-6">
                                                                <button type="submit" className="btn btn-light px-5" onClick={this.handleEditUser}><i className="icon-lock" />Submit</button>
                                                            </div>

                                                        </div>{/*end row*/}
                                                    </form>
                                                </div>
                                            </div>

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