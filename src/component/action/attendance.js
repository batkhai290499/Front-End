import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import Select from 'react-select';
import moment from 'moment'
import ReactExport from "react-data-export";
import ReactPaginate from 'react-paginate';
import { Doughnut } from "react-chartjs-2";

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
            totalSalary: '',
            news: [],
            salaryOT: '',
            shift: [],
            schedule: [],
            resignByLogin: [],
            totalWork: '',
            salaryLate: '',
            listStudent: [],
            checked: [],
            listSchedule: [],
            student_late: []
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    componentDidMount() {
        this.getAttendanceById();
        this.getAllUserById()
        this.getUser();
        this.getResignByLogin();
        this.getSubjectById()
        this.getAllSubject()
        this.getStudentLateById()
    };
    getAllSubject = () => {
         Axios.get(`/api/subject/attendance`)
            .then(res => {
                if (res.status === 200) {
                    const shift = res;
                    console.log(res);
                    this.setState({ listSchedule: shift.data.subject });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getSubjectById = () => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        Axios.get(`/api/subject/views/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {
                    const shift = res;
                    this.setState({ schedule: shift.data.subject });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getStudentLateById = () => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        Axios.get(`/api/student_late/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {
                    const shift = res;
                    this.setState({ student_late: shift.data.subject });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getShiftById = (item) => {
        Axios.get(`/api/shift/viewById/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const shift = res.data;
                    this.setState({ shift: shift.shift });
                }
            })
            .catch(error => console.log(error)
            );
    }

    getDataResignById = (item) => {
        Axios.get(`/api/resign/viewsById/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const resignById = res.data;
                    this.setState({
                        resignById: resignById.resignById,
                    })
                }
            })
            .catch(error => console.log(error)
            );
    }

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
    getUser = () => {
        Axios.get('/api/account/views')
            .then(res => {
                if (res.status === 200) {
                    const news = res.data;
                    this.setState({ news: news.news });
                }
            })
            .catch(error => console.log(error)
            );
    }

    getAllAttendance = (item) => {
        Axios.get(`/api/attendance/views/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const attendanceAll = res.data;
                    this.setState({
                        attendanceAll: attendanceAll.attendanceAll,
                    })
                    //luong tinh theo gio
                    var a = []
                    var b = 0
                    var salaryEachDay = 0
                    for (let i = 0; i < this.state.attendanceAll.length; i++) {
                        var element = this.state.attendanceAll[i];
                        //console.log(element);
                        var startDate = Date.parse(element.time_in);
                        var endDate = Date.parse(element.time_out);
                        var totalTime = Math.floor((endDate - startDate) / (1000 * 60 * 60));
                        //console.log(totalTime);
                        var salary = element.salary;
                        salaryEachDay = b + Math.floor(totalTime * salary)
                        b = salaryEachDay
                        a.push(salaryEachDay)
                    }
                    // console.log(b);
                    // LUONG TINH THEO NGAY
                    var hihi = this.state.attendanceAll
                    for (let i = 0; i < hihi.length; i++) {
                        var getdate1 = new Date(hihi[i].date).getDay()
                        if (getdate1 < 6) {
                            var firstDay = hihi[0].date
                            var endDay = hihi[hihi.length - 1].date
                            var salary = hihi[i].salary
                            // lay ngay dau di lam va ngay cuoi di lam
                            var dayWork = (Date.parse(endDay) - Date.parse(firstDay)) / (1000 * 60 * 60 * 24) + 1
                            //console.log((Date.parse(endDay) - Date.parse(firstDay))/ (1000 * 60 * 60 * 24) + 1);

                            // lay luong theo 1 ngay`
                            var daySalary = (salary / 26)
                            var totalWork = Math.floor(daySalary * dayWork) 
                            // tinh so luong theo ngay di lam
                            //console.log(daySalary * dayWork);
                            //-------------------------------------------------
                        }
                    }
                    //LUONG TINH THOI GIAN Over Time (OT)
                    var timeOT = []
                    var salaryOT = 0
                    var salaryOTEachDay = 0
                    for (let i = 0; i < hihi.length; i++) {
                        var getdate1 = new Date(hihi[i].date).getDay()
                        if (getdate1 == 6) {
                            var dayOT = hihi[i]
                            var startOT = Date.parse(dayOT.time_in)
                            var endOT = Date.parse(dayOT.time_out)
                            var totalOT = Math.floor((endOT - startOT) / (1000 * 60 * 60))
                            var salaryofEmployee = dayOT.salary
                            salaryOTEachDay = salaryOT + (((salaryofEmployee / 26) / 8) * totalOT * (150 / 100))
                            salaryOT = Math.floor(salaryOTEachDay)
                            timeOT.push(salaryOTEachDay)

                        }
                    }
                    // TINH TIEN DI LAM MUON
                    var shiftLate = this.state.shift
                    var hihi = this.state.attendanceAll
                    var totalLateIn = []
                    var salaryLate = 0
                    var salaryLateEach = 0


                    for (let z = 0; z < hihi.length; z++) {
                        var timeInUser = new Date(moment(hihi[z].time_in).format())

                        var plus = moment(hihi[z].time_in).format('YYYY-MM-DD');
                        for (let i = 0; i < shiftLate.length; i++) {
                            var timeInLate = new Date(plus + 'T' + shiftLate[i].time_in)
                            var timeOutLate = shiftLate[i].time_out

                            //Quy dinh di lam muon
                            var mathTimeLate = (timeInUser - timeInLate) / (1000 * 60)
                            if (0 < mathTimeLate && mathTimeLate <= 15) {
                                salaryLateEach = salaryLate + 10
                                // salaryLate = salaryLateEach
                                totalLateIn.push(salaryLateEach)
                            }
                            if (16 < mathTimeLate && mathTimeLate <= 30) {
                                salaryLateEach = salaryLate + 25
                                // salaryLate = salaryLateEach
                                totalLateIn.push(salaryLateEach)
                            }
                            if (31 < mathTimeLate && mathTimeLate <= 60) {
                                salaryLateEach = salaryLate + 60
                                // salaryLate = salaryLateEach
                                totalLateIn.push(salaryLateEach)
                            }
                            if (mathTimeLate > 60) {
                                salaryLateEach = salaryLate + Math.floor(((salaryofEmployee / 26) / 2))
                                // salaryLate = salaryLateEach
                                totalLateIn.push(salaryLateEach)
                            }
                            salaryLate = salaryLateEach

                        }


                    }
                    var totalOfSalary = Math.floor((totalWork) + (salaryOT) - (salaryLate))

                    const slice = this.state.attendanceAll.slice(this.state.offset,
                        this.state.offset + this.state.perPage)
                    var postData = slice.map((item, key) =>
                        <React.Fragment>
                            <tr key={key}>
                                <th>{key + 1}</th>
                                <th>{item.name}</th>
                                <th>{item.salary}</th>
                                <th>{moment(item.time_in).format("HH:mm")}</th>
                                <th>{
                                    moment(item.time_out).format("HH:mm") == "Invalid date"
                                        ?
                                        <p></p>
                                        :
                                        moment(item.time_out).format("HH:mm")
                                }</th>
                                {/* <th>
                                    {Math.floor(Math.floor((Date.parse(item.time_out) - Date.parse(item.time_in)) / (1000 * 60 * 60)) * item.salary)} $
                                </th> */}
                            </tr>
                        </React.Fragment>)
                    this.setState({
                        pageCount: Math.ceil(this.state.attendanceAll.length / this.state.perPage),
                        postData,
                        totalSalary: totalOfSalary,
                        salaryOT: salaryOT,
                        totalWork: totalWork,
                        salaryLate: salaryLate
                    })
                    console.log(this.state.totalSalary);
                    console.log(this.state.salaryOT);
                    console.log(this.state.salaryLate);
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

    getResignByLogin() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        Axios.get(`/api/resign/viewsById/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {
                    const resignByLogin = res.data;
                    this.setState({
                        resignByLogin: resignByLogin.resignById,
                    })

                }
            })
            .catch(error => console.log(error)
            );
    }
    handleInsertStudentLate = (event) => {
        event.preventDefault();
        Axios.post('/api/subject/student_late', this.state.checked)
            .then(res => {
                console.log(res);
                swal("Danh sách học sinh đi muộn đã được nộp", {
                    icon: "success",
                });
                this.modalClose()
            })
            .catch(error => console.log(error));

    }
    handleInsertAttendance = (event) => {
        event.preventDefault();
        for (let z = 0; z < this.state.resignByLogin.length; z++) {
            var checkDate = moment(this.state.resignByLogin[z].date).format('YYYY-MM-DD')
            var checkStatusResign = this.state.resignByLogin[z].status
            console.log(checkStatusResign);
        }
        if (checkStatusResign == 1) {
            if (moment().format('YYYY-MM-DD') == checkDate) {
                swal("Yeahh! You have been off today", {
                    icon: "warning",
                });
            } else {
                var dataUser = JSON.parse(localStorage.getItem('userInfo'))

                const newAttendance = {
                    //id_department: '',

                    id_account: dataUser[0].id,
                    id_shift: dataUser[0].shift,
                    date: moment(new Date().toLocaleDateString()).format('YYYY/MM/DD'),
                    time_in: moment().format('YYYY-MM-DD h:mm:ss'),
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
            }
        }
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
            time_out: moment().format('YYYY-MM-DD h:mm:ss'),
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
    getListAccount = (item) => {
        console.log(item.id_schedule);
         Axios.get(`/api/subject/attendance`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    const listStudent = res.data;
                    this.setState({
                        listStudent: listStudent.subject,
                    })
                }
            })
            .catch(error => console.log(error)
            );
    }
    handleCheck = (event, item) => {
    var updatedList = [...this.state.checked];
    if (!event.target.checked) {
        updatedList.splice(this.state.checked.indexOf(event.target.value), 1);
    } else {
        updatedList = [...this.state.checked, event.target.value];
    }
    this.setState({
       checked: updatedList
    });
    };

    render() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        console.log(this.state.student_late,dataUser[0]);
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-lg-12">
                                {
                                    dataUser[0].role == 1
                                        ?
                                        <>
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">List Account</h5>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Money</th>
                                                                        <th scope="col">Shift</th>
                                                                        <th scope="col">Function</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.news.map((item, key) =>
                                                                        <tr key={key}>
                                                                            <th>{item.name}</th>
                                                                            <th>{item.money + ' $'}</th>
                                                                            <th>{item.shift_name}</th>

                                                                            <th>
                                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                                    data-toggle="modal" data-target="#formemodalattendance"
                                                                                    onClick={() => this.getShiftById(item.id_account)
                                                                                        || this.getDataResignById(item.id_account)
                                                                                        || this.getAllAttendance(item.id_account)}> <i className="fa fa-edit" /></button>
                                                                            </th>
                                                                        </tr>)}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="formemodalattendance" style={{ display: 'none' }} aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <Doughnut
                                                                        data={{
                                                                            labels: [
                                                                                "Salary Work",
                                                                                "Salary Over Time",
                                                                                "Salary Late",

                                                                            ],
                                                                            datasets: [
                                                                                {
                                                                                    label: "Population (millions)",
                                                                                    backgroundColor: [
                                                                                        "#3e95cd",
                                                                                        "#8e5ea2",
                                                                                        "#3cba9f",

                                                                                    ],
                                                                                    data: [this.state.totalWork, this.state.salaryOT, this.state.salaryLate]
                                                                                }
                                                                            ]
                                                                        }}
                                                                        option={{
                                                                            title: {
                                                                                display: true,
                                                                                text: "Predicted world population (millions) in 2050"
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-12">
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
                                                                                    <th scope="col">Money</th>
                                                                                    <th scope="col">Time In</th>
                                                                                    <th scope="col">Time Out</th>
                                                                                    {/* <th scope='col'>Salary(each)</th> */}
                                                                                </tr>
                                                                            </thead>

                                                                            <tbody>
                                                                                {this.state.postData}
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


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        : dataUser[0].role == 2
                                        ?
                                        <>
                                            <div className="col-lg-2">
                                                {/* Large Size Modal */}
                                                {/* 
                                                {/* Modal */}
                                                <div className="modal fade" id="formemodal" style={{ display: 'none' }} aria-hidden="true">
                                                    <div className="modal-dialog modal-md modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="card">
                                                                <div className="card-header text-uppercase">Danh sách học sinh</div>

                                                                <div className="card-body">
                                                                    <form onSubmit={this.handleInsertStudentLate}>
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
                                                                                

                                                                                {/* {this.state.listStudent && this.state.listStudent.map((item) => 
                                                                                    <div className="col">

                                                                                        <label className="col-sm-12 col-form-label">{item.username}</label>
                                                                                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></input>
                                                                                    </div>
                                                                        )} */}
                                                                                <div className="card">
                                                                                    <div className="card-body">
                                                                                        <div className="table-responsive">
                                                                                            <table className="table">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th scope="col">Tên học sinh</th>
                                                                                                        <th scope="col">Không Có mặt</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {this.state.listStudent.map((item, key) =>
                                                                                                        <tr key={key}>
                                                                                                            <th>{item.username}</th>
                                                                                                            <th><input type="checkbox" value={item.id_account} onChange={(e) => this.handleCheck(e, item)}/></th>
                                                                                                        </tr>
                                                                                                    )}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button type="submit" className="btn btn-light px-5">Nộp danh sách</button>
                                                                    </form>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                               <div className="container text-center">
                                                    <div className="row">
                                                         <div className="col">
                                                        Thứ/Buổi
                                                        </div>
                                                        <div className="col">
                                                        Thứ 2
                                                        </div>
                                                        <div className="col">
                                                        Thứ 3
                                                        </div>
                                                        <div className="col">
                                                         Thứ 4
                                                        </div>
                                                        <div className="col">                                                                                                        
                                                        Thứ 5 
                                                        </div>
                                                        <div className="col">
                                                        Thứ 6
                                                        </div>
                                                    </div>
                                                    {this.state.schedule.map((item, key) =>
                                                        <div>
                                                                {item.day === 0 ? 
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    1
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                : 
                                                                 <div className="row" key={key}>
                                                                    <div className="col">
                                                                        1
                                                                    </div>
                                                                    <div className="col">
                                                                        ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>    
                                                                </div>
                                                                }
                                                              
                                                                  {item.day === 1 ? 
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    2
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                    <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                    <div className="col">
                                                                        <button className="btn btn-light btn-block m-1" data-toggle="modal" data-target="#formemodal" onClick={() => {this.getListAccount(item)}}>{item.slot === 3 && item.name }</button>
                                                                        
                                                                 
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                : 
                                                                 <div className="row" key={key}>
                                                                    <div className="col">
                                                                        2
                                                                    </div>
                                                                    <div className="col">
                                                                        ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>    
                                                                </div>
                                                            }
                                                            {item.day === 2 ? 
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    3
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                : 
                                                                 <div className="row" key={key}>
                                                                    <div className="col">
                                                                        3
                                                                    </div>
                                                                    <div className="col">
                                                                        ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>    
                                                                </div>
                                                            }
                                                            
                                                            {item.day === 3 ? 
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    4
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                : 
                                                                 <div className="row" key={key}>
                                                                    <div className="col">
                                                                        4
                                                                    </div>
                                                                    <div className="col">
                                                                        ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>    
                                                                </div>
                                                            }
                                                            {item.day === 4 ? 
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    5
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                : 
                                                                 <div className="row" key={key}>
                                                                    <div className="col">
                                                                        5
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    ...
                                                                    </div>
                                                                    <div className="col">
                                                                    ...
                                                                    </div>    
                                                                </div>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            </>
                                            :
                                            <>
                                              <div className="card">
                                               <div className="container text-center">
                                                    <div className="row">
                                                         <div className="col">
                                                        Thứ/Buổi
                                                        </div>
                                                        <div className="col">
                                                        Thứ 2
                                                        </div>
                                                        <div className="col">
                                                        Thứ 3
                                                        </div>
                                                        <div className="col">
                                                         Thứ 4
                                                        </div>
                                                        <div className="col">                                                                                                        
                                                        Thứ 5 
                                                        </div>
                                                        <div className="col">
                                                        Thứ 6
                                                        </div>
                                                    </div>
                                                    {this.state.listSchedule.map((item, key) =>
                                                        <div>
                                                                {item.day === 0 &&
                                                                <div className="row" key={key}>
                                                                  <div className="col">
                                                                    1
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                }
                                                              
                                                                  {item.day === 1 &&
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    2
                                                                    </div>
                                                                    <div className="col">
                                                                        {item.slot === 1 && item.name }
                                                                    </div>
                                                                        <div className="col">
                                                                    {item.slot === 2 && item.name }
                                                                    </div>
                                                                        <div className="col">
                                                                        {item.slot === 3 && item.name }
                                                                    </div>
                                                                    <div className="col">                                                                                                        
                                                                    {item.slot === 4 && item.name }
                                                                    </div>
                                                                    <div className="col">
                                                                    {item.slot === 5 && item.name }
                                                                    </div>    
                                                                </div>
                                                            }
                                                            {item.day === 2 &&
                                                                <div className="row" key={key}>
                                                                  <div className="col">
                                                                    3
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                               
                                                            }
                                                            
                                                            {item.day === 3 &&
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    4
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                                
                                                            }
                                                            {item.day === 4 &&
                                                                    <div className="row" key={key}>
                                                                  <div className="col">
                                                                    5
                                                                </div>
                                                                <div className="col">
                                                                    {item.slot === 1 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 2 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 3 && item.name }
                                                                </div>
                                                                <div className="col">                                                                                                        
                                                                 {item.slot === 4 && item.name }
                                                                </div>
                                                                <div className="col">
                                                                 {item.slot === 5 && item.name }
                                                                </div>    
                                                                </div>
                                                            }
                                                        </div>
                                                    )}
                                                    </div>
                                                    
                                                </div>
                                            <div className="card">
                                                        {this.state.student_late.map((item) => {
                                                            return <div>Học sinh {dataUser[0].name} đã đi muộn ngày {new Date(item.date).getDate()}/ {new Date(item.date).getMonth()}</div>
                                                        })}
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