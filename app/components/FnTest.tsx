import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    fontSize: 24,
  },
});

const vars = [
  [16, 14],
  [20, 16],
  [24, 18],
];

const styleObjects = vars.map((tuple) => ({
  root: {
    background: 'pink',
    borderRadius: 99999,
    paddingHorizontal: tuple[0],
    fontSize: tuple[1],
    paddingVertical: 8,
  },
  start: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    paddingStart: tuple[0] * 0.75,
  },
  end: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    paddingEnd: tuple[0] * 0.75,
  },
}));

const smallStyles = stylex.create({ ...styleObjects[0] });
const mediumStyles = stylex.create({ ...styleObjects[1] });
const largeStyles = stylex.create({ ...styleObjects[2] });

const styleGroups = {
  small: smallStyles,
  medium: mediumStyles,
  large: largeStyles,
};

function Button({
  size,
  cap,
}: {
  size: 'small' | 'medium' | 'large';
  cap?: 'start' | 'end';
}) {
  const styles = styleGroups[size];
  const capStyles = cap && styles[cap];
  return <button {...stylex.props(styles.root, capStyles)}>Hello</button>;
}

function Demo() {
  return (
    <div {...stylex.props(styles.root)}>
      <div>
        <Button size="small" />
      </div>
      <div>
        <Button size="small" cap="end" />
        <Button size="small" cap="start" />
      </div>
      <div>
        <Button size="medium" cap="end" />
        <Button size="medium" cap="start" />
      </div>
      <div>
        <Button size="large" cap="end" />
        <Button size="large" cap="start" />
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, $('main'));
