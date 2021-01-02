//@ts-ignore
const { tf } = window;

export function createModel() {
  // Create a sequential model
  const model = tf.sequential();

  // Add a single input layer
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
  model.add(tf.layers.dense({ units: 50, activation: 'sigmoid' }));

  // Add an output layer
  model.add(tf.layers.dense({ units: 1, useBias: true }));

  return model;
}
