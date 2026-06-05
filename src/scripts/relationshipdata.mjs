function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}


async function getExternalEmergencyAdvice() {
  const url = "https://api.adviceslip.com/advice";
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API request failed");
    
    const data = await response.json();
    console.table("Raw Third-Party Data:", data);

    // 🔄 MAP THE DATA: Translate their fields into your project's custom fields!
  

  } catch (error) {
    console.error("Error pulling third-party advice:", error);
    
    // Fallback content so your site doesn't crash if the external API drops offline
  }
}

getExternalEmergencyAdvice();

export default class relationshipdata {
  constructor(category) {
    this.category = category;
    this.path = `../public/json/${this.category}.json`;
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
