# repurpOS

## Project setup

```
npm install
```

## For easy dev with a GUI:

1. [Install Vue UI](https://cli.vuejs.org/guide/installation.html)
2. Run `vue ui`
3. Go to tasks > electron:serve
4. Run task
5. This will hot reload any time you make changes to the code
6. **Done**

### Customisation

Settings for GUI are in controller/GUI.js
Settings for machine are in controller/machine.js

# ROADMAP

- Obeying limits set in machine.js
- Stopping at required points in profile
- Sending temperature data
- Saving and loading profiles
- Shortcuts menu
- Bottom bar status
- Settings menu
- Testing and implementing modularity to new machine
- Dynamic load of configuration files (machine.js, etc.)
- Software update system
- Arduino update system
- Loading screen
- Manual overrides

### OLD:

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
