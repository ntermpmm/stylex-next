import './globals.css';

import * as stylex from '@stylexjs/stylex';
import NavLink from './NavLink';

export const metadata = {
  title: 'StyleX + Next',
  description: 'StyleX with NextJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav {...stylex.props(styles.nav)}>
          <NavLink href="/">Home</NavLink>
          <span {...stylex.props(styles.spacer)} />
          <NavLink href="/css-output">CSS Output</NavLink>
        </nav>
        <main {...stylex.props(styles.main)}>{children}</main>
      </body>
    </html>
  );
}

const MEDIA_MOBILE = '@media (max-width: 700px)';

const styles = stylex.create({
  nav: {
    display: 'flex',
    width: '100%',
    maxWidth: 1240,
    marginInline: 'auto',
    gap: 4,
    padding: 32,
  },
  spacer: {
    flexGrow: 1,
  },
  main: {
    paddingInline: 32,
    minHeight: '100vh',
    width: '100%',
    maxWidth: 1240,
    marginInline: 'auto',
  },
});
