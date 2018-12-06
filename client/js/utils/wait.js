function wait(time) {
    return new Promise((resolve,reject)=> {
        setTimeout(()=>resolve(), time);
    });
};

export default wait