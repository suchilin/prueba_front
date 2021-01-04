import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { signin } from "../api/auth";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Iniciar sesion
      </Typography>
      <form
        onSubmit={async (event: React.FormEvent<any>) => {
          event.preventDefault();
          try {
            await signin(email, password);
            setErr("");
            history.push("/");
          } catch (err) {
            setErr(err.message);
          }
        }}
      >
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              let value = event.target.value;
              setEmail(value);
            }}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              let value = event.target.value;
              setPassword(value);
            }}
          />
        </div>
        {err && <div>Login error: {err}</div>}
        <div>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Iniciar sesion
          </Button>
        </div>
      </form>
    </Container>
  );
};
