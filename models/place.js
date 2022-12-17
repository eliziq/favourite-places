class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; //{lat:0.173137, lng: 2.37837}
    this.id = new Date().toString() + Math.random().toString();
  }
}
