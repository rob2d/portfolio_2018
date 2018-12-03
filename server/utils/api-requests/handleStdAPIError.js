
function handleStdAPIError ({ error, reject }) {
    console.error(error);
    let message = 'An unknown error occurred while ' + 
                'processing your request. Please try ' +
                'again.';
                
    reject({ error : message });
}