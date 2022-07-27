export default class Shortcut {
  constructor(title = "Shortcut", icon = "bookmark", action = "/", shell = "") {
    this.action = action;
    this.shell = shell;
    this.icon = icon;
    this.title = title;
  }
}
