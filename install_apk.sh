#!/bin/sh
#########################################################
# A shell script is used to build & install apk within one-key.
# Before running it, you must ensure robot is connected by adb.
#
#########################################################
set -e
sleep 3
echo "###############################################################"
# before building, you must ensure node and java are installed.
java -version
node -v

echo "###############################################################"
# first step: clean and build node.
cd web-app/
### clean cache if you need.
#rm -rf node_modules
#rm package-lock.json
#npm cache clean --force
npm install
#npm run test -- --silent=false # run test first to avoid build error.
npm run build
cd ..
# last step: build gradle for exporting apk.

./gradlew clean

./gradlew :app:installDebug
adb shell am start -n io.github.brucewind/.FullscreenActivity