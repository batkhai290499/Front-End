import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios'
import Moment from 'moment';

class Chatprocess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            message: [],
            chat_from: '',
            content: '',
            listById: [],
            id_account: '',
            newMes: [],
        }
    }

    componentDidMount() {
        this.getUser()
        this.getAllUserById()
        this.getAllMessage()
    }

    componentWillMount(item) {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        var socket = io("http://localhost:4000");
        var room = item + "," + dataUser[0].id;
        socket.on('connect', function () {
            socket.emit('room', room);
        });

        socket.on('message', (data) => {
            var { message } = this.state
            message.unshift(data)
            this.setState({
                message
            })
        });
    }

    getAllMessage = (item) => {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        axios.get(`/api/chat/views/${item}/${dataUser[0].id}`)
            .then(res => {
                if (res.status === 200) {
                    const message = res.data;
                    this.setState({
                        message: message.message,
                    })

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

                    this.setState({
                        id_account: listById.id_account,
                        username: listById.username,
                        name: listById.name,
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
    };

    handleSendMessage = (event) => {
        event.preventDefault();
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))

        const newMessage = {
            chat_to: dataUser[0].id,
            chat_from: this.state.id_account,
            content: this.state.content,
            time: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
        axios.post(`/api/chat/insert/${dataUser[0].id}/${this.state.id_account}`, newMessage)
            .then(res => {
                let message1 = this.state.message;
                message1 = [newMessage, ...message1];
                this.setState({ message: message1 });

            })
            .catch(error => console.log(error));
    };

    render() {
        var dataUser = JSON.parse(localStorage.getItem('userInfo'))
        var sort = this.state.message.sort()
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
                                                <h3>{this.state.newMes.content}</h3>
                                            </div>
                                        </header>
                                        <ul id="chat">
                                            {sort.map((item, key) =>
                                                <>
                                                    {item.chat_to !== dataUser[0].id
                                                        ?
                                                        <>
                                                            <li className="you">
                                                                <div className="entete">
                                                                    <span className="status green" />
                                                                    <h2>{this.state.name} </h2>
                                                                    <h3>{
                                                                        Moment(item.time).format(" HH:mm:ss")
                                                                    }</h3>
                                                                </div>
                                                                <div className="message">
                                                                    {item.content}
                                                                </div>
                                                            </li>

                                                        </>
                                                        :
                                                        <>
                                                            <li className="me">
                                                                <div className="entete">
                                                                    <h3> You</h3>
                                                                    <h2>{
                                                                        Moment(item.time).format(" HH:mm:ss")
                                                                    }</h2>
                                                                    <span
                                                                        className="status blue" />
                                                                </div>
                                                                <div className="message">
                                                                    {item.content}
                                                                </div>
                                                            </li>
                                                        </>

                                                    }

                                                </>
                                            )}

                                        </ul>
                                        <footer>
                                            <textarea placeholder="Type your message" name="content" onChange={this.handleInputChange} />
                                            <button id="send" type="submit" className="btn btn-success waves-effect waves-light m-1"
                                                onClick={this.handleSendMessage} >
                                                SEND
                                                </button>
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
                                        <button onClick={() => this.getAllUserById(item.id_account) || this.getAllMessage(item.id_account) || this.componentWillMount(item.id_account)} 
                                        data-target="#chat" key={key}>
                                            <li>
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                                <div>
                                                    <h2>{item.name}</h2>

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