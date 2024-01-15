/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action('ca.kinesin.teamwork-timers.toggle');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	/*
	 * payload has:
	 *		settings -- values to persist
	 *		coordinates -- coordinates of button
	 *		state -- zero-based index of current state
	*/

	const b64apiKey = btoa(payload.settings.apiKey);

	fetch(`https://${payload.settings.subDomain}.teamwork.com/projects/api/v3/me/timers.json`,
		{
			method: "POST",
			headers: {
				Authorization: `Basic ${b64apiKey}`
			},
			body: JSON.stringify({
				timer: {
				description: "Streamdeck Button",
				isBillable: payload.settings.billable === "yes",
				projectId: Number(payload.settings.projectId),
				stopRunningTimers: true,
			}})
		}
	).then((resp) => resp.json())
	.then((payload) => {
			console.log(payload);
	});
});
