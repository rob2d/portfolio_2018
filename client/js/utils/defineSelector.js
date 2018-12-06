import { createSelector } from 'reselect'

/**
  *  shorthand wrapper for creating a memoized
  *  selector of selector function + 1 returned argument  
  *  (90+% of cases use only single arguments for
  *  generated values)
  */
function defineSelector (selectorFn) {
    return createSelector(
        [ selectorFn ],
        returnValue => returnValue
    );
}

export default defineSelector