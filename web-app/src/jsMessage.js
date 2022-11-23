
// cmd: string, args should be object.
function onMessage(cmd, args) {
    console.log(`Received message: ${cmd} ${JSON.stringify(args)}`);

    regiesteredMethods.forEach((func) => {
        func(cmd, args);
    });

}

// a signficant line code, whichi make native all function 'onMessage' works well.
window.onMessage = onMessage;



const regiesteredMethods = [];

// put func into regiesteredMethods.
function bridgeRegister(func) {
    regiesteredMethods.push(func);
}

// remove func from regiesteredMethods.
function bridgeUnregister(func) {
    const index = regiesteredMethods.indexOf(func);
    if (index !== -1) {
        regiesteredMethods.splice(index, 1);
    }
}

window.bridgeRegister = bridgeRegister;
window.bridgeUnregister = bridgeUnregister;


// This line is important because it let you can review all web pages in web-browser.
// index.d.ts is another important part.
window.hybridge = window.hybridge || {};
