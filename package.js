Package.describe({
	name: 'daanbeverdam:slashcommands-gif',
	version: '0.0.1',
	summary: 'Returns Giphy GIFs on command.',
	git: ''
});

Package.onUse(function(api) {
	api.use([
		'rocketchat:lib'
	]);

	api.use('ecmascript');

	api.addFiles('gif.js', ['server', 'client']);
});
