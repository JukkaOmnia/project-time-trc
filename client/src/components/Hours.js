import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";

const styles = theme => ({
    padding: {
        paddingTop: 80
    }
});

class Hours extends Component {
    constructor(props) {
        super(props);
        //set initial state here
        this.state = ({});
    }

    //https://reactjs.org/docs/react-component.html#componentdidmount
    //componentDidMount() is invoked immediately after a component is mounted

    componentDidMount() {
        // data can be fetched here for the first time
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify={"center"} className={classes.padding}>
                <div>
                    <Typography
                        style={{paddingTop: 10}}
                        align={"center"}
                        color="primary"
                        variant="h4"
                    >
                        Hours component
                    </Typography>

                    <Typography
                        style={{paddingTop: 10}}
                        align={"center"}
                        color="primary"
                        variant="h6"
                    >
                        Hours component line two
                    </Typography>
                </div>
            </Grid>
        );
    }
}

export default (withStyles(styles)(Hours));