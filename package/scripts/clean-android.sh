#!/bin/bash

cd "$(dirname "$0")"
cd ../../
echo "Running clean script in $PWD"

cd example/android
echo "./gradlew clean"
./gradlew clean

echo "cd ../../"
echo "rm -rf node_modules"
rm -rf node_modules
echo "rm -rf yarn.lock"
rm -rf yarn.lock

cd example

echo "rm -rf android/.cxx"
rm -rf android/.cxx
echo "rm -rf android/.gradle"
rm -rf android/.gradle
echo "rm -rf android/build"
rm -rf android/build

cd ../

echo "yarn in $PWD"
yarn install
