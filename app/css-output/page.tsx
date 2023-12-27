import * as stylex from '@stylexjs/stylex';
import fs from 'fs/promises';
import path from 'path';
import { Code } from 'bright';
import * as prettier from 'prettier';

export default async function CSSOutput() {
  const cssPathDev = path.join(
    process.cwd(),
    '.next/static/css/app/layout.css'
  );
  let cssText = await fs.readFile(cssPathDev, 'utf-8');
  cssText = await prettier.format(cssText, { parser: 'css' });

  let endOfFirstComment = cssText.indexOf('*/');
  cssText = cssText.slice(endOfFirstComment + 3);

  return (
    <>
      <h1 {...stylex.props(styles.h1)}>StyleX CSS Output</h1>
      <p {...stylex.props(styles.p)}>
        The default configuration is used to generate this output. In your own
        project, you can use CSS Layers instead of the selector-based polyfill
        used here.
      </p>
      <Code lang="css" style={{ width: '100%' }}>
        {cssText}
      </Code>
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
    marginBlock: 16,
    lineHeight: 1.4,
  },
});
