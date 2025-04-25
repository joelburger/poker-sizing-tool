#!/bin/bash -e

version=$1

if [ -z "$version" ]; then
    echo "Error: Version argument is required."
    echo "Usage: ./deploy.sh <version>"
    exit 1
fi

gcloud auth application-default login

echo "Deployment started for project version: $version"

echo "Building project"

echo "$version" > static/version.txt

docker build -t poker-sizing-tool:$version .

docker tag poker-sizing-tool:$version asia.gcr.io/skunkworks-268706/poker-sizing-tool:$version

docker push asia.gcr.io/skunkworks-268706/poker-sizing-tool:$version

