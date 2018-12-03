/**
 * toSnakeCase('userId') => "user_id"
 * toSnakeCase('waitAMoment') => "wait_a_moment"
 * toSnakeCase('TurboPascal') => "turbo_pascal"
 */
function toSnakeCase (str) {
    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + '_' + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + '_' + '$2')
        .toLowerCase();
}

/**
 * toSnakeCase('userId') => "user_id"
 * toSnakeCase('waitAMoment') => "WAIT_A_MOMENT"
 * toSnakeCase('TurboPascal') => "TURBO_PASCALE"
 */
function toUpperSnakeCase (str) {
    return toSnakeCase(str).toUpperCase();
}

/**
 * toCamelCase('user_id') => "userId"
 * toCamelCase('wait_a_moment') => "waitAMoment"
 * toCamelCase('turbo_pascal') => "turboPascal"
 */
function toCamelCase (str) {
    let returnValue = str.toLowerCase()
        .replace(/(_+[a-z])/g, 
            m =>(`${m.toUpperCase()}`)).replace(/_/g, '');

    // fix cases where first character is _
    // (mainly for MySQL tables)
    if(str.charAt(0) == '_') {
        returnValue = '_' + returnValue.charAt(0).toLowerCase() + returnValue.substr(1);
    }    

    return returnValue;
}

module.exports = { 
    toCamelCase, 
    toSnakeCase, 
    toUpperSnakeCase 
};