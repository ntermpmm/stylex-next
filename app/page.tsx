import * as stylex from '@stylexjs/stylex';
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

const MEDIA_MOBILE = '@media (max-width: 700px)';

export default async function Home() {
  const cssPathDev = path.join(process.cwd(), 'app');

  let tree = await getFileTree(cssPathDev);
  tree = tree
    .map((filePath) => path.relative(cssPathDev, filePath))
    .filter(
      (filePath) =>
        filePath.endsWith('.ts') ||
        filePath.endsWith('.tsx') ||
        filePath.endsWith('.js') ||
        filePath.endsWith('.jsx')
    );

  return (
    <>
      <h1 {...stylex.props(s.h1)}>
        Next.js App Dir
        <span {...stylex.props(s.emoji)}>♥️</span>️ StyleX
      </h1>
      <p {...stylex.props(s.body, s.p)}>
        <strong>NOTE:</strong> The NextJS integration is experimental. Expect
        bugs.
      </p>
      <p {...stylex.props(s.body, s.p)}>
        Use the links below to see the generated output of the various
        Javascript files or you can see the generated CSS bundle with the link
        above. (The links may be slow to open at first)
      </p>
      <ul {...stylex.props(s.p)}>
        {tree.map((file) => (
          <li {...stylex.props(s.body, s.li)} key={file}>
            <Link
              {...stylex.props(s.link)}
              href={'/js-output?filepath=' + encodeURIComponent(file)}
            >
              {file}
            </Link>
          </li>
        ))}
      </ul>
      <p {...stylex.props(s.body, s.p)}>
        You can create new JS files and to test your own code.
      </p>
      <p {...stylex.props(s.body, s.p)}>
        <strong>NOTE:</strong> Theming APIs are currently not functional in this
        playground.
      </p>
    </>
  );
}

const s = stylex.create({
  h1: {
    fontSize: '2rem',
    lineHeight: 1,
    fontFamily: 'system-ui, sans-serif',
    fontWeight: 400,
    textAlign: 'center',
    display: 'flex',
    gap: 8,
    whiteSpace: 'nowrap',
    flexDirection: {
      default: 'row',
      [MEDIA_MOBILE]: 'column',
    },
  },
  body: {
    fontSize: '1rem',
    fontFamily: 'system-ui, sans-serif',
  },
  p: {
    marginTop: 16,
    lineHeight: 1.4,
  },
  li: {
    marginTop: 8,
  },
  link: {
    color: '#4dabf7',
  },
  emoji: {
    position: 'relative',
    fontFamily: 'sans-serif',
    top: {
      default: 0,
      [MEDIA_MOBILE]: 2,
    },
  },
});

async function getFileTree(dir: string): Promise<Array<string>> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent): Promise<Array<string>> | string => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFileTree(res) : res;
    })
  );
  return files.flat();
}
