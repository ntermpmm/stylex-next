import * as stylex from '@stylexjs/stylex';
import fs from 'fs/promises';
import path from 'path';
import { Code } from 'bright';
import * as prettier from 'prettier';
import * as Babel from '@babel/standalone';
import ts from '@babel/plugin-syntax-typescript';
import jsx from '@babel/plugin-syntax-jsx';
import flow from '@babel/plugin-syntax-flow';
import stylexBabelPlugin from '@stylexjs/babel-plugin';

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

Babel.registerPlugin('jsx', jsx);
Babel.registerPlugin('ts', ts);
Babel.registerPlugin('flow', flow);
Babel.registerPlugin('stylex', stylexBabelPlugin);

export default async function JSOutput({ searchParams }: Props) {
  const filepath = searchParams.filepath;
  if (
    !filepath ||
    (!filepath.endsWith('ts') &&
      !filepath.endsWith('tsx') &&
      !filepath.endsWith('js') &&
      !filepath.endsWith('jsx'))
  ) {
    return (
      <>
        <h1 {...stylex.props(styles.h1)}>No File Provided</h1>
      </>
    );
  }
  const sourcePathDev = path.join(process.cwd(), 'app', filepath);
  const sourceJs = await fs.readFile(sourcePathDev, 'utf-8');

  const isTS = sourcePathDev.endsWith('ts') || sourcePathDev.endsWith('tsx');

  let { code } = Babel.transform(sourceJs, {
    filename: sourcePathDev,
    parserOpts: {
      plugins: ['jsx', jsx],
      jsx: true,
    },
    plugins: [
      'jsx',
      isTS ? ['ts', { isTSX: true }] : 'flow',
      [
        'stylex',
        {
          filename: sourcePathDev,
          fileName: sourcePathDev,
          styleResolution: 'application-order',
          unstable_moduleResolution: {
            type: 'commonJS',
            rootDir: process.cwd(),
          },
          stylexSheetName: '<>',
          genConditionalClasses: true,
        },
      ],
    ],
  });

  code = await prettier.format(code, {
    parser: isTS ? 'babel-ts' : 'babel-flow',
  });

  return (
    <>
      <h1 {...stylex.props(styles.h1)}>File Output</h1>
      <p {...stylex.props(styles.p)}>{filepath}</p>
      <Code lang="js" style={{ width: '100%' }}>
        {code}
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
    marginBlock: 8,
    lineHeight: 1.4,
    color: '#4dabf7',
  },
});
