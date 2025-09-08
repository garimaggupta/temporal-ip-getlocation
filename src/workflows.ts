import * as workflow from '@temporalio/workflow';

// Only import the activity types
import type * as activities from './activities';

// Load Activities and assign the Retry Policy
const { getIP, getLocationInfo, getWeatherForecast} = workflow.proxyActivities<typeof activities>({
  retry: {
    initialInterval: '1 second', // amount of time that must elapse before the first retry occurs.
    maximumInterval: '1 minute', // maximum interval between retries.
    backoffCoefficient: 2, // how much the retry interval increases.
    // maximumAttempts: 5, // maximum number of execution attempts. Unspecified means unlimited retries.
  },
  startToCloseTimeout: '1 minute', // maximum time allowed for a single Activity Task Execution.
});


// The Temporal Workflow.
// Just a TypeScript function.
export async function getAddressFromIP(name: string): Promise<string> {

    const ip = await getIP();

    const location:any = await getLocationInfo(ip);

    //const weatherinfo = await getWeatherForecast(location.lat, location.lon);

    return `Hello, ${name}. 
    Your IP is ${ip} AND 
    your location is ${location.city}, ${location.regionName}, ${location.country}`

    // return `Hello, ${name}. 
    // Your IP is ${ip} AND 
    // your location is ${location.city}, ${location.regionName}, ${location.country} AND 
    // current temperature is ${weatherinfo.temperature_2m} degrees Fahrenheit
    // current precipitation is ${weatherinfo.precipitation} inches
    // current wind speed is ${weatherinfo.wind_speed_10m} mph
    // current apparent temperature is ${weatherinfo.apparent_temperature} degrees Fahrenheit
    // current rain is ${weatherinfo.rain} inches
    // current showers are ${weatherinfo.showers} inches`;


}