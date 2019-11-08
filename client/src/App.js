import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

import Home from "./components/Home";
import Customer from "./components/Customer";
import User from "./components/User";
import Hours from "./components/Hours";

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
});

class App extends Component {
    render() {
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <Navbar/>
                    <Route>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/customers" component={Customer}/>
                            <Route exact path="/users" component={User}/>
                            <Route exact path="/hours" component={Hours}/>
                        </Switch>
                    </Route>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;
