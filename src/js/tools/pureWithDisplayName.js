import pure from 'recompose/pure'
import getDisplayName from 'recompose/getDisplayName'

const pureWithDisplayName = (WrappedComponent, name)=> {

    WrappedComponent.displayName = name;
    return pure(WrappedComponent);
};

export default pureWithDisplayName