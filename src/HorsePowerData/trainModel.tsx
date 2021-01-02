//@ts-ignore
const { tf, tfvis } = window;

export async function trainModel(model: any, inputs: any, labels: any) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });

  const batchSize = 32;
  const epochs = 50;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks({ name: 'Training Performance' }, ['loss', 'mse'], {
      height: 200,
      callbacks: ['onEpochEnd'],
    }),
  });
}
