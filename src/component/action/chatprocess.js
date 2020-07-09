import React, { Component } from 'react';

class Chatprocess extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row ">
                        <div  className="col-12">
                        <main className="col-10">
                                <header>
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                    <div>
                                        <h2>Chat with Vincent Porter</h2>
                                        <h3>already 1902 messages</h3>
                                    </div>
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
                                </header>
                                <ul id="chat">
                                    <li className="you">
                                        <div className="entete">
                                            <span className="status green" />
                                            <h2>Vincent</h2>
                                            <h3>10:12AM, Today</h3>
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                        </div>
                                    </li>
                                    <li className="me">
                                        <div className="entete">
                                            <h3>10:12AM, Today</h3>
                                            <h2>Vincent</h2>
                                            <span className="status blue" />
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                        </div>
                                    </li>
                                    <li className="me">
                                        <div className="entete">
                                            <h3>10:12AM, Today</h3>
                                            <h2>Vincent</h2>
                                            <span className="status blue" />
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            OK
                                        </div>
                                    </li>
                                    <li className="you">
                                        <div className="entete">
                                            <span className="status green" />
                                            <h2>Vincent</h2>
                                            <h3>10:12AM, Today</h3>
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                        </div>
                                    </li>
                                    <li className="me">
                                        <div className="entete">
                                            <h3>10:12AM, Today</h3>
                                            <h2>Vincent</h2>
                                            <span className="status blue" />
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                        </div>
                                    </li>
                                    <li className="me">
                                        <div className="entete">
                                            <h3>10:12AM, Today</h3>
                                            <h2>Vincent</h2>
                                            <span className="status blue" />
                                        </div>
                                        <div className="triangle" />
                                        <div className="message">
                                            OK
                                        </div>
                                    </li>
                                </ul>
                                <footer>
                                    <textarea placeholder="Type your message" defaultValue={""} />
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
                                    <a href="#">Send</a>
                                </footer>
                            </main>
                            <aside className="col-2">
                                <header>
                                    <input type="text" placeholder="search" />
                                </header>
                                <ul >
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status orange" />
                                                offline
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                                online
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status orange" />
                                                offline
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_04.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                            online
                                        </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_05.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status orange" />
                                                offline
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                                online
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_07.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                                online
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_08.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                            online
                                        </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_09.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status green" />
                                                online
                                            </h3>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_10.jpg" alt="" />
                                        <div>
                                            <h2>Prénom Nom</h2>
                                            <h3>
                                                <span className="status orange" />
                                            offline
                                        </h3>
                                        </div>
                                    </li>
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