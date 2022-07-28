export default class Profile {
  constructor({
    name = "Default Profile",
    description = "",
    datetime = "",
    points = []
  }) {
    this.name = name;
    this.description = description;
    this.datetime = datetime;
    this.points = points;
  }
}
