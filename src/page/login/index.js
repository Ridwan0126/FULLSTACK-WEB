import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LogoLogin } from "../../assets";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const { listUser } = this.props.isLogedIn;
    console.log(`HANDLE SUBMIT LOGIN ====>`, listUser);
    for (let i = 0; i < listUser.length; i++) {
      console.log("USER LOGIN SEBAGAI :", listUser[i]["email"]);
      if (
        email === listUser[i]["email"] &&
        password === listUser[i]["password"]
      ) {
        listUser
          .filter((user) => user.email === email && user.password === password)
          .map((filterData) => {
            return filterData;
          });
        this.setState({
          email: "",
          password: "",
        });
        this.props.doLogin();
        <Link to="/home"></Link>;
        return alert("Sukses");
      }
    }
    return alert("maaf gagal untuk login");
  };
  render() {
    if (this.props.isLogedIn.statusLogin) return <Redirect to="/home" />;

    const { email, password } = this.state;
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <div className="paper">
            <div className="form">
              <img src={LogoLogin} alt="logo" width="350px" height="220px" />
              <Typography className="title" variant="h4">
                Sign In
              </Typography>
              <form className="form" onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoFocus
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={this.handleChange}
                />
                <br />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Masukkan sandi anda"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Sign In
                </Button>
                <br />
                <Grid container>
                  <Grid item>
                    <Link to="/register/_add" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogedIn: state.Auth,
});
const mapDispatchToProps = (dispatch) => ({
  doLogin: () => dispatch({ type: "LOGIN" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
