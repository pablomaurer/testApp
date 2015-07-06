/***************************************************
 * PouchDB Service (pouchdb.com)
 *
 * http://pouchdb.com/adapters.html
 **************************************************/

mainModule.factory('pouchService', function ($rootScope, $q) {

    // pouch setup
    var pouchService = {};
    var localDB = null;
    var remoteDB = null;
    var sync = null;

    // loading progress
    var completedPull = null;
    var completedPush = null;

    pouchService.init = function () {
        localDB = new PouchDB('testdb', {adapter: 'websql', auto_compaction: true});
        remoteDB = new PouchDB('http://test:654321@212.120.33.34:5984/testdb/');
        console.info("------> PouchDB adapter '" + localDB.adapter + "'");
    };

    // sync
    pouchService.syncNow = function () {

        localDB.info().then(console.log.bind(console));

        // wrap infos
        remoteDB.info().then(function (remoteInfo) {
            localDB.info().then(function (localInfo) {

                // find out diff
                var update_seq_diff = remoteInfo.update_seq - localInfo.update_seq;

                // infos
                console.info('--- remoteInfo :', remoteInfo);
                console.info('--- localInfo  :', localInfo);
                console.info('--- remote update seq : ', remoteInfo.update_seq);
                console.info('--- local update seq  : ', localInfo.update_seq);
                console.info('--- update seq diff   : ', update_seq_diff);

                // start Sync progress
                sync = localDB.sync(remoteDB, {live: false}).on('change', function (info) {
                    console.log('DB change: ', info);

                    $rootScope.$apply(function () {
                        if (info.direction == 'pull') {
                            completedPull = (info.change.last_seq / update_seq_diff) * 100;
                            console.log('completed pull to remote : ', (info.change.last_seq / remoteInfo.update_seq) * 100);
                            console.log('completed pull to diff   : ', (info.change.last_seq / update_seq_diff) * 100);
                        } else {
                            completedPush = (info.change.last_seq / update_seq_diff) * 100;
                            console.log('completed push to remote : ', (info.change.last_seq / remoteInfo.update_seq) * 100);
                            console.log('completed push to diff   : ', (info.change.last_seq / update_seq_diff) * 100);
                        }
                    });
                }).on('complete', function (info) {
                    console.log('DB complete: ', info);
                    if (sync.canceled === false) {
                        $rootScope.$broadcast('databaseSyncCompleted'); // Captured in DB-singleSync.js directive
                    }
                }).on('uptodate', function (info) {
                    console.log('DB uptodate: ', info);
                }).on('error', function (info) {
                    console.log('DB error: ', info);
                });
            });
        });
    };

    // -----------------------------------
    // Cancel Sync
    // -----------------------------------
    pouchService.stopSync = function () {
        sync.cancel();
    };

    // -----------------------------------
    // Query - replace with query
    // -----------------------------------
    pouchService.query = function (view, options) {
        return $q.when(
            localDB.query(view, options)).then(function (result) {
                var betterResult = result.rows.map(function(row) {
                    return row.value;
                });
                console.info('pouchService retrieved: ', betterResult);
                return betterResult;
            }).catch(function (err) {
                console.log(err);
            });
    };

    // -----------------------------------
    // Get
    // -----------------------------------
    pouchService.get = function (id) {
        return $q.when(localDB.get(id)).then(function (doc) {
            console.info('pouchService loaded: ', doc);
            return doc;
        }).catch(function (err) {
            console.log(err);
        });
    };

    return pouchService;
});