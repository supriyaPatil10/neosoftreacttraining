import { Component } from "react"
import axios from "axios"

class Signup extends Component {

    constructor() {

        super()
        this.state = {


        }
        // alert("In construction")
    }
    user = {}

    // componentDidMount(){
    // alert("Mounted")

    // }

    // componentDidUpdate(){
    // alert("Component updated")

    // }

    componentWillUnmount() {


    }
    goOnline = () => {


        this.setState(
            {
                onlineUsers: this.state.onlineUsers + 1
            }
        )
    }

    getName = (event) => {
        this.user.name = event.target.value
        console.log("event value", event.target.value)
    }
    getEmail = (event) => {
        this.user.email = event.target.value
        console.log("event value", event.target.value)
    }

    getPassword = (event) => {
        this.user.password = event.target.value

    }

    register = () => {
        if (!this.user.email || !this.user.password || !this.user.name) {

            this.setState({
                errorMessage: "Please Fill Details"
            })
        }
        else {
            var baseurl = process.env.REACT_APP_BASE_URL;

            // let apiurl = "https://apibyashu.herokuapp.com/api/register"
            let apiurl = baseurl + "/api/register"
            axios({
                url: apiurl,
                method: "post",
                data: this.user
            })
            //    this.setState({
            //        errorMessage:null
            //    })
        }
        console.log("...... user details", this.user)

    }
    render() {

        return (
            <div >
                <br />
                <div className="fromcustom">
                    {/* hey users{this.state.onlineUsers} */}
                    <div className="form-group">
                        <label style={{ float: "left" }}>Name</label>
                        <input type="name" class="form-control" onChange={this.getName}></input>
                    </div>
                    <div className="form-group">
                        <label style={{ float: "left" }}>Email</label>
                        <input type="email" class="form-control" onChange={this.getEmail}></input>
                    </div>
                    <div className="form-group">
                        <label style={{ float: "left" }}>Password</label>
                        <input type="password" class="form-control" onChange={this.getPassword}></input>
                    </div>

                    <div style={{ color: "red" }}>
                        {this.state.errorMessage}
                    </div>
                    <button className="btn btn-primary" onClick={this.register}>Register</button>
                    {/* <button onClick={this.goOnline}>Go online</button> */}
                </div>
            </div>


        )
    }

}

export default Signup