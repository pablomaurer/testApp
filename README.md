# Sample App to reproduce PouchDB/SQLite crash
This is a Sample App to reproduce a crash on IOS with [PouchDB](http://pouchdb.com/) and [SQLite Adapter](https://github.com/litehelpers/Cordova-sqlite-storage) on IOS. Everything is prepared even a sample database.

## Problem
When indexing a large Database it uses more and more memory until the App crashes...<br>
[Stackoverflow](http://stackoverflow.com/questions/31053946/pouchdb-sqlite-indexing-crashes-needs-to-much-memory-on-ios)<br>
[Cordova SQLite](https://github.com/litehelpers/Cordova-sqlite-storage)

## Solution
Maybe you will be the one, who can provide a solution? :P

## Getting started
1. ionic lib update -> so you it will download the newest ionic stuff it needs to run
2. ionic platform add ios -> will add ios platform stuff
3. cordova plugin add cordova-sqlite-storage -> to add the "Cordova SQLite Plugin"
4. ionic build ios -> will build ios stuff

## Prepare for debugging on IOS
1. In IOS go to Settings -> Safari -> Advanced -> Turn on "Web Inspector"
2. IN OSX go to Safrai -> Preferences -> Advanced -> Turn on "Show Develop menu in menu bar"
3. Open XCode project file under "testApp/platforms/ios/testApp.xcodeproj" 
4. Choose in the topBar near of the run Button not "Iphone 6" but your connected IPad or Iphone
5. click run (be shure to create a debug build, else you will not be able to debug it)
6. In Safari click "Develop -> your Device -> index.html", then you will see console outputs in Safari
7. And you can watch how it will use more and more Memory in XCode
8. If you're a crack you can open Instruments and watch more stuff that i really don't understand =)

## Reproduce
1. Swipe to open the Menu -> Go to Settings -> Click the Button "Init Database"
2. Click the Button "Start Sync"
3. Once it's done click in the Menu on Customers, then the indexing process of PouchDB should beginn and here it will crash.

## My Stats SYNCING on IPad Air 2
- Sync Progress 21% = 180 mb RAM
- Sync Progress 30% = 214 mb RAM
- Sync Progress 40% = 263 mb RAM
- Sync Progress 50% = 325 mb RAM
- Sync Progress 60% = 364 mb RAM
- Sync Progress 70% = 404 mb RAM
- Sync Progress 80% = 448 mb RAM
- Sync Progress 90% = 520 mb RAM
- Sync Progress 99% = 575 mb RAM

## My Stats INDEXING on IPad Air 2
Starting with 573 mb RAM
while indexing moving around 685 - 700 mb RAM
in the last seconds before it crashes it wend rapidly up to 850mb
