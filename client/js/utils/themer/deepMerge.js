/* eslint-disable no-use-before-define */
export default function deepMerge(s1, s2, d = {}) {
    merge(s1, d);
    merge(s2, d);

    return d;
}

/**
 * recursively merges new object properties
 * into a new set of objects/references
 *
 * @param {Object} s source object
 * @param {Object} d destination object
 */
function merge(s, d = {}) {
    if(typeof s === 'undefined') { return d }

    for(const key of Object.keys(s)) {
        switch (typeof s[key]) {
            case 'object': {
                d[key] = { ...deepMerge(d[key], s[key]) };
                break;
            }

            case 'number':
            case 'string': {
                d[key] = s[key];
                break;
            }
            case 'undefined':
            default: {
                d[key] = deepMerge(s[key], {});
                break;
            }
        }
    }

    return d;
}
