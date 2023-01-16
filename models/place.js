export class Place {
  constructor(title, description, imageUri, location, id) {
    this.title = title;
    this.description = description;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; //{lat:0.173137, lng: 2.37837}
    this.id = id
  }
}
