//@ts-ignore
const { tf } = window;

export async function getData() {
  const carsDataResponse = await fetch(
    'https://storage.googleapis.com/tfjs-tutorials/carsData.json',
  );
  const carsData = await carsDataResponse.json();
  //   console.log('carsData = ', carsData);
  const cleaned = carsData
    .map((car: any) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car: any) => car.mpg != null && car.horsepower != null);
  //   console.log('carsData cleaned = ', cleaned);

  // Step 1. Shuffle the data
  tf.util.shuffle(cleaned);

  return cleaned;
}
