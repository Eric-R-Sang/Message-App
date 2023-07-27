export class Profile {
  constructor({ id, name, surname, imageUrl }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.imageUrl = imageUrl;
  }

  toJson() {
    return {
      name: this.name,
      surname: this.surname,
      imageUrl: this.imageUrl,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new Profile({
      id: doc.id,
      name: data.name,
      surname: data.surname,
      imageUrl: data.imageUrl,
    });
  }
}
