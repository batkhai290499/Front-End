import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class MenuBar extends Component {
    render() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        return (
            <div>
                <div id="sidebar-wrapper" data-simplebar data-simplebar-auto-hide="true">
                    <div className="brand-logo">
                        <a href="index.html">
                            <img src="quyettien.png" className="logo-icon" alt="logo icon" />
                            <h5 className="logo-text">Chill University</h5>
                        </a>
                    </div>
                    <ul className="sidebar-menu do-nicescrol">
                        <li className="sidebar-header">MAIN NAVIGATION</li>
                        {
                            dataUser[0].role == 1
                                ?
                                <>
                                    <li>
                                        <NavLink to="/bend">
                                            <i className="zmdi zmdi-view-dashboard" /> <span>Danh sách tài khoản</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/department">
                                            <i className="zmdi zmdi-invert-colors" /> <span>Danh sách lớp</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/position">
                                            <i className="zmdi zmdi-format-list-bulleted" /> <span>Thời khóa biểu</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to="/salary">
                                            <i className="zmdi zmdi-grid" /> <span>Salary</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/shift">
                                            <i className="zmdi zmdi-calendar" /> <span>Shift</span>
                                        </NavLink>
                                    </li>*/}
                                    <li>
                                        <NavLink to="/attendance">
                                            <i className="zmdi zmdi-face" /> <span>Danh sách điểm danh</span>
                                        </NavLink>
                                    </li> 
                                    <li>
                                        <NavLink to="/chatprocess">
                                            <i className="zmdi zmdi-lock" /> <span>Tin nhắn</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to="/mission">
                                            <i className="zmdi zmdi-account-circle" />Missions<span></span>
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to="/resign">
                                            <i className="zmdi zmdi-lock" /> <span>Tin tức</span>
                                        </NavLink>
                                    </li>
                                </>
                                : dataUser[0].role == 2
                                    ?
                                    <>
                                        <li>
                                            <NavLink to="/attendance">
                                                <i className="zmdi zmdi-face" /> <span>Thời khóa biểu</span>
                                            </NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/chatprocess">
                                                <i className="zmdi zmdi-lock" /> <span>Chat</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/mission">
                                                <i className="zmdi zmdi-account-circle" /> <span>Mission</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/resign">
                                                <i className="zmdi zmdi-lock" /> <span>Resign</span>
                                            </NavLink>
                                        </li> */}
                                    </>
                                    : dataUser[0].role == 3 ?
                                         <>
                                        <li>
                                            <NavLink to="/attendance">
                                                <i className="zmdi zmdi-face" /> <span>Attendance</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/chatprocess">
                                                <i className="zmdi zmdi-lock" /> <span>Chat</span>
                                            </NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/mission">
                                                <i className="zmdi zmdi-account-circle" /> <span>Mission</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/resign">
                                                <i className="zmdi zmdi-lock" /> <span>Resign</span>
                                            </NavLink>
                                        </li> */}
                                    </>
                                        :""
                        }

                        {/*
                        <li>
                            <a href="login.html" >
                                <i className="zmdi zmdi-lock" /> <span>Login</span>
                            </a>
                        </li>
                        <li>
                            <a href="register.html" >
                                <i className="zmdi zmdi-account-circle" /> <span>Registration</span>
                            </a>
                        </li> */}
                        {/* <li>
                            <a href="https://themeforest.net/item/dashtreme-multipurpose-bootstrap4-admin-template/23059455"  className="pro-btn">
                                <i className="zmdi zmdi-cloud-upload" /> <span>Upgrade To PRO</span>
                            </a>
                        </li> */}
                        {/* <li className="sidebar-header">LABELS</li>
                        <li><a href="javaScript:void();"><i className="zmdi zmdi-coffee text-danger" /> <span>Important</span></a></li>
                        <li><a href="javaScript:void();"><i className="zmdi zmdi-chart-donut text-success" /> <span>Warning</span></a></li>
                        <li><a href="javaScript:void();"><i className="zmdi zmdi-share text-info" /> <span>Information</span></a></li> */}
                    </ul>
                </div>

            </div>
        );
    }
}

export default MenuBar;