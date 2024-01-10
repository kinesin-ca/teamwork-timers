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
	console.log('Your key code goes here!');
	/*
	 * payload has:
	 *		settings -- values to persist
	 *		coordinates -- coordinates of button
	 *		state -- zero-based index of current state
	*/
	console.log(payload.coordinates);
	console.log(payload.settings);

	fetch(`https://api.teamwork.com/api/projects/api/v3/me/timers.json`,
		headers = {
			"Authorization": `Bearer ${payload.settings.apiKey}`
		},
		body = {
			description: "Streamdeck",
			// isBillable: 
			projectId: payload.settings.projectId,

		}
	).then((resp) => {
			console.log(resp);
	});


	// /projects/api/v3/me/timers.json
	/*
	* Request contains information of a timer to be created or updated.
  * timer Timer Timer contains all the information returned from a timer.
  *     description string
  *     isBillable	boolean
  *     isRunning		boolean
  *     projectId		integer
  *     seconds			integer -- only valid for POST requests
  *     stopRunningTimers boolean
  *     taskId      integer
	*/

});
