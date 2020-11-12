#!/bin/bash
node server/app.js & export SERVER_PID=$! && mocha ./__tests__/**/*.spec.js --timeout=100000 --bail