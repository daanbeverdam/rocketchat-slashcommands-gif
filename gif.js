/*
* Gif is a named function that will replace /gif commands
* @param {Object} message - The message object
*/

function Gif(command, params, item) {
	if (command === 'gif') {
		const request = require("request");
		const boundCallback = Meteor.bindEnvironment((callback) => { callback(); });
		const msg = item;
		baseUrl = "https://api.giphy.com/v1/gifs/random";
		urlParameters = {
			api_key: process.env.GIPHY_TOKEN,
			tag: `${params}`,
			rating: 'G',
		}
		request({ url: baseUrl, qs: urlParameters }, function (err, response, body) {
			boundCallback(() => {
				if (err) {
					console.log(err);
					msg.msg = `Sorry, something went wrong. Contact your administrator.`;
					Meteor.call('sendMessage', msg);
				} else {
					jsonResponse = JSON.parse(body);
					if (jsonResponse['data']['images']) {
						msg.msg = `*${params}*\n` + jsonResponse['data']['images']['original']['url'];
						Meteor.call('sendMessage', msg);
					} else {
						RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {
							_id: Random.id(),
							rid: item.rid,
							ts: new Date,
							msg: `Sorry, couldn't find GIFs for *${params}*.`
						})
					}
				}
			});
		});
	}
}

RocketChat.slashCommands.add('gif', Gif, {
	description: 'Returns Giphy GIFs on command.',
	params: 'search query'
});
