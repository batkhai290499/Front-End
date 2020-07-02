import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import Select from 'react-select';
import moment from 'moment'

class attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: [],
            id_position: '',
            money: '',
            id_attendance: '',
            selectedPosition: null,

        }
    }
    componentDidMount() {
        Axios.get('/api/attendance/views')
            .then(res => {
                if (res.status === 200) {
                    console.log(res);

                    const attendance = res.data;
                    this.setState({
                        attendance: attendance.attendance,
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
    handleInsertattendance = (event) => {
        //event.preventDefault();

        const newattendance = {
            //id_department: '',
            money: this.state.money,
            id_position: this.state.selectedPosition.value

        };
        //console.log(this.state.name);

        Axios.post('/api/attendance/insert', newattendance)
            .then(res => {
                let attendance = this.state.attendance;
                attendance = [newattendance, ...attendance];
                this.setState({ attendance: attendance });
            })
            .catch(error => console.log(error));
    };

    getDataattendance = (item) => {
        console.log(item);

        this.setState({
            id_attendance: item.id_attendance,
            money: item.money,
            id_position: item.id_position,
            position_name: item.position_name
        })
    }

    handleEditattendance = (event) => {
        event.preventDefault();

        const newEditPosition = {
            id_attendance: this.state.id_attendance,
            money: this.state.money,
            id_position: this.state.selectedPosition.value
        };
        console.log(newEditPosition);

        Axios.post('/api/attendance/edit', newEditPosition)
            .then(res => {
                console.log(res);
                let key = this.state.id_attendance;
                this.setState(prevState => ({
                    attendance: prevState.attendance.map(
                        elm => elm.id_attendance === key ? {
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
    deleteattendance = (item) => {
        console.log(item);

        const attendanceId = { id_attendance: item.id_attendance };
        //console.log(attendanceId);

        //console.log(newsId);
        Axios.post('api/attendance/delete', attendanceId)

            .then(res => {
                this.setState(
                    prevState => ({
                        attendance: prevState.attendance.filter(elm => elm.id_attendance !== item.id_attendance)
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
                            <div className="col-lg-3">
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
                                                                    <label className="col-sm-12 col-form-label">Name</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="cash" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Shift</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="cash" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Time in</label>
                                                                    <div className="col-sm-10">
                                                                        <input name="time_in" className="form-control"
                                                                            onChange={this.handleInputChange} value={new Date().toLocaleTimeString()} disabled />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Time in</label>
                                                                    <div className="col-sm-10">
                                                                        <input name="time_in" className="form-control"
                                                                            onChange={this.handleInputChange} value={new Date().toLocaleDateString()} disabled />
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
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">List attendance of Employee</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Shift</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Time In</th>
                                                        <th scope="col">Time Out</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.attendance.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.name}</th>
                                                            <th>{item.shift_name}</th>
                                                            <th>{moment(item.date).format("L")}</th>
                                                            <th>{moment(item.time_in, 'HH:mm').format("HH:mm")}</th>
                                                            <th>{
                                                                moment(item.time_out, 'HH:mm').format("HH:mm") == "00:00"
                                                                    ?
                                                                    <p></p>
                                                                    :
                                                                    moment(item.time_out, 'HH:mm').format("HH:mm")
                                                            }</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataattendance(item)}> <i className="fa fa-edit" /></button>

                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target={"#modal-animation-" + item.id_attendance} > <i className="fa fa-times" /></button>
                                                                <div className="modal fade" id={"modal-animation-" + item.id_attendance} style={{ display: 'none' }} aria-hidden="true">
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
                                                                                <button type="button" className="btn btn-white" data-dismiss="modal" onClick={() => this.deleteattendance(item)}><i className="fa fa-square" /> Yes</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>


                                                            {/* onClick={() => this.deleteattendance(item)} */}
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
                                                <div className="card-header text-uppercase">Edit attendance</div>

                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Edit attendance for Position</label>
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
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditattendance}><i className="icon-lock" />Edit</button>

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