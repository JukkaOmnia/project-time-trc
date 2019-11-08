import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    grid: {
        maxWidth: 500,
        paddingTop: 80
    },
    padding: {
        paddingTop: 80
    },
    button: {
        margin: 5,
        width: 110,
    },
});

class Customer extends Component {
    constructor(props) {
        super(props);
        // set initial state here
        this.state = ({
            name: ''
        });
    }

    // componentDidMount() is invoked immediately after a component is mounted
    // read more https://reactjs.org/docs/react-component.html#componentdidmount

    componentDidMount() {
        // data can be fetched here for the first time
    }


    // https://medium.com/@joespinelli_6190/using-arrow-functions-to-avoid-binding-this-in-react-5d7402eec64
    // state can be changed "automatically" by using 'name' and 'value' according this.state specification in constructor
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSave = () => {
        // const customerData = {
        //     name: this.state.name,
        //     //... more fields
        // };
    };

    onCancel = () => {
        this.setState({name: ''});
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid className={classes.grid}>
                    <div>
                        <Typography
                            align={"center"}
                            color="primary"
                            variant="h4"
                        >
                            Customers component
                        </Typography>

                        <Typography
                            align={"center"}
                            color="primary"
                            variant="h6"
                        >
                            Customers component line two
                        </Typography>
                        <Typography
                            align={"center"}
                            color="primary"
                            variant="body1"
                        >
                            In practice, it might be a good idea to have a list of existing customers first.
                            Then, somewhere in the list there would be a button to add a new customer.
                            Then you would come to a screen like this one with a save button.
                        </Typography>

                        <Divider style={{height: 2}}/>

                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Name:
                            </Typography>
                            <TextField
                                value={this.state.name}
                                id="name"
                                name="name"
                                fullWidth
                                onChange={this.onChange}
                            />
                        </Grid>
                    </div>
                    <Grid
                        className={classes.grid}
                        container
                        justify="center"
                    >
                        <Button
                            className={classes.button}
                            size={"medium"}
                            variant={"contained"}
                            color="primary"
                            onClick={this.onSave}
                        >
                            save
                        </Button>

                        <Button
                            className={classes.button}
                            size={"medium"}
                            variant={"contained"}
                            color="inherit"
                            onClick={this.onCancel}
                        >
                            cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default (withStyles(styles)(Customer));
