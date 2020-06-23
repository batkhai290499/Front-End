import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

class position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [],
            id_position: '',
            name: '',
            id_department: ''
        }
    }
    componentDidMount() {
        Axios.get('/api/position/views')
            .then(res => {
                if (res.status === 200) {
                    console.log(res);

                    const position = res.data;
                    this.setState({
                        position: position.position,
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

    handleInsertPosition = (event) => {
        //event.preventDefault();

        const newPosition = {
            //id_department: '',
            name: this.state.name,
            id_department: this.state.id_department
        };
        //console.log(this.state.name);

        Axios.post('/api/position/insert', newPosition)
            .then(res => {
                let position = this.state.position;
                position = [newPosition, ...position];
                this.setState({ position: position });
            })
            .catch(error => console.log(error));
    };

    getDataPosition = (item) => {
        console.log(item);

        this.setState({
            id_department: item.id_department,
            name: item.name,
            id_position: item.id_position
        })
    }

    handleEditPosition = (event) => {
        event.preventDefault();

        const newEditPosition = {
            id_department: this.state.id_department,
            name: this.state.name,
            id_position: this.state.id_position
        };
        console.log(newEditPosition);

        Axios.post('/api/position/edit', newEditPosition)
            .then(res => {
                console.log(res);
                let key = this.state.id_position;
                this.setState(prevState => ({
                    position: prevState.position.map(
                        elm => elm.id_position === key ? {
                            ...elm,
                            name: this.state.name,
                            id_department: this.state.id_department
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

    deletePosition = (item) => {
        console.log(item);

        const positionId = { id_position: item.id_position };
        //console.log(positionId);

        //console.log(newsId);
        Axios.post('api/position/delete', positionId)

            .then(res => {
                this.setState(
                    prevState => ({
                        position: prevState.position.filter(elm => elm.id_position !== item.id_position)
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
                                                <div className="card-header text-uppercase">Create Position</div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleInsertPosition}>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Name of Position</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="name" className="form-control"
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Position in Department</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="id_department" className="form-control"
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
                                                        <th scope="col">Name Position</th>
                                                        <th scope="col">Department</th>
                                                        <th scope="col">Function</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.position.map((item, key) =>
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>{item.name}</th>
                                                            <th>{item.id_department}</th>
                                                            <th>
                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target="#formemodaledit" onClick={() => this.getDataPosition(item)}> <i className="fa fa-edit" /></button>

                                                                <button type="button" className="btn btn-light waves-effect waves-light m-1"
                                                                    data-toggle="modal" data-target={"#modal-animation-" + item.id_position} > <i className="fa fa-times" /></button>
                                                                <div className="modal fade" id={"modal-animation-" + item.id_position} style={{ display: 'none' }} aria-hidden="true">
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


                                                            {/* onClick={() => this.deletePosition(item)} */}
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
                                                <div className="card-header text-uppercase">Edit Position</div>

                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12 col-lg-12 col-xl-12">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-12 col-form-label">Edit Name of Position</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="name" className="form-control" 
                                                                            onChange={this.handleInputChange} value={this.state.name} />
                                                                    </div>
                                                                    <label className="col-sm-12 col-form-label">Edit Name of Department</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" name="id_department" className="form-control" 
                                                                            onChange={this.handleInputChange} value={this.state.id_department} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>{/*end row*/}
                                                        <button type="submit" className="btn btn-light px-5" onClick={this.handleEditPosition}><i className="icon-lock" />Edit</button>

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

export default position;