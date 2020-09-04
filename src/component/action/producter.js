import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
class producter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department: [],
            id_department: '',
            name: '',
        }
    }
    componentDidMount() {
        Axios.get('/api/department/views')
            .then(res => {
                if (res.status === 200) {

                    const department = res.data;
                    //console.log(department);

                    this.setState({
                        department: department.department,
                    })
                }
            })
            .catch(error => console.log(error)
            );
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        //console.log(this.state.name);
    };

    handleInsertDepartment = (event) => {
        //event.preventDefault();
        const newDepartment = {
            //id_department: '',
            name: this.state.name,
        };
        //console.log(this.state.name);
        Axios.post('/api/department/insert', newDepartment)
            .then(res => {
                let department = this.state.department;
                department = [newDepartment, ...department];
                this.setState({ department: department });
            })
            .catch(error => console.log(error));
    };

    getDataDepartment = (item) => {
        console.log(item);

        this.setState({
            id_department: item.id_department,
            name: item.department_name
        })
    }

    handleEditDepartment = (event) => {
        event.preventDefault();

        const newEditDepartment = {
            id_department: this.state.id_department,
            name: this.state.name,
        };
        console.log(newEditDepartment);

        Axios.post('/api/department/edit', newEditDepartment)
            .then(res => {
                console.log(res);

                let key = this.state.id_department;
                this.setState(prevState => ({
                    department: prevState.department.map(
                        elm => elm.id_department === key ? {
                            ...elm,
                            department_name: this.state.name
                        } : elm
                    )
                }))
                //console.log(this.state.name);
            })
            .catch(error => console.log(error));
    };

    deleteDepartment = (item) => {
        console.log(item);
        const departmentId = { id_department: item.id_department };
        //console.log(departmentId);
        //console.log(newsId);
        Axios.post('api/department/delete', departmentId)

            .then(res => {
                this.setState(
                    prevState => ({
                        department: prevState.department.filter(elm => elm.id_department !== item.id_department)
                    })
                );
                swal("Yeahh! You have successfully deleted!", {
                    icon: "success",
                });
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
                                <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal">Create Department</button>
                                {/* Modal */}
                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Create Department</div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleInsertDepartment}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Name of Department</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
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
                                        <h5 className="card-title">List Department</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Name Department</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.department.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.department_name}</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataDepartment(item)}> <i className="fa fa-edit" /></button>

                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target={"#modal-animation-" + item.id_department} > <i className="fa fa-times" /></button>
                                                                <div className="modal fade" id={"modal-animation-" + item.id_department} style={{ display: 'none' }} aria-hidden="true">
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
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deleteDepartment(item)}><i className="fa fa-square" /> Yes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>


                                                            {/* onClick={() => this.deleteDepartment(item)} */}
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
                                                <div className="card-header text-uppercase">Edit Department</div>

                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Edit Name of Department</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="name" className="form-control" placeholder={this.state.name}
                                                                            onChange={this.handleInputChange} value={this.state.name} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditDepartment}><i className="icon-lock" />Edit</button>

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

export default producter;