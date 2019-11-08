import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";

import isEmpty from "../validation/is-empty";
import {getUsers, createUser} from "../api/Users";

const styles = theme => ({
    layout: {
        [theme.breakpoints.down('sm')]: {
            width: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingRight: 40,
            paddingLeft: 30
        },
        [theme.breakpoints.up('md')]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    padding: {
        paddingTop: 80
    },
    fabTop: {
        position: 'fixed',
        top: theme.spacing(10),
        right: theme.spacing(2),
        zIndex: 1000,
    },
    fabBottom: {
        margin: theme.spacing(1),
        position: "fixed",
        zIndex: 1000,
        [theme.breakpoints.down('sm')]: {
            size: "small",
            bottom: theme.spacing(1),
            right: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            bottom: theme.spacing(6),
            right: theme.spacing(6)
        },
        [theme.breakpoints.up('lg')]: {
            bottom: theme.spacing(6),
            right: theme.spacing(6)
        },
    },
});

class User extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            success: false,
            name_err: '',
            users: [],
            loading: true,
            showAdd: false,
            id: '',
            name: '',
        });
    }

    componentDidMount = async () => {
        const {users, error} = await getUsers();
        this.setState({
            users: users,
            error: error,
            loading: false
        });
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSave = async () => {
        if (isEmpty(this.state.name)) {
            this.setState({name_err: 'Name is mandatory field.'});
            return
        } else {
            this.setState({name_err: ''});
        }

        const userData = {
            name: this.state.name
        };
        const {success, error, user} = await createUser(userData);
        this.setState({name: '', showAdd: false});

        this.setState({loading: true});
        const {users} = await getUsers();

        this.setState({
            users: users,
            loading: false
        });
    };

    onAdd = () => {
        this.setState({showAdd: true, name: ''})
    };

    onListItemClick = (event, index) => {
        if (index === this.state.selectedIndex) {
            this.setState({
                selectedIndex: '',
                id: '',
                name: '',
                showAdd: false
            });
        } else {
            this.setState({
                selectedIndex: index,
                id: this.state.users[index]._id,
                name: this.state.users[index].name,
                showAdd: true
            });
        }
    };

    renderAddUser() {
        return (
            <Grid style={{paddingTop: 40}} container justify="center">
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        User name:
                    </Typography>
                    <TextField
                        value={this.state.name}
                        error={!isEmpty(this.state.name_err)}
                        helperText={this.state.name_err}
                        onChange={this.onChange}
                        required
                        id="name"
                        name="name"
                        fullWidth
                    />
                </Grid>
                <Button
                    style={{marginTop: 20}}
                    size={"medium"}
                    variant={"contained"}
                    color="primary"
                    onClick={this.onSave}
                >
                    save
                </Button>
            </Grid>
        )
    };

    renderUserList = () => {
        return (
            <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"b"}>
                {this.state.users.map((row, index) => {
                    return (
                        <ListItem
                            divider
                            key={index}
                            index={index}
                            button
                            selected={this.state.selectedIndex === index}
                            onClick={event => this.onListItemClick(event, index)}
                        >
                            <ListItemText primary={row.name}/>
                        </ListItem>
                    )
                })}
            </List>
        )
    };

    renderList = () => {
        const {classes} = this.props;
        return (
            <main className={classes.layout}>
                <Grid container justify={"center"} className={classes.padding} key="a">
                    <Typography
                        style={{paddingTop: 10}}
                        align={"center"}
                        color="primary"
                        variant="h4"
                    >
                        User
                    </Typography>
                    <Fab
                        className={classes.fabBottom}
                        color="primary"
                        aria-label="add"
                        onClick={this.onAdd}
                        disabled={this.state.showAdd}
                    >
                        <Tooltip
                            title={"Add new category"}
                        >
                            <AddIcon
                                color="inherit"
                            />
                        </Tooltip>
                    </Fab>
                </Grid>
                {this.state.showAdd ? (this.renderAddUser()) : (this.renderUserList())}
            </main>
        )
    };

    renderLoading = () => {
        const {classes} = this.props;
        return (
            <div>
                <Grid container justify="center">
                    <CircularProgress className={classes.progress}/>
                </Grid>
            </div>
        )
    };

    render() {
        const {loading} = this.state;
        return (
            <div>
                {loading ? (
                        this.renderLoading()
                    )
                    :
                    (
                        this.renderList()
                    )}
            </div>
        );
    }
}

export default (withStyles(styles)(User));