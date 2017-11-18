import axios from 'axios';
import React, {Component} from 'react';
import settings from '../../config/settings';
import {Link, withRouter} from 'react-router-dom';
import {Checkbox} from 'semantic-ui-react'
import swal from 'sweetalert';
import './Login.scss';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            adminCheatCode: [38, 38, 40, 40, 37, 39, 37, 39, 65, 66, 65, 66],  // Up, Up, Down, Down, Left, Right, Left, Right, A, B, A, B
            cancelAdminCheatCode: [81], // Q
            keyStroke: [],
            isAdminLogin: false,
        }
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleToggle(event, data) {        
        this.setState({isAdminLogin: data.checked});

        if (data.checked) {
            swal({
                title: "Darth Vendor Mode",
                text: "Admin login enabled. Remember, this power is privilege.",
                icon: "warning",
                button: "Ok"
            })
        } else { 
            swal({
                title: "Stormtrooper Mode",
                text: "Admin login disabled.",
                icon: "warning",
                button: "Ok"
            })  
        }      
    }

    handleLoginForm() {
        const {dispatch, history} = this.props;

        let data = {
            'email': this.state.username,
            'password': this.state.password,
            'isAdmin': false
        };

        if (this.state.isAdminLogin) {
            data['isAdmin'] = true;
        }

        axios({
            method: 'post',
            url: `${settings.API_ROOT}/login`,
            data: data,
            withCredentials: true
        })
        .then(response => {
            // console.log(response.datan);
            localStorage.setItem('activeUser', JSON.stringify(response.data));

            if(response.data.isAdmin === true) {
                history.push('/admin');
            } else {
                history.push('/');
            }
            
        })
        .catch(error => {
            if (error.request.status === 401) {
                swal({
                    title: "Uh oh!",
                    text: "Are you lost?",
                    icon: "error",
                    button: "Ok",
                });
            } else {
                swal({
                    title: "Woops!",
                    text: "Please provide valid credentials.",
                    icon: "error",
                    button: "Ok",
                });
            }
        })
    }

    onKeyPressHandler(event) {

        this.setState((state) => {
            return {keyStroke: [...this.state.keyStroke, event.keyCode]}
        },
        () => {
            if (this.state.keyStroke.join(',').includes(this.state.adminCheatCode.join(','))) {
                swal({
                    title: "Darth Vendor Mode",
                    text: "Admin login enabled. Remember, this power is privilege.",
                    icon: "warning",
                    button: "Ok"
                })

                this.setState({keyStroke: [], isAdminLogin: true});
            } else if (this.state.isAdminLogin && this.state.keyStroke.join(',').includes(this.state.cancelAdminCheatCode.join(','))) {
                swal({
                    title: "Stormtrooper Mode",
                    text: "Admin login disabled.",
                    icon: "warning",
                    button: "Ok"
                })
                this.setState({keyStroke: [], isAdminLogin: false});
            }

        });
    }

    loginForm(){
        
        let toggleButton = (
            <div className="d-flex justify-content-end" style={{}}>
                <label style={{fontWeight: '600', padding: '0 5px 0 5px'}}> Admin </label>
                <Checkbox 
                    toggle                     
                    onClick={(e, d) => this.handleToggle(e, d)}
                />
            </div>
        )


        return (   
            <div id="login">
            <div className="header">
                <h1> Login </h1>
            </div>
            <form>
                <div className="input-group mb-3">
                    <div className="input-group-addon">
                        <i className="fa fa-user"></i>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => this.handleUserNameChange(e)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-addon">
                        <i className="fa fa-lock"></i>
                    </div>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => this.handlePasswordChange(e)}
                    />
                </div>

                {toggleButton}

                <button
                    type="button"
                    className="btn btn-dark btn-block"
                    onClick={() => this.handleLoginForm()}
                >
                    Login <i className="fa fa-sign-in"></i>
                </button>
            </form>
            <div id="register" className="d-flex justify-content-end mt-3">
                     Don't have an account? <Link className="link" to={`/register`}> Sign up now.</Link> 
            </div>
        </div>
        );
    }

    componentWillMount() {
        console.log(localStorage);

        const {dispatch, history} = this.props;

        if (localStorage.activeUser) {
            const activeUser = JSON.parse(localStorage.activeUser);

            if (activeUser.isAdmin === true) {
                // Redirect to admin home page
                history.push('/admin/');
            } else {
                // Redirect to merchant home page
                history.push('/');
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) =>this.onKeyPressHandler(e), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (e) =>this.onKeyPressHandler(e), false);
    }

    render() {
        return (
            <div className="container">
                <div className="form__body d-flex justify-content-center align-items-center">
                    <div className="wrapper">
                        {this.loginForm()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
