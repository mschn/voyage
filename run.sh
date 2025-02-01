#!/bin/bash

docker run -d --rm \
    --name voyage \
    -p 3003:3003 \
    -v /Users/mschnoor/:/files \
    -e VOYAGE_ROOT=/files \
    mschnr/voyage
