import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment'

class shift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: [],
            id_shift: '',
            name:'',
            time_in: '',
            time_out: ''
        }
    }
    componentDidMount() {
        Axios.get('/api/shift/views')
            .then(res => {
                if (res.status === 200) {
                    console.log(res);

                    const shift = res.data;
                    this.setState({
                        shift: shift.shift,
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
        console.log(this.state.name);

    };

    handleInsertShift = (event) => {
        //event.preventDefault();

        const newShift = {
            //id_department: '',
            name: this.state.name,
            time_in: this.state.time_in,
            time_out: this.state.time_out
        };
        //console.log(this.state.name);

        Axios.post('/api/shift/insert', newShift)
            .then(res => {
                let shift = this.state.shift;
                shift = [newShift, ...shift];
                this.setState({ shift: shift });
            })
            .catch(error => console.log(error));
    };

    getDataShift = (item) => {
        console.log(item);

        this.setState({
            id_shift: item.id_shift,
            time_in: item.time_in,
            time_out: item.time_out
        })
    }

    handleEditShift = (event) => {
        event.preventDefault();

        const newEditShift = {
            name: this.state.name,
            time_in: this.state.time_in,
            time_out: this.state.time_out
        };
        console.log(newEditShift);

        Axios.post('/api/salary/edit', newEditShift)
            .then(res => {
                console.log(res);
                let key = this.state.id_shift;
                this.setState(prevState => ({
                    shift: prevState.shift.map(
                        elm => elm.id_shift === key ? {
                            ...elm,
                            name: this.state.name,
                            time_in: this.state.time_in,
                            time_out: this.state.time_out
                        } : elm
                    )
                }))
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
                //console.log(this.state.name);
            })
            .catch(error => console.log(error));
    };

    deleteShift = (item) => {
        console.log(item);

        const shiftId = { id_shift: item.id_shift };
        //console.log(shiftId);

        //console.log(newsId);
        Axios.post('api/salary/delete', shiftId)

            .then(res => {
                this.setState(
                    prevState => ({
                        salary: prevState.salary.filter(elm => elm.id_shift !== item.id_shift)
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
                                <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal">Create Shift</button>
                                {/* Modal */}
                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Create Shift</div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleInsertShift}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Name of Shift</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="cash" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Time in</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="time_in" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Time out</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="time_out" className="form-control"
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
                                        <h5 className="card-title">List Shift</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Time in</th>
                                                        <th scope="col">Time out</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.shift.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.name }</th>
                                                            <th>{moment(item.time_in, 'HH:mm').format("HH:mm")}</th>
                                                            <th>{moment(item.time_out, 'HH:mm').format("HH:mm")}</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataShift(item)}> <i className="fa fa-edit" /></button>

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
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deleteShift(item)}><i className="fa fa-square" /> Yes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>


                                                            {/* onClick={() => this.deleteShift(item)} */}
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
                                                                        <input type="text" name="id_position" className="form-control" 
                                                                            onChange={this.handleInputChange} value={this.state.id_position} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditShift}><i className="icon-lock" />Edit</button>

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

export default shift;