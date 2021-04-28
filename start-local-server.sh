#!/bin/bash

sudo docker-compose up -d mysql && sudo docker-compose up -d --build api_server

exit 0
