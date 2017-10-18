import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import Typography  from 'material-ui/Typography'
import Button      from 'material-ui/Button'
import Card,
{
    CardActions,
    CardHeader, CardMedia,
    CardContent
} from 'material-ui/Card'
import styleSheet from './style/ProjectCardStyle'
import strings from 'strings'
import { DisplayStates } from './ProjectsPanel'

const ProjectCardLayout = injectSheet(styleSheet)(({
    data,
    classes,
    onClick,
    isShown,
    isSelected,
    hasAbsolutePosition,
    offsetX,
    offsetY,
    controllerComponent
})=>
(
    <div ref={ (c)=>controllerComponent.R.container=c } className={classes.container}>
        <Card className={classes.cardContainer} onClick={onClick}>
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
                        {data.context}
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
));
ProjectCardLayout.displayName = 'ProjectCardLayout';

class ProjectCard extends PureComponent
{
    constructor (props)
    {
        super(props);
        this.state =
        {
            hasAbsolutePosition : false,
            viewAsTitle         : false,
            onScreen            : true
        };
        this.R = { container : undefined };
        this.offsetX = undefined;
        this.offsetY = undefined;
    }
    componentWillMount()
    {
        this.componentWillReceiveProps(this.props);
    }
    componentDidMount()
    {
        if(this.R.container) {
            this.R.container.addEventListener('mouseenter', this.onMouseEnter);
            this.R.container.addEventListener('mouseleave', this.onMouseLeave);
        }
    }
    componentWillUnmount ()
    {
        if(this.R.container) {
            this.R.container.removeEventListener('mouseenter', this.onMouseEnter);
            this.R.container.removeEventListener('mouseleave', this.onMouseLeave);
        }
    }
    componentWillUpdate ()
    {
        if(this.R.container) {
            this.offsetX = this.R.container.offsetX;
            this.offsetY = this.R.container.offsetY;
        }
    }
    onMouseEnter = ()=>
    {
        this.setState({ isBeingHovered : true });
    };
    onMouseLeave = ()=>
    {
        this.setState({ isBeingHovered : false });
    };
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.isSelected) {
            switch(nextProps.displayState) {
                case DisplayStates.PROJECT_OFFSET_CALCULATION :
                    if(this.R.container) {
                        this.setState({
                            offsetX : this.R.container.offsetLeft,
                            offsetY : this.R.container.offsetTop
                        });
                    }
                    break;
                case DisplayStates.AFTER_FADE_POSITIONING :
                    this.setState({ hasAbsolutePosition : true });
                    break;
                case DisplayStates.PROJECT_SCROLL_TO_TOP :
                    this.setState({
                        hasAbsolutePosition : true,
                        offsetX : 0,
                        offsetY : 0
                    });
                    break;
                case DisplayStates.PROJECT_VIEW : 
                    this.setState({ viewAsTitle : true, isBeingHovered : false });
                    break;
            }
        }
        else if(!nextProps.isSelected) {
            this.offsetX = undefined;
            this.offsetY = undefined;
            
            const stateUpdates = { hasAbsolutePosition : false, viewAsTitle : false };

            if(nextProps.displayState == DisplayStates.PROJECT_VIEW) {
                stateUpdates.isBeingHovered = false;
            }

            this.setState(stateUpdates);
        }
    }
    render ()
    {
        const { isSelected, wasSelectionViaUI, onScreen } = this.props;
        const { 
            offsetX, offsetY, 
            hasAbsolutePosition, 
            viewAsTitle, 
            isBeingHovered,
        } = this.state;

        // TODO | replace this whole inner state/prop 
        //      |  dynamic with new simpler 
        // TODO | "statefulProps" HOC

        return onScreen && 
        (
            <ProjectCardLayout
                controllerComponent={ this }
                offsetX={ offsetX }
                offsetY={ offsetY }
                hasAbsolutePosition={ hasAbsolutePosition }
                isBeingHovered={ isBeingHovered }
                isHighlighted={ isBeingHovered || isSelected }
                viewAsTitle={ viewAsTitle }
                { ...this.props }
            />
        );
    }
}

export default ProjectCard;