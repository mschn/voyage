#!/bin/bash

TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
printf $TAG > version.txt

docker build . \
    -t mschnr/voyage:${TAG} \
    -t mschnr/voyage:latest \
    --force-rm
