import React from 'react'
import { about as strings, } from 'strings'
import ButtonLink from 'utils/components/ButtonLink'
import withFadeTransitions from 'utils/withFadeTransitions'

function Tech ({ children, containerClass, url }) {
    return (
        <ButtonLink containerClass={ containerClass } url={ url }>
            { children }
        </ButtonLink>
    );
}

function DescriptiveText ({ pClass, techProps }) {
    return (
        <>
            <p className={ pClass }> 
                Hi. My name is Rob, and I'm a software developer from NYC. Thanks for visiting.
            </p>

            <p className={ pClass }>
                This site was created using my stack of choice most days:&nbsp;
                <Tech url={'https://reactjs.com'} { ...techProps }>React
                </Tech>,&nbsp;
                <Tech
                    url={'https://redux.js.org'} 
                    { ...techProps }
                >Redux
                </Tech>,&nbsp;
                <Tech 
                    url={'https://threejs.org'} 
                    { ...techProps }
                >THREE.js
                </Tech>,&nbsp; 
                <Tech 
                    url={'https://nodejs.org'} 
                    { ...techProps }
                >Node
                </Tech>,&nbsp; 
                <Tech 
                    url={'https://webpack.js.org/'} 
                    { ...techProps }
                >Webpack
                </Tech>,&nbsp;
                { strings.andDeployedUsing }
                <Tech 
                    url={'http://nginx.org'} 
                    { ...techProps }
                >NginX
                </Tech> and&nbsp; 
                <Tech 
                    url={'http://pm2.keymetrics.io/'} 
                    { ...techProps }
                >PM2
                </Tech>. I am always trying to evolve my workflow and understanding of things.. so 
                hopefully the experience here is not aging too badly 🙃
            </p>

            <p className={ pClass }>
                A little about me and why this page exists: I have always been a curious person who grew up dabbling
                a lot of introverted hobbies which included: creating websites, videogames, apps, and designing UIs 
                (all of which are things I still love today and all of which there isn't enough time in the day for). 
                This site is a small collection of mostly self-driven projects that I wish I had more time to devote 
                to (the ones which made it somewhere beyond the drawing board). 
                You probably won't find the most beautiful code on this portfolio itself since I spend most of my 
                energy at work -- or, at fun, or on hobbies, or just being a human and doing those things that they do, 
                but I do try to update here and there.
            </p>

            <p className={ pClass }>
                My background: I joined the Navy as an Electronic Technician out of highschool to get some practical experience, 
                grow as a person, make the best of my situation, and to take the more scenic route and so that I could
                also devote a lot of undivided attention to my studies and projects. Since completing graduate school in Computer 
                Science, I have gotten to work in a variety of industries at various capacities including power/skyscraper 
                infrastructure mapping and management, intellectual property, virtual reality tours, finance, as well as 
                consistently on my own side projects which include development tools and small applications.
            </p>

            <p className={ pClass }>
                Intros aside, feel free to check out the other sections here which should hopefully be a lot more interesting!
            </p>
        </>
    );
}

export default withFadeTransitions(DescriptiveText)