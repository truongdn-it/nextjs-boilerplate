import React from 'react';
import Link from 'next/link';

import styles from './footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      NextJs boilerplate ©2023 Created by{' '}
      <Link
        className={styles.footerLink}
        href="https://github.com/truongdn-it/nextjs-boilerplate"
        target="_blank"
      >
        truongdn-it
      </Link>
    </footer>
  );
}
