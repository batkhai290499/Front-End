import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert';
import Select from 'react-select';
import moment from 'moment'

class mission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            selectedFile: null,
            title: '',
            id_account: '',
            comment: '',
            selectedEmployee: null,
            end_time: '',
            mission: [],
            MissionEmployee: [],

            id_mission: '',
            name: '',
            name_file: '',
            start_time: '',
            status: '',
        }
    }
    componentDidMount() {
        this.getAllEmployee();
        this.getStatus();
        this.getMissionEmployee();
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
    getInfoMission = (item) => {
        axios.get(`/api/mission/getById/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const MissionById = res.data;
                    this.setState({
                        MissionById: MissionById.MissionById,
                        comment: MissionById.MissionById[0].comment,
                        end_time: MissionById.MissionById[0].end_time,
                        id_mission: MissionById.MissionById[0].id_mission,
                        name: MissionById.MissionById[0].name,
                        name_file: MissionById.MissionById[0].name_file,
                        start_time: MissionById.MissionById[0].start_time,
                        status: MissionById.MissionById[0].status,
                        title: MissionById.MissionById[0].title,
                    });
                }
            })
            .catch(error => console.log(error)
            );
    }

    getMissionEmployee = () => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        axios.get(`/api/mission/viewsMissionByName/${dataUser[0].name}`)
            .then(res => {
                if (res.status === 200) {
                    const MissionEmployee = res.data;
                    this.setState({
                        MissionEmployee: MissionEmployee.MissionEmployee,
                        comment: MissionEmployee.MissionEmployee[0].comment,
                        end_time: MissionEmployee.MissionEmployee[0].end_time,
                        id_mission: MissionEmployee.MissionEmployee[0].id_mission,
                        name: MissionEmployee.MissionEmployee[0].name,
                        name_file: MissionEmployee.MissionEmployee[0].name_file,
                        start_time: MissionEmployee.MissionEmployee[0].start_time,
                        status: MissionEmployee.MissionEmployee[0].status,
                        title: MissionEmployee.MissionEmployee[0].title,
                    });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getStatus() {
        axios.get('/api/mission/viewsAllmission')
            .then(res => {
                if (res.status === 200) {
                    const mission = res.data;
                    this.setState({
                        mission: mission.mission,
                    })
                }
            })
            .catch(error => console.log(error)
            );
    };

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }
    onFileUpload = (event) => {
        event.preventDefault();

        var d = new Date()
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
        formData.append(
            "start_time", d.toLocaleDateString('zh-Hans-CN')
        );
        formData.append(
            "end_time", this.state.end_time
        );
        formData.append(
            "status", 1
        );
        const newUser = {
            title: this.state.title,
            name: this.state.selectedEmployee.label,
            comment: this.state.comment,
            image: this.state.image,
            start_time: d.toLocaleDateString('zh-Hans-CN'),
            end_time: this.state.end_time,
            status: "In Process",
        };
        axios.post('/upload', formData)
            .then(res => {
                let mission = this.state.mission;
                mission = [newUser, ...mission];
                this.setState({ mission: mission });
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
    };
    handleChangeEmployee = (selectedEmployee) => {
        this.setState({ selectedEmployee });
    }

    handleEditMission = (event) => {
        event.preventDefault();
        const newEditMission = {
            id_mission: this.state.id_mission,
            status: 2,
        };

        axios.post('/api/mission/updateByEmployee/', newEditMission)
            .then(res => {
                let key = this.state.id_mission;
                this.setState(prevState => ({
                    MissionEmployee: prevState.MissionEmployee.map(
                        elm => elm.id_mission === key ? {
                            ...elm,
                            status: "To Verify"
                        } : elm
                    )
                }))
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
                this.modalClose()

            })
            .catch(error => console.log(error));
    };
    handleMissionAdmin = (event) => {
        event.preventDefault();
        const newEditMission = {
            id_mission: this.state.id_mission,
            status: 3,
        };

        axios.post('/api/mission/updateByEmployee/', newEditMission)
            .then(res => {
                let key = this.state.id_mission;
                this.setState(prevState => ({
                    MissionEmployee: prevState.MissionEmployee.map(
                        elm => elm.id_mission === key ? {
                            ...elm,
                            status: "Done"
                        } : elm
                    )
                }))
                swal("Yeahh! You have successfully edited!", {
                    icon: "success",
                });
                this.modalClose()

            })
            .catch(error => console.log(error));
    }
    modalClose = () => {
        this.componentDidMount();
    }
    render() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        for (let i = 0; i < this.state.mission.length; i++) {
            var element = this.state.mission[i].name;

        }
        console.log(element);
        const { selectedEmployee } = this.state;
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        {
                            dataUser[0].role == 1
                                ?
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <form id="personal-info" noValidate="novalidate">
                                                    <h4 className="form-header"> <i className="fa fa-file-text-o" />
                                                        Mission
                                                    </h4>
                                                    <div className="form-group row">
                                                        <label htmlFor="input-5" className="col-sm-2 col-form-label">Title</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="input-5" name="title"
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label htmlFor="input-7" className="col-sm-2 col-form-label">Employee</label>
                                                        <div className="col-sm-10">

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
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label class="col-sm-2 col-form-label">Date</label>
                                                        <div class="col-sm-10">
                                                            <input type="date" class="form-control" name="end_time"
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-footer">
                                                        <button type="submit" className="btn btn-success" onClick={this.onFileUpload}><i className="fa fa-check-square-o" /> SEND</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">List Account</h5>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Title</th>
                                                                <th scope="col">Employee</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Deadline</th>
                                                                <th scope="col">Infor</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.mission.map((item, key) =>
                                                                <tr key={key}>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.status}</td>
                                                                    <td>{moment(item.end_time, 'YYYY-MM-DD').format("DD-MM-YYYY")}</td>
                                                                    <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                        data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getInfoMission(item.id_mission)}> <i className="fa fa-edit" /></button>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="formemodaledit" style={{ display: 'none' }} aria-hidden="true">
                                        <div className="modal-dialog modal-md modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="card">
                                                    <div className="card-header text-uppercase">Info Mission</div>
                                                    <div className="card-body">
                                                        <form >

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <h6 class="text-uppercase">{this.state.title}</h6>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            {
                                                                                this.state.status == "In Process"
                                                                                    ?
                                                                                    <span class="badge badge-pill badge-primary shadow-primary m-1">In Process</span>
                                                                                    :
                                                                                    this.state.status == "To Verify"
                                                                                        ?
                                                                                        <span class="badge badge-warning shadow-warning m-1">To Verify</span>
                                                                                        :
                                                                                        this.state.status == "Done"
                                                                                            ?
                                                                                            <span class="badge badge-success shadow-success m-1">Done</span>
                                                                                            :
                                                                                            ""
                                                                            }
                                                                            <h6>{this.state.name}</h6>
                                                                            <hr />
                                                                            <p>File Đính Kèm: </p>
                                                                            <a href={"http://localhost:4000/uploads/" + this.state.name_file} download>
                                                                                <img src={"http://localhost:4000/uploads/" + this.state.name_file} width={104} height={142} />
                                                                            </a>
                                                                            <hr />
                                                                            <p>Nội dung công việc :</p>
                                                                            <p>{this.state.comment}</p>
                                                                            <hr />
                                                                            <div className="form-group row">
                                                                                <label htmlFor="input-9" className="col-sm-4 col-form-label">Add Comment</label>
                                                                                <div className="col-sm-10">
                                                                                    <textarea className="form-control" rows={4} id="input-9" name="comment1"
                                                                                        onChange={this.handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                            <hr />

                                                                            <div class="form-group row">
                                                                                <label class="col-sm-2 col-form-label">Date</label>
                                                                                <div class="col-sm-10">
                                                                                    <input type="date" class="form-control" name="end_time"
                                                                                        onChange={this.handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-lg-6 col-xl-6">
                                                                    <button type="submit" className="btn btn-light px-5" onClick={this.handleMissionAdmin}><i className="icon-lock" />Done</button>
                                                                    <button type="submit" className="btn btn-light px-5" onClick={this.handleEditMission}><i className="icon-lock" />To Verify</button>
                                                                </div>
                                                            </div>{/*end row*/}
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                element == dataUser[0].name
                                    ?
                                    <div className="row">
                                        <div className="col-lg-12  ">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">List Account</h5>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Title</th>
                                                                    <th scope="col">Employee</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Deadline</th>
                                                                    <th scope="col">Infor</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.MissionEmployee.map((item, key) =>
                                                                    <tr key={key}>
                                                                        <td>{item.title}</td>
                                                                        <td>{item.name}</td>
                                                                        <td>{item.status}</td>
                                                                        <td>{moment(item.end_time, 'YYYY-MM-DD').format("DD-MM-YYYY")}</td>
                                                                        <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                            data-toggle="modal" data-target="#formemodaledit" onClick> <i className="fa fa-edit" /></button>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal fade" id="formemodaledit" style={{ display: 'none' }} aria-hidden="true">
                                            <div className="modal-dialog modal-md modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="card">
                                                        <div className="card-header text-uppercase">Infor Mission</div>
                                                        <div className="card-body">
                                                            <form >
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <h6 class="text-uppercase">{this.state.title}</h6>
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                {
                                                                                    this.state.status == "In Process"
                                                                                        ?
                                                                                        <span class="badge badge-pill badge-primary shadow-primary m-1">In Process</span>
                                                                                        :
                                                                                        this.state.status == "To Verify"
                                                                                            ?
                                                                                            <span class="badge badge-warning shadow-warning m-1">To Verify</span>
                                                                                            :
                                                                                            this.state.status == "Done"
                                                                                                ?
                                                                                                <span class="badge badge-success shadow-success m-1">Done</span>
                                                                                                :
                                                                                                ""
                                                                                }
                                                                                <h6>{this.state.name}</h6>
                                                                                <p>File Đính Kèm: </p>
                                                                                <a href={"http://localhost:4000/uploads/" + this.state.name_file} download>
                                                                                    <img src={"http://localhost:4000/uploads/" + this.state.name_file} width={104} height={142} />
                                                                                </a>
                                                                                <hr />

                                                                                <p>Nội dung công việc :</p>
                                                                                <p>{this.state.comment}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 col-xl-6">
                                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditMission}><i className="icon-lock" />To Verify</button>
                                                                    </div>
                                                                </div>{/*end row*/}
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                        }
                    </div>
                </div >
            </div >
        );
    }
}

export default mission;