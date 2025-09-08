// Add Activity Definitions here.


// Get the IP address
export async function getIP(): Promise<string> {
  const url = 'https://icanhazip.com';
  const response = await fetch(url);
  const data = await response.text();
  return data.trim();
}

// Use the IP address to get the location.
export async function getLocationInfo(ip: string): Promise<string> {
  const url = `http://ip-api.com/json/${ip}`;
  const response = await fetch(url);
  const data:any = await response.json();
  console.log(data);
  //return `${data.city}, ${data.regionName}, ${data.country}, ${data.lat}, ${data.lon}`;
  return data;
}


//Use the lat and long to get weather forecast for the location from the weather API  
export async function getWeatherForecast(lat: string, long: string): Promise<any> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,rain,showers,apparent_temperature,wind_speed_10m,precipitation&forecast_days=1&temperature_unit=fahrenheit`;
  const response = await fetch(url);
  const data:any = await response.json();
  //console.log(data);
  return data.current;
}