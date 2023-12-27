'use client';

import * as stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DARK = '@media (prefers-color-scheme: dark)';

type Props = {
  href: string;
  children: any;
};

export default function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link {...stylex.props(styles.base)} href={href}>
      <span {...stylex.props(styles.base, isActive && styles.focused)}>
        {children}
      </span>
    </Link>
  );
}

const styles = stylex.create({
  base: {
    fontFamily: 'system-ui, sans-serif',
    color: {
      default: 'black',
      [DARK]: 'white',
    },
  },
  focused: {
    fontFamily: 'system-ui, sans-serif',
    color: '#4dabf7',
  },
});
