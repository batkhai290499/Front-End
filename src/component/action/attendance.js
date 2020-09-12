import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import Select from 'react-select';
import moment from 'moment'
import ReactExport from "react-data-export";
import ReactPaginate from 'react-paginate';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: [],
            attendanceAll: [],
            date: '',
            id_attendance: '',
            id_shift: '',
            id_account: '',
            time_in: '',
            shift: [],
            shift_name: '',
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            salary: [],
            totalSalary: ''
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    componentDidMount() {
        this.getAttendanceById();
        this.getAllUserById()
        this.getAllAttendance()
    };
    getAttendanceById() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        Axios.get(`/api/attendances/views/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {

                    const attendance = res.data;
                    this.setState({
                        attendance: attendance.attendance,
                    })


                }
            })
            .catch(error => console.log(error)
            );
    }

    getAllAttendance() {
        Axios.get(`/api/attendance/views`)
            .then(res => {
                if (res.status === 200) {
                    const attendanceAll = res.data;
                    this.setState({
                        attendanceAll: attendanceAll.attendanceAll,
                    })
                    var a = []
                    var b = 0
                    var salaryEachDay = 0
                    for (let i = 0; i < this.state.attendanceAll.length; i++) {
                        var element = this.state.attendanceAll[i];
                        console.log(element);
                        var startDate = Date.parse(element.time_in);
                        var endDate = Date.parse(element.time_out);

                        var totalTime = Math.floor((endDate - startDate) / (1000 * 60 * 60));
                        console.log(totalTime);

                        var salary = element.salary;

                        salaryEachDay = b + Math.floor(totalTime * salary)
                        b = salaryEachDay
                        a.push(salaryEachDay)

                    }

                    console.log(b);


                    const slice = this.state.attendanceAll.slice(this.state.offset,
                        this.state.offset + this.state.perPage)
                    var postData = slice.map((item, key) =>
                        <React.Fragment>
                            <tr key={key}>
                                <th>{key + 1}</th>
                                <th>{item.name}</th>
                                <th>{item.salary}</th>
                                <th>{moment(item.date).format("L")}</th>
                                <th>{moment(item.time_in).format("HH:mm")}</th>
                                <th>{
                                    moment(item.time_out).format("HH:mm") == "Invalid date"
                                        ?
                                        <p></p>
                                        :
                                        moment(item.time_out).format("HH:mm")
                                }</th>
                                <th>
                                    {Math.floor(Math.floor((Date.parse(item.time_out) - Date.parse(item.time_in)) / (1000 * 60 * 60)) * item.salary)} $
                                </th>
                            </tr>
                        </React.Fragment>)
                    this.setState({
                        pageCount: Math.ceil(this.state.attendanceAll.length / this.state.perPage),
                        postData,
                        totalSalary: b
                    })
                }
            })
            .catch(error => console.log(error)
            );
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getAllAttendance()
        });

    };

    getAllUserById = (item) => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        Axios.get(`/api/account/getById/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {
                    const listById = res.data[0];
                    // var dep = this.state.listDepartment.filter((value) => {
                    //     console.log(value.value)
                    //     return  value.value == listById.id_department
                    // })

                    this.setState({
                        selectedName: { value: listById.id_account, label: listById.name },
                        selectedShift: { value: listById.id_shift, label: listById.shift_name },
                    });
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
        //console.log(this.state.name);

    };
    handleChangeShift = (selectedShift) => {
        this.setState({ selectedShift });
    }
    handleChangeName = (selectedName) => {
        this.setState({ selectedName });
    }
    handleInsertAttendance = (event) => {
        event.preventDefault();

        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        const date1 = new Date();

        const newAttendance = {
            //id_department: '',

            id_account: dataUser[0].id,
            id_shift: dataUser[0].shift,
            date: moment(new Date().toLocaleDateString()).format('YYYY/MM/DD'),
            time_in: date1,
        };
        console.log(newAttendance);

        Axios.post('/api/attendance/insert', newAttendance)
            .then(res => {
                let attendance = this.state.attendance;
                attendance = [newAttendance, ...attendance];
                this.setState({ attendance: attendance });
            })
            .catch(error => console.log(error));
        this.componentDidMount()
    };

    getDataAttendance = (item) => {
        this.setState({
            id_attendance: item.id_attendance,
            time_out: item.time_out,
        })
    }
    handleEditAttendance = (event) => {
        event.preventDefault();
        const newEditPosition = {
            id_attendance: this.state.id_attendance,
            time_out: new Date(),
        };

        Axios.post('/api/attendance/edit', newEditPosition)
            .then(res => {
                console.log(res);
                let key = this.state.id_attendance;
                this.setState(prevState => ({
                    attendance: prevState.attendance.map(
                        elm => elm.id_attendance === key ? {
                            ...elm,
                            time_out: new Date().toLocaleTimeString(),

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
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        // this.state.shift.map((item,key) => {
        //     this.state.shift_name = item.shift_name
        // })
        // console.log(this.state.shift_name);
        const { selectedShift } = this.state;
        const { selectedName } = this.state;

        const date1 = new Date();
        // Sun Dec 17 1995 03:24:00 GMT...
        
        console.log(date1);
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
                                                    <form onSubmit={this.handleInsertAttendance}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">


                                                                {/* <input type="cash" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} /> */}
                                                                {/* <Select
                                                                        className="col-sm-10"
                                                                        value={selectedShift}
                                                                        onChange={this.handleChangeShift}
                                                                        options={this.state.listShift}
                                                                    /> */}
                                                                {
                                                                    dataUser.map((item, key) =>
                                                                        <div className="form-group row" key={key}>
                                                                            <label className="col-sm-12 col-form-label">Name</label>
                                                                            {/* <div className="col-sm-10">
                                                                                <input type="cash" name="name" className="form-control"
                                                                                    onChange={this.handleInputChange} value=
                                                                                    {
                                                                                        item.id !== 1
                                                                                        ?
                                                                                            "12"
                                                                                            : ""
                                                                                    } readOnly />
                                                                            </div> */}
                                                                            <Select
                                                                                className="col-sm-10"
                                                                                value={selectedName}
                                                                                onChange={this.handleChangeName}
                                                                                options={this.state.listName}
                                                                                isDisabled={true}
                                                                            />

                                                                            <label className="col-sm-12 col-form-label">Shift</label>
                                                                            {/* <div className="col-sm-10">
                                                                                <input type="cash" name="shift" className="form-control"
                                                                                    onChange={this.handleInputChange} value=
                                                                                    {
                                                                                        item.shift == 1
                                                                                            ?
                                                                                            "Sang"
                                                                                            : item.shift == 2
                                                                                                ? "Chieu"
                                                                                                : "Toi"
                                                                                    } readOnly />
                                                                            </div> */}
                                                                            <Select
                                                                                className="col-sm-10"
                                                                                value={selectedShift}
                                                                                onChange={this.handleChangeShift}
                                                                                options={this.state.listShift}
                                                                                isDisabled={true}
                                                                            />
                                                                        </div>
                                                                    )
                                                                }


                                                                <label className="col-sm-12 col-form-label">Time in</label>
                                                                <div className="col-sm-10">
                                                                    <input name="time_in" className="form-control"
                                                                        onChange={this.handleInputChange} value={new Date().toLocaleTimeString()} readOnly />
                                                                </div>
                                                                <label className="col-sm-12 col-form-label">Today</label>
                                                                <div className="col-sm-10">
                                                                    <input name="date" className="form-control"
                                                                        onChange={this.handleInputChange} value={new Date().toLocaleDateString()} readOnly />
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

                                {
                                    dataUser[0].role == 1
                                        ?
                                        <>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">List All attendance of Employee</h5>
                                                    <br />
                                                    <ExcelFile element={<button className="btn btn-light px-5">Download Data</button>} >
                                                        <ExcelSheet data={this.state.attendanceAll} name="Employees">
                                                            <ExcelColumn label="Name" value="name" />
                                                            <ExcelColumn label="Shift" value="shift_name" />
                                                            <ExcelColumn label="Date" value="date" />
                                                            <ExcelColumn label="Time In" value="time_in" />
                                                            <ExcelColumn label="Time Out" value="time_out" />
                                                        </ExcelSheet>
                                                    </ExcelFile>

                                                    <div className="table-responsive">
                                                        <br />
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">No.</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Shift</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Time In</th>
                                                                    <th scope="col">Time Out</th>
                                                                    <th scope='col'>Salary(each)</th>

                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {this.state.postData}
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th>Total Salary is</th>
                                                                <th>{this.state.totalSalary} $</th>

                                                            </tbody>

                                                        </table>
                                                        <ReactPaginate
                                                            hideDisabled
                                                            previousLabel={<a className="page-link">Previous</a>}
                                                            nextLabel={<a className="page-link">Next</a>}
                                                            pageCount={this.state.pageCount}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={this.handlePageClick}
                                                            containerClassName={"pagination"}
                                                            activeClassName={"page-item-active"}
                                                            pageClassName={"page-link"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
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
                                                                        <th>{moment(item.time_in).format("HH:mm")}</th>
                                                                        <th>{
                                                                            moment(item.time_out).format("HH:mm") == "Invalid date"
                                                                                ?
                                                                                <p></p>
                                                                                :
                                                                                moment(item.time_out).format("HH:mm")
                                                                        }</th>
                                                                        <th>
                                                                            <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                                data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataAttendance(item)}> <i className="fa fa-edit" /></button>
                                                                        </th>
                                                                        {/* onClick={() => this.deleteattendance(item)} */}
                                                                    </tr>)}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }

                                {/* Modal */}
                                <div className="modal fade" id="formemodaledit" style={{ display: 'none' }} aria-hidden="true">
                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="card">
                                                <div className="card-header text-uppercase">Attendance and go home</div>

                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Check out</label>
                                                                    <div className="col-sm-10">
                                                                        <label className="col-sm-12 col-form-label">Time Out</label>
                                                                        <div className="col-sm-10">
                                                                            <input name="time_out" className="form-control"
                                                                                onChange={this.handleInputChange} value={new Date().toLocaleTimeString()} readOnly />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditAttendance}><i className="icon-lock" />Edit</button>
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