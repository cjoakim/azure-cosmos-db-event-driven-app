# Script to build the Docker image.
#
# Chris Joakim, Microsoft, 2023

tsc 

echo 'docker build...'
docker build -t cjoakim/azure-cosmos-db-cf-ts-func .

echo 'docker ls image...'
docker image ls cjoakim/azure-cosmos-db-cf-ts-func:latest

echo 'next: docker push cjoakim/azure-cosmos-db-cf-ts-func:latest'
