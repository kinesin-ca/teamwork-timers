/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action('ca.kinesin.teamwork-timers.toggle');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
	// console.log('Getting Settings');
	// $SD.getSettings(context);
	// console.log('Done Getting Settings');
});

$SD.onDidReceiveGlobalSettings(({ context, payload }) => {
	console.log('Got GLOBAL settings for coords ', payload.coordinates);
});

myAction.onDidReceiveSettings(({ action, event, context, device, payload }) => {
	console.log('Got settings for coords ', payload.coordinates);
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	console.log('Your key code goes here!');
	/*
	 * payload has:
	 *		settings -- values to persist
	 *		coordinates -- coordinates of button
	 *		state -- zero-based index of current state
	*/
});

myAction.onDialRotate(({ action, context, device, event, payload }) => {
	console.log('Your dial code goes here!');
});
