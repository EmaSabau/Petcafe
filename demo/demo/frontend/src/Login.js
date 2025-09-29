import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import axiosInstance from "./helper/axios";
import Grid from "@mui/material/Grid";
import history from './helper/history';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginSuccess: {
                id: 0,
            },
            errorMessage: "" // Stocarea mesajului de eroare
        };
    }

    handleInput = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmitFunction = event => {
        event.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password
        }

        // Regex pentru username de admin (nume.admin)
        const adminRegex = /^[a-zA-Z0-9]+\.admin$/;
        const isAdmin = adminRegex.test(credentials.username);

        // Regex pentru username normal (opțional)
        const userRegex = /^[a-zA-Z0-9]{4,15}$/;

        if (adminRegex.test(credentials.username) || userRegex.test(credentials.username)) {
            axiosInstance.post("/login", credentials)
                .then(res => {
                    const val = res.data;
                    this.setState({
                        loginSuccess: val
                    });
                    if (val.id !== 0) {
                        localStorage.setItem("USER_ID", res.data.id);
                        localStorage.setItem("IS_ADMIN", isAdmin); // Setează flag de admin

                        if (isAdmin) {
                            history.push("/admin");
                        } else {
                            history.push("/home");
                        }
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert("Invalid Credentials");
                })
        }
        else {
            alert("Username must be either:\n- 4-15 alphanumeric chars (regular user)\n- ending with .admin (admin user)");
        }
    }

    render() {
        return (
            <Container
                maxWidth="xl"
                style={{
                    backgroundImage: 'url(/images/LoginBackground.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    flexDirection: 'column'
                }}
            >
                <Grid container direction="column" alignItems="center" style={{ padding: '20px', borderRadius: '10px', maxWidth: '400px' }}>
                    <form onSubmit={this.onSubmitFunction} style={{ width: '100%' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nume utilizator"
                            name="username"
                            autoComplete="username"
                            onChange={this.handleInput}
                            autoFocus
                            InputLabelProps={{
                                style: { color: '#6a4e23' }
                            }}
                            InputProps={{
                                style: { color: '#6a4e23' }
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Parolă"
                            type="password"
                            id="password"
                            onChange={this.handleInput}
                            autoComplete="current-password"
                            InputLabelProps={{
                                style: { color: '#6a4e23' }
                            }}
                            InputProps={{
                                style: { color: '#6a4e23' }
                            }}
                        />
                        {this.state.errorMessage && (
                            <div style={{
                                color: 'red',
                                margin: '10px 0',
                                textAlign: 'center',
                                padding: '10px',
                                backgroundColor: '#ffeeee',
                                borderRadius: '5px'
                            }}>
                                {this.state.errorMessage}
                            </div>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{
                                backgroundColor: '#6a4e23',
                                color: 'white',
                                marginTop: '10px',
                                padding: '10px'
                            }}
                        >
                            Autentificare
                        </Button>
                    </form>
                </Grid>
            </Container>
        );
    }
}

export default Login;