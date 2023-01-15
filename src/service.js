export default class CurrencyService {
  static async getRates(country, amount) {
    try {
      const response =  await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD?q=${country}`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.result} ${response["error-type"]}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    } catch(error) {
      return error;
    }
  }
}
 
