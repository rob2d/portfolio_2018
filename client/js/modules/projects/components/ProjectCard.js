import React, { PureComponent } from 'react';
import clsx from 'clsx';
import Typography  from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Icon } from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import useStyles from './style/ProjectCardStyle';
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from './../constants/DisplayStates';

function ProjectCardLayout (props) {
    const classes = useStyles(props);
    
    const { 
        data : { 
            id, 
            title, 
            context, 
            shortDescription 
        }, 
        pData, 
        onClick, 
        parent, 
        viewAsTitle 
    } = props;

    return (
        <div 
            ref={ c => parent.R.container = c } 
            className={ classes.container }
        >
            <Card 
                className={ clsx(
                    viewAsTitle && 
                    classes.cardContainerAsTitle, 
                    classes.cardContainerBase
                ) } 
                onMouseDown={ onClick }
            >
                <div className={ classes.cardMediaContent }>
                    <img
                        src={ `/img/projects/${ id }/${ id }_thumb.png` }
                        className={ classes.cardMediaImg }
                    />
                    <div className={ classes.titleOverlay }>
                        <p className={ classes.projectTitle }>
                            { title }
                        </p>
                        <p className={ classes.projectSubtitle }>
                            { context } ({ pData.year })
                        </p>
                        <Icon 
                            path={ mdiInformationOutline } 
                            className={ classes.moreInfoButton }
                            size={ 1.4 }
                        />  
                    </div>
                </div>
                <CardContent className={ classes.cardContent }>
                    <Typography component="p">
                        { shortDescription }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default class ProjectCard extends PureComponent {
    
    state = {
        hasAbsolutePosition : false,
        viewAsTitle : false,
        onScreen : true
    };

    R = { container : undefined };
    offsetX = undefined;
    offsetY = undefined;
    
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }
    componentDidMount() {
        if(this.R.container) {
            this.R.container.addEventListener('mouseenter', this.onMouseEnter);
            this.R.container.addEventListener('mouseleave', this.onMouseLeave);
        }
    }
    componentWillUnmount () {
        if(this.R.container) {
            this.R.container.removeEventListener('mouseenter', this.onMouseEnter);
            this.R.container.removeEventListener('mouseleave', this.onMouseLeave);
        }
    }
    componentWillUpdate () {
        if(this.R.container) {
            this.offsetX = this.R.container.offsetLeft;
            this.offsetY = this.R.container.offsetTop;
        }
    }
    onMouseEnter = ()=> {
        this.setState({ isBeingHovered : true });
    };
    onMouseLeave = ()=> {
        this.setState({ isBeingHovered : false });
    };
    componentWillReceiveProps(nextProps) {
        let stateUpdates = {};  // object to update state in one event

        if(nextProps.isSelected) {

            // TODO : use an enum for DisplayStates so absolute_position
            //        can be simple integer check?

            switch(nextProps.displayState) {
                case VIEW_ALL : 
                    stateUpdates.hasAbsolutePosition = false;
                    break;

                case PROJECT_FADE_TO :
                    stateUpdates.hasAbsolutePosition = false;
                    break;

                case OFFSET_CALCULATION :
                    if(this.R.container) {
                        stateUpdates.offsetX = this.R.container.offsetLeft;
                        stateUpdates.offsetY = this.R.container.offsetTop;
                        stateUpdates.hasAbsolutePosition = false;
                    }
                    break;

                case AFTER_FADE_POSITIONING : 
                    stateUpdates.hasAbsolutePosition = true;
                    break;

                case PROJECT_SCROLL_UP :
                    if(nextProps.wasSelectionViaUI) {
                        stateUpdates.hasAbsolutePosition = true;                        
                    }
                    stateUpdates.offsetX = 0;
                    stateUpdates.offsetY = 0;
                    break;
                    
                case PROJECT_VIEW :
                    stateUpdates.viewAsTitle = true;
                    stateUpdates.isBeingHovered = false;
                    stateUpdates.hasAbsolutePosition = true;

                    // prevents double-setting of state
                    // which breaks CSS reflow during
                    // more elaborate transition
                    if(!this.props.wasSelectionViaUI) {
                        stateUpdates.offsetX = 0;
                        stateUpdates.offsetY = 0;
                    }
                    break;
            }
        }
        else if(!nextProps.isSelected) {
            this.offsetX = undefined;
            this.offsetY = undefined;
            
            stateUpdates.hasAbsolutePosition = false;
            stateUpdates.viewAsTitle = false;

            if(nextProps.displayState == PROJECT_VIEW) {
                stateUpdates.isBeingHovered = false;
            }
        }

        if(Object.keys(stateUpdates).length) {
            this.setState(stateUpdates); // apply updates to state
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if we are going from being selected 
        // to not selected, grab the coordinates 
        // after being processed
        if(this.R.container && (!this.props.isSelected && prevProps.isSelected && 
            this.state.offsetX == 0 && this.state.offsetY == 0)) {
                this.setState({ 
                    offsetX : this.R.container.offsetLeft,
                    offsetY : this.R.container.offsetTop
                });
        }
    }
    render () {
        const { 
            isSelected, 
            wasSelectionViaUI, 
            onScreen 
        } = this.props;

        const { 
            offsetX, offsetY, 
            hasAbsolutePosition, 
            viewAsTitle, isBeingHovered
        } = this.state;


        return (
            <ProjectCardLayout
                onScreen={ onScreen }
                parent={ this }
                offsetX={ offsetX }
                offsetY={ offsetY }
                hasAbsolutePosition={ hasAbsolutePosition }
                isBeingHovered={ isBeingHovered }
                isHighlighted={ isBeingHovered || isSelected }
                viewAsTitle={ viewAsTitle }
                isSelected={ isSelected  }
                { ...this.props }
            />
        );
    }
}