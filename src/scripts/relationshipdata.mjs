function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}




export default class relationshipdata {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const list = await this.getData();

    // ✅ FIX: Force both values to numbers so JavaScript can match them perfectly!
    return list.find((item) => Number(item.id) === Number(id));
  }
}
