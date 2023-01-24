export default class Setting {
  constructor({
    name = "Setting",
    description = "",
    icon = "",
    value = "",
    isButton = false,
    buttonAction = "",
    isDropDown = false,
    dropDownList = []
  }) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.value = value;
    this.isButton = isButton;
    this.buttonAction = buttonAction;
    this.isDropDown = isDropDown;
    this.dropDownList = dropDownList;

  }
}
