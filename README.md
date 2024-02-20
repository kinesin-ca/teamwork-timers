# Streamdeck Teamwork Timer Toggle

## Development

```
ln -s $(pwd)/src/ca.kinesin.teamwork-timers.sdPlugin ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins
defaults write com.elgato.StreamDeck html_remote_debugging_enabled -bool YES
```

# Debug tools

[Debug Tools](http://localhost:23654/)

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
  - **API Key**: Get your API key by going to `Edit Profile`, then the `API Keys` tab, and enabling. See [this guide](https://support.teamwork.com/desk/profile-settings/generating-an-api-key) for help if you need more help.
  - **Subdomain**: This is the first part of your Teamwork URL (e.g. the `COMPANY` of `COMPANY.teamwork.com`)
  - **Description**: This is what will appear as the line item of the timer
  - **Billable?**: Click this if the timer should be billable
  - **ProjectID**: The numeric ID of the project to track. (e.g. the `1234567` in `https://COMPANY.teamwork.com/app/projects/1234567/time`)
  - **TaskID**: Optional task ID
