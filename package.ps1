electron-packager ./ cycletrainer --platform=win32 --arch=x64 --ignore=/client --ignore=/support --overwrite
cp /client/build/ /cycletrainer-win32-x64/resources/app/
cp /support/ /cycletrainer-win32-x64/