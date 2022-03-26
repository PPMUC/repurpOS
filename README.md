# repurpOS

## Project setup

```
npm install
```

note: you need to install node js to have npm on your computer

## For easy dev with a GUI:

1. [Install Vue UI](https://cli.vuejs.org/guide/installation.html)
2. Run `vue ui`
3. Go to tasks > electron:serve
4. Run task
5. This will hot reload any time you make changes to the code
6. **Done**

### Plans

The idea for this system is that one codebase is used on all machines.
Machine specific configs are achieved through the following:

- Settings for GUI are in controller/GUI.js
- Some settings for machine are in controller/machine_info.js
- Others are in controller/index.js
- Settings for machine comms are in controller/machine_comms.js

These files come from the platform configuration repository

# ROADMAP

- ~~Obeying limits set in machine_info.js~~
- ~~Linear Extrapolation~~

- Stopping at required points in profile
- Sending temperature data
- Saving and loading profiles
- Shortcuts menu - user editable
- Bottom bar status - add info from platform file
- Settings menu
- Testing and implementing modularity to new machine
- CI of multiple installers
- Communication with arduino
- Software update system
- Arduino update system
- Loading screen/start menu
- Manual overrides
- Switch serialport to IPC instead of electron remote
- Limit switches visualisation

# Creating a new platform

There are 3 main types of sensors/outputs.

- Temperature controllers
  These have a temperature setpoint as well as a thermometer for current temp
- Misc Required Sensor
  This is a sensor not controlled by repurpOS but that is required for operation and included in the profile
  eg. a hand cranked bottle jack with a pressure sensor
- Misc Optional Sensor
  This is a sensor that is only read and displayed, repurpOS has no control over it.

# OLD:

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
