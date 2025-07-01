#!/bin/sh
# start.sh

firebase emulators:start &
# Wait for Firestore emulator to be ready
until nc -z localhost 5003; do
  sleep 5
done
npm run seedDB
# Wait for background jobs for clean shutdown
wait