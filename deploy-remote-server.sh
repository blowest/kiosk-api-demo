#!/bin/bash

ssh kiosk@"$KIOSK_SERVER_IP" "cd ./src/kiosk && \
    sh stop-local-server.sh && \
    git pull && \
    sh start-local-server.sh"

exit 0