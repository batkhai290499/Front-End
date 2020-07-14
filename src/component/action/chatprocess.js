import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios'


class Chatprocess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            message: [],
            chat_from: '',
            content: '',
            listById: [],
            id_account: ''
        }
    }

    componentDidMount() {
        this.getUser()
        this.getAllUserById()
        this.getAllMessage()
    }

    componentWillMount() {
        let socket = openSocket('http://localhost:4000/test')
        console.log(socket);

    }

    getAllMessage = (item) => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        axios.get(`/api/chat/views/${dataUser[0].id}/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const message = res.data;
                    this.setState({
                        message: message.message,
                    })
                    console.log(this.state.message);
                }
            })
            .catch(error => console.log(error)
            );
    }
    getUser = () => {
        axios.get('/api/account/views')
            .then(res => {
                if (res.status === 200) {
                    const news = res.data;
                    this.setState({ news: news.news });
                }
            })
            .catch(error => console.log(error)
            );
    }
    getAllUserById = (item) => {
        axios.get(`/api/account/getById/${item}`)
            .then(res => {
                if (res.status === 200) {
                    const listById = res.data[0];
                    // var dep = this.state.listDepartment.filter((value) => {
                    //     console.log(value.value)
                    //     return  value.value == listById.id_department
                    // })
                    this.setState({
                        id_account: listById.id_account,
                        username: listById.username,
                        name: listById.name,
                    });
                    console.log(this.state.id_account);
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
        console.log(value);

    };

    handleSendMessage = (event) => {

        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        const newMessage = {
            chat_to: dataUser[0].id,
            chat_from: this.state.id_account,
            content: this.state.content,
            time: new Date().toLocaleTimeString(),
        };
        console.log(this.state.chat_from);
        console.log(this.state.content);
        axios.post('/api/chat/insert', newMessage)
            .then(res => {
                let message = this.state.message;
                message = [newMessage, ...message];
                this.setState({ message: message });
            })
            .catch(error => console.log(error));
    };
    render() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        console.log(dataUser[0]);
        
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-12">
                            <main className="col-10">
                                <form onSubmit={this.handleSendMessage}>
                                    <div>
                                        <header>
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                            <div>
                                                <h2 name="chat_from" onChange={this.handleInputChange} >Chat with {this.state.name}</h2>
                                                <h3>already count messages</h3>
                                            </div>
                                        </header>
                                        <ul id="chat">
                                            {this.state.message.map((item, key) =>
                                                <>
                                                    {item.name !== dataUser[0].name
                                                        ?
                                                        <li className="me">
                                                            <div className="entete">
                                                                <h3>{item.name}</h3>
                                                                <h2>{item.time}</h2>
                                                                <span 
                                                                className="status blue" />
                                                            </div>
                                                            <div className="message">
                                                                {item.content}
                                                            </div>
                                                        </li>
                                                        :
                                                        <li className="you">
                                                            <div className="entete">
                                                                <span className="status green" />
                                                                <h2>{item.name}</h2>
                                                                <h3>{item.time}</h3>
                                                            </div>
                                                            <div className="message">
                                                                {item.content}
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                            )}

                                        </ul>
                                        <footer>
                                            <textarea placeholder="Type your message" name="content" onChange={this.handleInputChange} />
                                            <button type="submit" className="btn btn-success waves-effect waves-light m-1">SEND</button>
                                        </footer>
                                    </div>
                                </form>
                            </main>
                            <aside className="col-2">
                                <header>
                                    <input type="text" placeholder="search" />
                                </header>

                                <ul >
                                    {this.state.news.map((item, key) =>
                                        <button onClick={() => this.getAllUserById(item.id_account) || this.getAllMessage(item.id_account)} data-target="#chat" key={key}>
                                            <li>
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                                <div>
                                                    <h2>{item.name}</h2>
                                                    <h3>
                                                        <span className="status orange" />
                                                        offline
                                                    </h3>
                                                </div>
                                            </li>
                                        </button>
                                    )}
                                </ul>
                            </aside>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatprocess;