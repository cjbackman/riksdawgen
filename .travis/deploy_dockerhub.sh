#!/bin/sh
docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
if [ "$TRAVIS_BRANCH" = "master" ]; then
    TAG="latest"
else
    TAG="$TRAVIS_BRANCH"
fi
cd api && docker build -f Dockerfile -t ${TRAVIS_REPO_SLUG}_api:$TAG .
docker push ${TRAVIS_REPO_SLUG}_api
cd ../front && docker build -f Dockerfile -t ${TRAVIS_REPO_SLUG}_web:$TAG .
docker push ${TRAVIS_REPO_SLUG}_web

