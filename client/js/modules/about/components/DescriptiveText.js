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
            Hi. My name is Rob, and I'm a software developer from NYC. Thanks for visiting my website.    
        </p>
        <p className={ pClass }>
            I have always been a curious person who grew up developing a lot of introverted 
            hobbies which included: creating websites, videogames, music and art 
            (and these are things I still love today). 
        </p>
        <p className={ pClass }>
            I joined the military out of highschool to get some practical work experience, and to take 
            the more scenic route as I paid my way through undergraduate and graduate school for Computer
            Science. I wasn't riding the wave, and there wasn't a get-rich-quick scheme involved in my choices; 
            I just love what I do.
        </p>
        <p className={ pClass }>
            This site is a small collection of projects and miscellaneous things I wish I had more time to 
            devote to outside of class or work of many that got somewhere past the drawing board. You probably 
            won't find the most beautiful code on this portfolio itself since I spend most of my energy at work -- or, 
            at fun, or on hobbies, or just being a human and doing those things that they do, but I do 
            update normally as it is good to document as I (hopefully) always learn new skills and try to 
            push myself to consistently work on more interesting problems and ideas. 
        </p>
        <p className={ pClass }>
            Oh, and by the way, this site was created using some of my favorite current web development 
            technologies:&nbsp;
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
            </Tech>. Please feel free to check out some of the other sections linked above.
        </p>
        </>
    );
}

export default withFadeTransitions(DescriptiveText)