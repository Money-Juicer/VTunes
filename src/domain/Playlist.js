export default class Playlist {
  constructor(name, list) {
    this.name = name;
    this.list = list;
  }

  static from(json) {
    return Object.assign(new Playlist(), json);
  }
}