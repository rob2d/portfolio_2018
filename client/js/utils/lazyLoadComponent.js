import Loadable from 'react-loadable'
import LoadingComponent from 'utils/components/LoadingComponent'

function lazyLoadComponent ({ loader, resolver }) {
    return Loadable({
        loader : ()=> 
            new Promise((resolve, reject)=> 
                loader()
                    .then( m => resolve(resolver(m)) )
                    .catch( reject )
            ),
        loading : LoadingComponent
    })
}

export default lazyLoadComponent