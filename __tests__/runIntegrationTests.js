const colors = require('colors');
const { spawn } = require('child_process');
const path = require('path');

// need to manually flag when tests fail because of
// an error in mochajs that hasn't been addressed

let hasFailingTests = false;

const launchRegex = {
    webapp: /\s*currently running at (tcp|https?):\/\/(localhost|([0-9]+.){3}[0-9]+):[0-9]{4}/gm
};

const serversListening = {
    webapp: false
};

const cmdStrings = {
    webapp: 'node server/app.js',
    tests: 'npm run test'
};

/**
 * refs for node process handlers based on process key
 */
const processHandlers = {
    webapp: undefined,
    tests: undefined
};

let areTestsRunning = false;

function spawnProcess({ processKey, onServerEvent }) {
    if(processKey == 'tests' && !areTestsRunning) {
        areTestsRunning = true;
    }

    const cmd = cmdStrings[processKey];

    const processHandler = spawn(cmd, { shell: true, cwd: path.resolve('./') });
    processHandlers[processKey] = processHandler;

    processHandler.stdout.on('data', m => {
        const message = m.toString().replace(/\u001b\[.*?m/g, '');
        console.log(`${`[${processKey}]`.bold.yellow}: ${m}`);

        switch (processKey) {
            case 'webapp': {
                if(!serversListening[processKey] && launchRegex[processKey].test(message)) {
                    onServerEvent({ serverType: processKey, event: 'server-start' });
                }
                break;
            }
            case 'tests':
                hasFailingTests = hasFailingTests || (
                    /[1-9]([0-9]?)+ failing/gm.test(message) ||
                    /ERR!/gm.test(message)
                );
                break;
            default:
                break;
        }
    });

    processHandler.stderr.on('data', m => {
        const message = m.toString().replace(/\u001b\[.*?m/g, '');

        // check if any of the tests reported as failing
        hasFailingTests = hasFailingTests || (
            /[1-9]([0-9]?)+ failing/g.test(message) ||
            /ERR!/g.test(message)
        );

        console.log(`${processKey.yellow.bold} ${'error'.red} -> ${message}`);
    });

    processHandler.stdout.on('close', exitCode => {
        Object.entries(processHandlers).forEach(([key, handler]) => {
            if(serversListening[key]) {
                handler.stdin.pause();
                serversListening[key] = false;
            }
            handler.kill();
        });

        if((processKey == 'tests') && !exitCode && !hasFailingTests) {
            console.log('tests successful ✅, exiting...');
            process.exit(0);
        }
        else if(exitCode) {
            console.log('process error occurred');
            process.exit(1);
        }
        else {
            process.exit(1);
        }
    });

    processHandler.on('exit', (exitCode, _s) => {
        if((exitCode != 0) || hasFailingTests) {
            process.exit(1);
        }
    });
}

spawnProcess({ processKey: 'webapp', onServerEvent: ({ serverType, event }) => {
    switch (event) {
        case 'server-start': {
            console.log(`${serverType.bold.yellow} has started listening 🔛`);
            serversListening[serverType] = true;
            break;
        }
        case 'server-stop': {
            console.log(`${serverType.bold.yellow} has stopped listening 📴`);
            serversListening[serverType] = false;
            break;
        }
    }

    if(serversListening.webapp && !areTestsRunning) {
        console.log(`time to run through tests!`);
        spawnProcess({ processKey: 'tests' });
    }
} });
