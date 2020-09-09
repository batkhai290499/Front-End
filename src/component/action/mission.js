import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert';
import Select from 'react-select';

class mission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            selectedFile: null,
            title: '',
            id_account: '',
            comment: '',
            selectedEmployee: null
        }
    }
    componentDidMount() {
        this.getAllEmployee()
    }

    getAllEmployee = () => {
        axios.get('/api/mission/viewsAllEmployee')
            .then(res => {
                if (res.status === 200) {
                    const employee = res.data;
                    var dataEmployeeOption;
                    var employeeOption = [];
                    employee.employee.forEach(e => {
                        dataEmployeeOption = { value: e.id_account, label: e.name }
                        employeeOption.push(dataEmployeeOption)
                    })
                    this.setState({
                        employee: employee.employee,
                        listEmployee: employeeOption
                    });
                }
            })
            .catch(error => console.log(error)
            );
    }
    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }
    onFileUpload = (event) => {
        event.preventDefault();
        for (let i = 0; i < this.state.selectedEmployee.length; i++) {
            const element = this.state.selectedEmployee[i];
            console.log(element);
        }
        const formData = new FormData();
        

        formData.append(
            "name_file", this.state.selectedFile.name,
        );
        formData.append(
            "title", this.state.title,
        );
        formData.append(
            "id_account", this.state.selectedEmployee.value,
        );
        formData.append(
            "comment", this.state.comment,
        );
        formData.append(
            "image", this.state.selectedFile,
        );
        axios.post('/upload', formData)
            .then(res => {
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
            })
            .catch(error => console.log(error));
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(value);

    };
    handleChangeEmployee = (selectedEmployee) => {
        this.setState({ selectedEmployee });

    }
    render() {
        const { selectedEmployee } = this.state;
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
                                                <label htmlFor="input-5" className="col-sm-2 col-form-label">Title</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="input-5" name="title"
                                                        value={this.state.title} onChange={this.handleInputChange} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="input-7" className="col-sm-2 col-form-label">Employee</label>
                                                <div className="col-sm-10">
                                                    {/* <select className=" form-control form-control multiple-select" multiple="multiple">
                                                        {
                                                            this.state.employee.map((item, key) =>
                                                                <option value={item.id_account}>{item.name}</option>
                                                            )
                                                        }

                                                    </select> */}
                                                    <Select
                                                        value={selectedEmployee}
                                                        onChange={this.handleChangeEmployee}
                                                        options={this.state.listEmployee}
                                                       // isMulti = {true}
                                                    //className = "form-control form-control multiple-select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-8" className="col-sm-2 col-form-label">Select File</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" onChange={this.onFileChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-9" className="col-sm-2 col-form-label">About Project</label>
                                                <div className="col-sm-10">
                                                    <textarea className="form-control" rows={4} id="input-9" name="comment"
                                                        value={this.state.comment} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-success" onClick={this.onFileUpload}><i className="fa fa-check-square-o" /> SAVE</button>
                                            </div>
                                        </form>
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

export default mission;