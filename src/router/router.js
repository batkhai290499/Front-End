import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'
import MenuBar from '../component/layout/MenuBar';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';



class router extends Component {
    render() {
        return (
            <div>
                <Header />
                <MenuBar />
                <Route exact path="/login" />
                <Footer />
            </div>
        );
    }
}

export default router;