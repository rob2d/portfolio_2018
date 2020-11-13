#!/bin/bash
mkdir -p ./logs
touch ./logs/server_output.txt
nohup ./scripts/run-server.sh > ./logs/server_output.txt &
tail -F ./logs/server_output.txt 2>&1 | while read -r line; do
  echo $line
  if echo $line | grep -q 'currently running at'; then
    npm run test
  fi
done