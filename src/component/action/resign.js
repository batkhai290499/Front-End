import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment'
import Select from 'react-select';

class resign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resign: [],
            title: '',
            content: '',
            date: '',
            status: '',
            news: [],
            resignById: [],
            id_resign1: ''
        }
    }
    componentDidMount() {
        this.getDataResign()
        this.getUser()
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
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
    //For Employee
    getDataResign = () => {
        Axios.get('/api/resign/views')
            .then(res => {
                if (res.status === 200) {

                    const resign = res.data;
                    this.setState({
                        resign: resign.resign,
                    })
                }
            })
            .catch(error => console.log(error)
            );
    }

    //For Admin
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
    handleInsertResign = (event) => {
        event.preventDefault();
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        const newResign = {
            //id_department: '',
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            status: '0'
        };
        console.log(this.state.date);

        Axios.post(`/api/resign/insert/${dataUser[0].id}`, newResign)
            .then(res => {
                let resign = this.state.resign;
                resign = [newResign, ...resign];
                this.setState({ resign: resign });
            })
            .catch(error => console.log(error));
    };

    handleChangeIdResign(item) {
        this.setState({
            id_resign1: item
        })
    }

    handleEditrResign = () => {

        const newEditrResign = {
            id_resign: this.state.id_resign1,
            status: 1,
        };

        Axios.post('/api/resign/edit', newEditrResign)
            .then(res => {
                let key = this.state.id_resign1;
                this.setState(prevState => ({
                    resignById: prevState.resignById.map(
                        elm => elm.id_resign === key ? {
                            ...elm,
                            status: 1
                        } : elm
                    )
                }))
                console.log(key);
            })
            .catch(error => console.log(error));
    };
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <form id="personal-info" noValidate="novalidate">
                                            <h4 className="form-header"> <i className="fa fa-file-text-o" />
                                                        Resign
                                                    </h4>
                                            <div className="form-group row">
                                                <label htmlFor="input-5" className="col-sm-2 col-form-label">Title</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="input-5" name="title"
                                                        onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="input-9" className="col-sm-2 col-form-label">Reason</label>
                                                <div className="col-sm-10">
                                                    <textarea className="form-control" rows={4} id="input-9" name="content"
                                                        onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">Date</label>
                                                <div class="col-sm-10">
                                                    <input type="date" class="form-control" name="date"
                                                        onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-success" onClick={this.handleInsertResign}><i className="fa fa-check-square-o" /> SEND</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div id="accordion3">
                                    <div className="card mb-2">
                                        <div className="card-header bg-success">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-7" aria-expanded="false" aria-controls="collapse-7">
                                                FAQ #1
                                            </button>
                                        </div>
                                        <div id="collapse-7" className="collapse" data-parent="#accordion3" style={{}}>
                                            <div className="card-body">
                                                If you take a break greater than or equal to 5 days. You will be deducted 15% of your salary
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-header bg-warning">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-8" aria-expanded="false" aria-controls="collapse-8">
                                                FAQ #2
                                            </button>
                                        </div>
                                        <div id="collapse-8" className="collapse" data-parent="#accordion3">
                                            <div className="card-body">
                                                If your stay is greater than or equal to 10 days. 50% of your salary will be deducted
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header bg-info">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-9" aria-expanded="false" aria-controls="collapse-9">
                                                FAQ #3
                                            </button>
                                        </div>
                                        <div id="collapse-9" className="collapse" data-parent="#accordion3">
                                            <div className="card-body">
                                                If your vacation is greater than or equal to 15 days. 80% of your salary will be deducted
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">List Resign</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Content</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.resign.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.id_account}</th>
                                                            <th>{item.title}</th>
                                                            <th>{item.content}</th>
                                                            <th>{moment(item.date).format("DD/MM/YYYY")}</th>
                                                            <th>{item.status}</th>
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">List Account</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Position</th>
                                                        <th scope="col">Shift</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.news.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{item.name}</th>
                                                            <th>{item.position_name}</th>
                                                            <th>{item.shift_name}</th>

                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodalResign" onClick={() => this.getDataResignById(item.id_account)}> <i className="fa fa-edit" /></button>
                                                            </th>
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="formemodalResign" style={{ display: 'none' }} aria-hidden="true">
                                <div className="modal-dialog modal-md modal-dialog-centered">
                                    <div className="modal-content" style={{ width: "200%" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">List All Resign of Employee</h5>
                                            <br />
                                            <div className="table-responsive">
                                                <br />
                                                <table className="table">

                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">Content</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Status</th>
                                                            <th scope='col'>Check Status</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {this.state.resignById.map((item, key) =>
                                                            <tr key={key}>
                                                                <th>{item.title}</th>
                                                                <th>{item.content}</th>
                                                                <th>{moment(item.date).format("L")}</th>
                                                                <th>{item.status}</th>
                                                                <th>

                                                                        <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                            data-toggle="modal"
                                                                            //data-target="#formemodalResign"
                                                                            onClick={() => this.handleChangeIdResign(item.id_resign) || this.handleEditrResign()}> <i className="fa fa-edit" /></button>
                                                                </th>
                                                            </tr>)}
                                                    </tbody>

                                                </table>
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

export default resign;