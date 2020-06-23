import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'
import MenuBar from '../component/layout/MenuBar';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import bend from '../component/action/bend'
import department from '../component/action/department';
import position from '../component/action/position';
import salary from '../component/action/salary';
import shift from '../component/action/shift';

class router extends Component {
    render() {
        return (
            <div>
                <Header />
                <MenuBar />
                <Route path="/bend" component={bend} />
                <Route path="/department" component={department} />
                <Route path="/position" component={position}/>
                <Route path="/salary" component={salary}/>
                <Route path="/shift" component={shift}/>
                <Footer />
            </div>
        );
    }
}

export default router;