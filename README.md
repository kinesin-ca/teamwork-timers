# Streamdeck Teamwork Timer Toggle

## Installation (MacOS)

```sh
cd ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins
git clone https://github.com/kinesin-ca/teamwork-timers ca.kinesin.teamwork-timers.sdPlugin
cd ca.kinesin.teamwork-timers.sdPlugin
git submodule update

# Restart your Elgato App
# Add a button
```

## Adding a Button

1. Drag the "Teamwork Timer" button to your grid
2. Replace the icon
3. Fields
  - **Subdomain**: This is the first part of your Teamwork URL (e.g. the `COMPANY` of `COMPANY.teamwork.com`)
  - **Description**: This is what will appear as the line item of the timer
  - **Billable?**: Click this if the timer should be billable
  - **ProjectID**: The numeric ID of the project to track. (e.g. the `1234567` in `https://COMPANY.teamwork.com/app/projects/1234567/time`)
  - **TaskID**: Optional task ID
