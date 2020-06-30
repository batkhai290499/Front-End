import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import Select from 'react-select';

class salary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: [],
            id_position: '',
            money: '',
            id_salary: '',
            selectedPosition: null,

        }
    }
    componentDidMount() {
        Axios.get('/api/salary/views')
            .then(res => {
                if (res.status === 200) {
                    console.log(res);

                    const salary = res.data;
                    this.setState({
                        salary: salary.salary,
                    })
                }
            })
            .catch(error => console.log(error)
            );
        this.getAllPosition()
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(this.state.name);

    };
    getAllPosition = () => {
        Axios.get('/api/position/getAll')
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
                    console.log(this.state.listPosition);

                }
            })
            .catch(error => console.log(error)
            );
    }
    handleChangePosition = (selectedPosition) => {
        this.setState({ selectedPosition });
    }
    handleInsertSalary = (event) => {
        //event.preventDefault();

        const newSalary = {
            //id_department: '',
            money: this.state.money,
            id_position: this.state.selectedPosition.value

        };
        //console.log(this.state.name);

        Axios.post('/api/salary/insert', newSalary)
            .then(res => {
                let salary = this.state.salary;
                salary = [newSalary, ...salary];
                this.setState({ salary: salary });
            })
            .catch(error => console.log(error));
    };

    getDataSalary = (item) => {
        console.log(item);

        this.setState({
            id_salary: item.id_salary,
            money: item.money,
            id_position: item.id_position,
            position_name: item.position_name
        })
    }

    handleEditSalary = (event) => {
        event.preventDefault();

        const newEditPosition = {
            id_salary: this.state.id_salary,
            money: this.state.money,
            id_position: this.state.selectedPosition.value
        };
        console.log(newEditPosition);

        Axios.post('/api/salary/edit', newEditPosition)
            .then(res => {
                console.log(res);
                let key = this.state.id_salary;
                this.setState(prevState => ({
                    salary: prevState.salary.map(
                        elm => elm.id_salary === key ? {
                            ...elm,
                            money: this.state.money,
                            id_position: this.state.id_position
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
    deleteSalary = (item) => {
        console.log(item);

        const salaryId = { id_salary: item.id_salary };
        //console.log(salaryId);

        //console.log(newsId);
        Axios.post('api/salary/delete', salaryId)

            .then(res => {
                this.setState(
                    prevState => ({
                        salary: prevState.salary.filter(elm => elm.id_salary !== item.id_salary)
                    })
                );
                swal("Yeahh! You have successfully deleted!", {
                    icon: "success",
                });
            })
            .catch(error => console.log(error));
    }
    render() {
        const { selectedPosition } = this.state;
        
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-lg-2">
                                {/* Large Size Modal */}
                                <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal">Create Salary</button>
                                {/* Modal */}
                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Create Salary</div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleInsertSalary}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Money</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="cash" name="money" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Position</label>
                                                                    <div className="col-sm-10">
                                                                        {/* <input type="text" name="id_position" className="form-control"
                                                                            onChange={this.handleInputChange} /> */}
                                                                        <Select
                                                                            value={selectedPosition}
                                                                            onChange={this.handleChangePosition}
                                                                            options={this.state.listPosition}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5"><i className="icon-lock" />Submit</button>
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
                                        <h5 className="card-title">List Salary of Employee</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Position</th>
                                                        <th scope="col">Salary</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.salary.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.position_name}</th>
                                                            <th>{item.money + ' $'}</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataSalary(item)}> <i className="fa fa-edit" /></button>

                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target={"#modal-animation-" + item.id_salary} > <i className="fa fa-times" /></button>
                                                                <div className="modal fade" id={"modal-animation-" + item.id_salary} style={{ display: 'none' }} aria-hidden="true">
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
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deleteSalary(item)}><i className="fa fa-square" /> Yes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>


                                                            {/* onClick={() => this.deleteSalary(item)} */}
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal */}
                                <div className="modal fade" id="formemodaledit" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Edit Salary</div>

                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Edit Salary for Position</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="money" className="form-control"
                                                                            onChange={this.handleInputChange} value={this.state.money} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Edit Position</label>
                                                                    <div className="col-sm-10">
                                                                        {/* <input type="text" name="id_position" className="form-control"
                                                                            onChange={this.handleInputChange} value={this.state.position_name} /> */}
                                                                        <Select
                                                                            value={selectedPosition}
                                                                            onChange={this.handleChangePosition}
                                                                            options={this.state.listPosition}
                                                                            placeholder={this.state.position_name}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditSalary}><i className="icon-lock" />Edit</button>

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

export default salary;