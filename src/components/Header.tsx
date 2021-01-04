import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Header: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <div />;
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={(event) => {
        event.preventDefault();
        localStorage.clear();
        history.push("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default withRouter(Header);
