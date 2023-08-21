export default function randomise(restaurants) {
  console.log(restaurants);
  const uniqueSet = new Set(restaurants);
  const uniqueArray = Array.from(uniqueSet);
  for (let i = uniqueArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [uniqueArray[i], uniqueArray[j]] = [uniqueArray[j], uniqueArray[i]]; // Swap elements
  }
  return uniqueArray[0];
}
