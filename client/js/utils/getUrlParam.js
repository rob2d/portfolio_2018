// NOTE : this solution was adapted from
// https://www.kevinleary.net/javascript-get-url-parameters/

export default function getUrlParam(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1));
    const sURLVariables = sPageURL.split('&');
    let sParameterName;
    let i;

    for(i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if(sParameterName[0] === sParam) {
            return (sParameterName[1] === undefined) ?
                true : sParameterName[1];
        }
    }
}
