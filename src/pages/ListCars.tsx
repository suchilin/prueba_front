import React, { useEffect, useState, Fragment } from "react";
import { getAll, save, maintain, liberate } from "../api/cars";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const ListCars: React.FC<any> = ({ history }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [cars, setCars] = useState(Array());
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [persona, setPersona] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [auto, setAuto] = useState<number>(0);
  const loadCars = async () => {
    const response = await getAll();
    setCars(response.data);
    setTotal(response.total);
    console.log("CARS RESPONSE ", response);
  };
  useEffect(() => {
    loadCars();
  }, []);
  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Autos
          </Typography>
          <Button
            style={{ marginLeft: "auto" }}
            color="inherit"
            onClick={(event) => {
              event.preventDefault();
              localStorage.clear();
              history.push("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <h1>Listado de autos</h1>
        <Button
          style={{ marginLeft: "auto" }}
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Nuevo auto
        </Button>
        <br />
        <br />
        {total <= 0 ? (
          <h3>No hay autos aun</h3>
        ) : (
          <Grid container spacing={4}>
            {cars.map((car: any, index: number) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    style={
                      car && car.person ? { backgroundColor: "#F5F5F5" } : {}
                    }
                  >
                    <CardMedia component="img" src={car.image} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Descripcion {car.person ? "(En mantenimiento)" : ""}
                      </Typography>
                      <Typography>Identificador: {car.id}</Typography>
                      <Typography>Marca: {car.maker}</Typography>
                      <Typography>Modelo: {car.model}</Typography>
                      {car && car.person && (
                        <Typography>Persona: {car.person}</Typography>
                      )}
                      {car && car.description && (
                        <Typography>Descripcion: {car.description}</Typography>
                      )}
                      {car && car.estimatedDate && (
                        <Typography>Fecha: {car.estimatedDate}</Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setAuto(car.id);
                          setOpen2(true);
                        }}
                      >
                        Mantenimiento
                      </Button>
                      {car && car.person && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            setAuto(car.id);
                            setOpen3(true);
                          }}
                        >
                          Liberar
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar nuevo auto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="marca"
            label="Marca del auto"
            type="text"
            fullWidth
            onChange={(event) => {
              const value = event.target.value;
              setMaker(value);
            }}
          />
          <TextField
            margin="dense"
            id="modelo"
            label="Modelo del auto"
            type="text"
            fullWidth
            onChange={(event) => {
              const value = event.target.value;
              setModel(value);
            }}
          />
          <br />
          <br />
          <Button variant="contained" component="label">
            Subir Imagen
            <input
              type="file"
              hidden
              onChange={async (event) => {
                const files = event.target.files;
                if (files) {
                  const base64 = await convertBase64(files[0]);
                  setImage(`${base64}`);
                }
              }}
            />
          </Button>
          <br />
          <br />
          {image && <img style={{ maxWidth: 300 }} src={image} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {maker && model && image && (
            <Button
              onClick={async () => {
                const response = await save(maker, model, image);
                const car = response.data;
                const newCars = [...cars, car];
                setCars(newCars);
                handleClose();
              }}
              color="primary"
            >
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={() => setOpen2(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Poner en mantenimiento
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="persona"
            label="Persona"
            type="text"
            fullWidth
            onChange={(event) => {
              const value = event.target.value;
              setPersona(value);
            }}
          />
          <TextField
            margin="dense"
            id="descripcion"
            label="Descripcion"
            multiline
            rows={4}
            rowsMax={5}
            type="text"
            fullWidth
            onChange={(event) => {
              const value = event.target.value;
              setDescripcion(value);
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Fecha estimada"
              format="MM/dd/yyyy"
              value={fecha}
              onChange={(date) => {
                setFecha(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen2(false)} color="primary">
            Cancel
          </Button>
          {persona && descripcion && fecha && (
            <Button
              onClick={async () => {
                const response = await maintain(
                  auto,
                  persona,
                  descripcion,
                  fecha.toUTCString()
                );
                const mantenimiento = response.data;
                const carsWO = cars.filter(
                  (car) => car.id != mantenimiento.car
                );
                let newCar = cars.find((car) => car.id == mantenimiento.car);
                newCar = { ...newCar, ...mantenimiento };
                const newCars = [...carsWO, newCar];
                setCars(newCars);
                setOpen2(false);
              }}
              color="primary"
            >
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={open3}
        onClose={() => setOpen3(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Liberar mantenimiento</DialogTitle>
        <DialogContent>
          <h3>Estas seguro de liberar este auto?</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen3(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await liberate(auto);
              const carsWO = cars.filter((car) => car.id != auto);
              let newCar = cars.find((car) => car.id == auto);
              newCar.person = null;
              newCar.description = null;
              newCar.estimatedDate = null;
              const newCars = [...carsWO, newCar];
              setCars(newCars);
              setOpen3(false);
            }}
            color="primary"
          >
            Liberar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ListCars;
