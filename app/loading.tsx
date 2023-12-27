import * as stylex from '@stylexjs/stylex';

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

export default async function JSLoading() {
  return (
    <>
      <h1 {...stylex.props(styles.h1)}>File Output</h1>
      <p {...stylex.props(styles.p)}>Loading...</p>
    </>
  );
}

const styles = stylex.create({
  h1: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: '2rem',
  },
  p: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
    marginBlock: 8,
    lineHeight: 1.4,
  },
});
