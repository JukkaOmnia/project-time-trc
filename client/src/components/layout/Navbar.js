import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from "react-router-dom";
import {Link as RouterLink} from 'react-router-dom';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    handleDrawerOpenClose = () => {
        this.setState({open: !this.state.open});
    };

    renderLink = React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <RouterLink to={this.props.to} {...itemProps} innerRef={ref}/>
    ));

    render() {
        return (
            <div>
                <AppBar
                    position="fixed"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpenClose}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            Project Time Tracker
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor={"left"}
                    open={this.state.open}
                >
                    <List>
                        <ListItem
                            button
                            onClick={this.handleDrawerOpenClose}
                            component={this.renderLink}
                            to="/customers"
                        >
                            <ListItemText primary="Customers"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleDrawerOpenClose}
                            component={this.renderLink}
                            to="/users"
                        >
                            <ListItemText primary="Users"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleDrawerOpenClose}
                            component={NavLink}
                            to="/hours"
                        >
                            <ListItemText primary="Hours"/>
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Navbar;