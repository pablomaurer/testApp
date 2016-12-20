/***************************************************
 * PouchDB Service (pouchdb.com)
 **************************************************/

mainModule.factory('pouchService', function () {

    var pouchService = {};

    var localDB;
    var remoteDB;
    var sync;

    pouchService.init = function () {
        localDB = new PouchDB('testdb', {adapter: 'cordova-sqlite', auto_compaction: true});
        remoteDB = new PouchDB('http://212.120.33.34:5984/testdb');

        remoteDB.info().then(function (info) {
            console.log('remote info', info);
        });
        localDB.info().then(function (info) {
            console.log('local info', info);
        })
    };

    pouchService.syncNow = function () {
        console.log('sync');
        sync = localDB.sync(remoteDB).on('change', function (change) {
            console.log('change', change);
        }).on('paused', function (err) {
            console.log('paused', err);
        }).on('active', function () {
            console.log('active');
        }).on('denied', function (err) {
            console.log('denied', err);
        }).on('complete', function (info) {
            console.log('complete', info);
        }).on('error', function (err) {
            console.log('error', err);
        });
    };

    pouchService.stopSync = function () {
        console.log('cancel');
        sync.cancel();
    };

    return pouchService;
});