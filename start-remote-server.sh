#!/bin/bash

ssh kiosk@14.5.208.178 "cd ./src/kiosk && sh stop-local-server.sh && git pull && sh start-local-server.sh"
