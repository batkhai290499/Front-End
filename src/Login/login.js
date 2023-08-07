import React, { Component } from 'react';
import Axios from 'axios';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: 0
        }
        this.username = '';
        this.password = '';
        localStorage.clear();
    }

    CheckLogin = async (e) => {
        let results = await Axios.post('http://localhost:4000/api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                username: this.username,
                password: this.password
            }
        });

        if (results.status !== 200) {
            this.setState({ 'error': 1 })
            return;
        }
        
        else {
            if (results.data.news.length > 0) {
                localStorage.setItem("isLogin", 'true');
                
                var hi = results.data.news
                var data;
                var dataUser = [];
                hi.forEach(e => {
                    data = { id: e.id_account, name: e.name, username: e.username, role:e.id_role, shift:e.id_shift }
                    dataUser.push(data)
                })
                localStorage.setItem('userInfo', JSON.stringify(dataUser))
                console.log(dataUser);
                if (dataUser[0].role == 1) {
                    window.location.href = '/bend';                    
                }else if (dataUser[0].role == 2) {
                    window.location.href = '/producer'
                }else if (dataUser[0].role == 3){
                    window.location.href = '/attendance';                    
                }
            } else {
                this.setState({ 'error': 1 });
                alert("Login Fail <3")
            }
        }
    }
    render() {

        return (
            <div className="card card-authentication1 mx-auto my-5">
                <div className="card-body">
                    <div className="card-content p-2">
                        <div className="text-center">
                            <img src="assets/images/logo-icon.png" alt="logo icon" />
                        </div>
                        <div className="card-title text-uppercase text-center py-3">Sign In</div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1" className="sr-only">Username</label>
                                <div className="position-relative has-icon-right">
                                    <input type="text" id="exampleInputUsername1" name="username" className="form-control input-shadow"
                                        placeholder="Enter Username"
                                        onChange={(e) => {
                                            this.username = e.target.value;
                                        }} />
                                    <div className="form-control-position">
                                        <i className="icon-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword" className="sr-only">Password</label>
                                <div className="position-relative has-icon-right">
                                    <input type="password" id="exampleInputPassword" name="password" className="form-control input-shadow"
                                        placeholder="Enter Password"
                                        onChange={(e) => {
                                            this.password = e.target.value;
                                        }} />
                                    <div className="form-control-position">
                                        <i className="icon-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <div className="icheck-material-white">
                                        <input type="checkbox" id="user-checkbox" />
                                        <label htmlFor="user-checkbox">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-light btn-block" onClick={() => {
                                this.CheckLogin();
                            }}>Sign In</button>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

export default login;