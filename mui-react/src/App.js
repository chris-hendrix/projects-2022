import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ButtonGroup,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'

import { Save, Delete, Menu } from '@mui/icons-material'
import { makeStyles } from '@mui/styles' // depricated
import { createTheme, ThemeProvider, styled } from '@mui/material'
import { orange, green } from '@mui/material/colors'
import "@fontsource/roboto"

const theme = createTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 15
    }
  },
  palette: {
    primary: {
      main: green[400]
    },
    secondary: {
      main: orange[400]
    }
  }
})

const buttonStyle = {
  background: 'linear-gradient(45deg, #333, #999)',
  border: 0,
  borderRadius: '15px',
  color: 'white',
  padding: '5 30px'
}

const useStyles = makeStyles({
  root: buttonStyle
})

function StyledButton1 () {
  const classes = useStyles()
  return <Button className={classes.root}>Styled Button 1</Button>
}

function StyledButton2 () {
  return <Button sx={buttonStyle}>Styled Button 2</Button>
}

function StyledButton3 () {
  const Stylized = styled(Button)(buttonStyle)
  return <Stylized>Styled Button 3</Stylized>
}



function MuiCheckbox () {
  const [checked, setChecked] = React.useState(true)
  return (
    <FormControlLabel
      label="Testing Checkbox"
      control={<Checkbox
        checked={checked}
        icon={<Delete />}
        checkedIcon={<Save />}
        onChange={(e) => setChecked(e.target.checked)}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />}
    />

  )
}

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <div className="App">
          <header className="App-header">
            <AppBar color="secondary">
              <Toolbar>
                <IconButton>
                  <Menu />
                </IconButton>
                <Typography variant="h6">MUI Theming</Typography>
                <Button variant="outlined" color="primary">Login</Button>
              </Toolbar>
            </AppBar>
            <Typography variant="h2" component="h1">Welcome to MUI</Typography>
            <Typography variant="subtitle1" component="h2">Learn how to use Material UI</Typography>
            <StyledButton1 />
            <StyledButton2 />
            <StyledButton3 />
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={3} sm={6}><Paper style={{ height: 75, width: '100%' }} /></Grid>
              <Grid item xs={3} sm={6}><Paper style={{ height: 75, width: '100%' }} /></Grid>
              <Grid item xs={3} sm={6}><Paper style={{ height: 75, width: '100%' }} /></Grid>
            </Grid>

            <TextField
              variant="filled"
              color="secondary"
              type="email"
              label="email"
              placeholder="testing@test.com"
            />
            <MuiCheckbox />
            <ButtonGroup variant="contained" color="primary">
              <Button startIcon={<Save />}          >
                Save
              </Button>
              <Button startIcon={<Delete />} color="secondary">
                Discard
              </Button>
            </ButtonGroup>

            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App
