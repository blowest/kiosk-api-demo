#!/bin/bash

docker compose up -d mysql

docker compose up -d api_server

exit 0
