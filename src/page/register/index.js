import React, { Component } from "react";
import UserService from "../../service/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { LogoRegister } from "../../assets";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      id: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = (e) => {
    e.preventDefault();
    const { id, fullname, username, email, password, confirmPassword } =
      this.state;
    const { userList } = this.props;
    let newUser = [
      {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
      },
    ];
    console.log("EMAIL ====>", email);
    console.log("PASSWORD ====>", password);
    console.log("KONFIRMASI PSW ===>", confirmPassword);
    console.log(`LIST USER ===>`, userList.email);
    for (let i = 0; i < userList.length; i++) {
      if (userList[i]["email"] === email) return alert("Email sudah ada");
    }

    if (password !== confirmPassword) return alert("Password tidak sama");
    if (id === "_add") {
      UserService.createUsers(newUser[0]);
      alert("Register sukses");
      this.setState({ status: true });
      setTimeout(function () {
        window.location.reload(1);
      }, 500);
    } else {
      UserService.updateUser(newUser[0], id);
      console.log("DATA JSON ====> :", newUser);
      alert("Sukses Update");
      this.setState({ status: true });
      setTimeout(function () {
        window.location.reload(1);
      }, 500);
    }
  };
  componentDidMount() {
    const userList = this.props.userList;
    if (this.props.match.params.id === "_add") {
      this.setState({ id: this.props.match.params.id });
    } else {
      const data = userList.filter(
        (user) => user.id === parseInt(this.props.match.params.id)
      );
      this.setState({
        id: this.props.match.params.id,
        fullname: data[0]["fullname"],
        username: data[0]["username"],
        email: data[0]["email"],
        password: data[0]["password"],
      });
    }
  }

  render() {
    const { fullname, username, email, password, confirmPassword } = this.state;
    console.log("PENGECEKAN ID ===>", this.state.id);
    if (this.state.status) return <Redirect to="/home" />;
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <div className="form">
              <img src={LogoRegister} alt="logo" width="350px" height="220px" />
              <Typography className="title" variant="h4">
                {this.state.id === "_add" ? "Sign Up" : "Form Edit"}
              </Typography>
              <form className="form" onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  placeholder="Masukkan nama lengkap anda"
                  name="fullname"
                  autoFocus
                  value={fullname}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  placeholder="Masukkan username anda"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Masukkan alamat email baru"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Masukkan password minimal 6 karakter"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="Konfirmasi Password"
                  type="Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.Auth.listUser,
});
const mapDispatchToProps = (dispatch) => ({
  registrasi: (newUser) => dispatch({ type: "REGISTER", payload: { newUser } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
