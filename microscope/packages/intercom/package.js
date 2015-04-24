Package.describe({
    name: 'intercom',
    summary: "Intercom package",
    version: '1.0.0'
});
//on_use and onUse is the same method
Package.on_use(function (api) {
    api.versionsFrom('0.9.4');
    api.addFiles('intercom_loader.js', 'client'); //addFiles and add_files is hte same thing
    api.add_files('intercom_server.js', 'server');
    api.export('IntercomHash', 'server');
});