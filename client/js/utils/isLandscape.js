/**
 * determine if we are in landscape-sized mobile 
 * view or not (just basically for most common
 * targeted devices; e.g. iPhone6/6P-X/XP and
 * equivalent Android up to 2:1)
 * 
 * TODO : consider using "memoize-one" lib as consistently
 *        saving dimensions can bloat RAM
 */
const isLandscape = (function() {
    const memoizedValues = {};
    
    return (vpW, vpH)=> {
        const hashKey = `${vpW}_${vpH}`;
        if(!memoizedValues[hashKey]) {
            memoizedValues[hashKey] = (
                vpH < 430 && (vpW > (vpH * 1.33))
            );
        }

        return memoizedValues[hashKey];
    }
})();

export default isLandscape