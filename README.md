# Sample App to reproduce PouchDB/SQLite crash
This is a Sample App to reproduce a crash on IOS with [PouchDB](http://pouchdb.com/)

## Problem
syncing big database causes crash on ios

## Getting started
I tried to make it work like `git clone path-to-repo && npm install && cordova run ios` but maybe you also have to add `cordova build`
- npm i cordova
- npm i ionic
- ionic platform add ios
- ionic build ios

## Reproduce
- Swipe to open the Menu -> Go to Settings -> Click the Button "Init Database"
- Click the Button "Start Sync"
- watch it crash (only if db and documents are big enough, and ios device with less than 2gb ram, best is to test it with a 500mb ram device. Even if it will not crash you will see memory grow, better watch in instruments than in Xcode, in Instruments the used RAM Value is higher!)

## dependecies
WATCHOUT: if you change a package run `gulp libs` to recreate the `libs.js` you may also have to adjust the paths in the `gulpfile`!

contains:
- ionic
- pouchdb 6.0.7
- pouchdb-adapter-cordova-sqlite