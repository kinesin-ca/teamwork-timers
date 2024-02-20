/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action("ca.kinesin.teamwork-timers.toggle");
let activeContext = null;
let activeProject = null;

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    console.log("Stream Deck connected! at port", port);
  },
);

function getProjectTimer(apiKey, subDomain, projectId) {
  return fetch(
    `https://${subDomain}.teamwork.com/projects/api/v3/me/timers.json?` +
      new URLSearchParams({ projectId: Number(projectId) }),
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    },
  )
    .then((resp) => resp.json())
    .then((payload) => {
      return payload.timers.map((timer) => {
        return { id: timer.id, description: timer.description };
      });
    });
}

function startTimer(apiKey, subDomain, projectId, billable) {
  return stopTimer(apiKey, subDomain, projectId).then(() => {
    fetch(`https://${subDomain}.teamwork.com/projects/api/v3/me/timers.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        timer: {
          description: "Streamdeck Button",
          isBillable: billable === "yes",
          projectId: Number(projectId),
          stopRunningTimers: true,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((payload) => {
        return;
      });
  });
}

function stopTimer(apiKey, subDomain, projectId) {
  console.log("Stopping timer for pid ", projectId, " on ", subDomain, " with key ", apiKey);
  return getProjectTimer(apiKey, subDomain, projectId).then((projectTimers) => {
    return Promise.all( projectTimers
      .map((timer) => {
        const timerID = timer.id;
        return fetch(
          `https://${subDomain}.teamwork.com/projects/api/v3/me/timers/${timerID}/complete.json`,
          {
            method: "PUT",
            headers: {
              Authorization: `Basic ${apiKey}`,
            },
          },
        );
      })
    );
  });
}

myAction.onKeyUp(({ action, context, device, event, payload }) => {
  /*
   * payload has:
   *		settings -- values to persist
   *		coordinates -- coordinates of button
   *		state -- zero-based index of current state
   */

  const b64apiKey = btoa(payload.settings.apiKey);

  const settings = payload.settings;

  var promiseChain = Promise.resolve();
  var isSelf = activeContext == context;

  // If the button is already active, stop the timer
  if (activeContext) {
    promiseChain = promiseChain.then(() => {
      stopTimer(b64apiKey, payload.settings.subDomain, activeProject);
    }).then(() => {
      $SD.setState(activeContext, 0);
      activeContext = null;
    });

    if (isSelf) {
      return promiseChain;
    }
  }
  promiseChain = promiseChain.then(() => {
  return startTimer(
    b64apiKey,
    settings.subDomain,
    settings.projectId,
    settings.billable,
  ).then(() => {
    if (activeContext) {
      $SD.setState(activeContext, 0);
    }
    $SD.setState(context, 1);
    activeContext = context;
  });
  });
});
