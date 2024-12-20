export default function calculateDistanceInTime(distance) {
  // Define the average speed of a rider in km/h
  const averageSpeed = 40; // Example speed: 40 km/h

  // Calculate time in hours
  const timeInHours = distance / averageSpeed;

  // Convert time to hours and minutes
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);

  // Return a string representation of the time
  return `${hours} hour(s) and ${minutes} minute(s)`;
}
