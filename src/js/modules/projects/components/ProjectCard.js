import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import Typography  from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import styleSheet from './style/ProjectCardStyle'
import { DisplayStates } from './ProjectsPanel'

const ProjectCardLayout = injectSheet(styleSheet)(function ProjectCardLayout({
    data,
    pData,
    classes,
    onClick,
    controllerComponent,
    viewAsTitle
}) {

    let containerClass = ( viewAsTitle ? 
                            classes.cardContainerAsTitle : 
                            classes.cardContainer );

    return (
        <div ref={ (c)=>controllerComponent.R.container=c } className={classes.container}>
            <Card className={containerClass} onClick={onClick}>
                <CardMedia className={classes.cardMediaContent}>
                    <img
                        src={`/img/projects/${
                            data.id}/${
                            data.id}_thumb.png`
                        }
                        className={classes.cardMediaImg}
                    />
                    <div className={classes.titleOverlay}>
                        <p className={classes.projectTitle}>
                            {data.title}
                        </p>
                        <p className={classes.projectSubtitle}>
                            {data.context} ({pData.year})
                        </p>
                        <div className={classes.moreInfoButton}>
                            <i className={'mdi mdi-information-outline'}/>
                        </div>
                    </div>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography component="p">
                        {data.shortDescription}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
});

class ProjectCard extends PureComponent {
    constructor (props)
    {
        super(props);
        this.state = {
            hasAbsolutePosition : false,
            viewAsTitle         : false,
            onScreen            : true
        };
        this.R = { container : undefined };
        this.offsetX = undefined;
        this.offsetY = undefined;
    }
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

        if(nextProps.data.id == 'greedux') {
            console.log('greedux card props ->', nextProps);
        }

        if(nextProps.isSelected) {

            // TODO : use an enum for DisplayStates so absolute_position
            //        can be simple integer check?

            switch(nextProps.displayState) {
                case DisplayStates.VIEW_ALL_PROJECTS : 
                    stateUpdates.hasAbsolutePosition = false;
                    break;

                case DisplayStates.PROJECT_FADE_TO :
                    stateUpdates.hasAbsolutePosition = false;
                    break;

                case DisplayStates.PROJECT_OFFSET_CALCULATION :
                    if(this.R.container) {
                        stateUpdates.offsetX = this.R.container.offsetLeft;
                        stateUpdates.offsetY = this.R.container.offsetTop;
                        stateUpdates.hasAbsolutePosition = false;
                    }
                    break;

                case DisplayStates.AFTER_FADE_POSITIONING : 
                    stateUpdates.hasAbsolutePosition = true;
                    break;

                case DisplayStates.PROJECT_SCROLL_TO_TOP :
                    if(nextProps.wasSelectionViaUI) {
                        stateUpdates.hasAbsolutePosition = true;                        
                    }
                    stateUpdates.offsetX = 0;
                    stateUpdates.offsetY = 0;
                    break;
                    
                case DisplayStates.PROJECT_VIEW :
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

            if(nextProps.displayState == DisplayStates.PROJECT_VIEW) {
                stateUpdates.isBeingHovered = false;
            }
        }

        if(Object.keys(stateUpdates).length) {
            this.setState(stateUpdates); // apply updates to state
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        const { VIEW_ALL_PROJECTS } = DisplayStates;
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
            offsetX, 
            offsetY, 
            hasAbsolutePosition, 
            viewAsTitle, 
            isBeingHovered,
        } = this.state;

        // TODO | replace this whole inner state/prop 
        //      |  dynamic with new simpler 
        // TODO | "statefulProps" HOC

        return (
            <ProjectCardLayout
                onScreen={onScreen}
                controllerComponent={ this }
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

export default ProjectCard;