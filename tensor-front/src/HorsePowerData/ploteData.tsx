//@ts-ignore
const { tfvis } = window;

export function ploteData(data: any[], model: any) {
  const values = data.map((d: any) => ({
    x: d.horsepower,
    y: d.mpg,
  }));

  tfvis.render.scatterplot(
    { name: 'Horsepower v MPG' },
    { values },
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300,
    },
  );
  tfvis.show.modelSummary({ name: 'Model Summary' }, model);
}
