import React from 'react';
import './styles.css';
import { Frame } from './move-site';
export const metadata = {
  title: {default:'Hang Time Transport | Interstate moving',template:'%s | Hang Time Transport'},
  description: 'Three ways to move across all 48 contiguous states. Compare plans and estimate your move with Hang Time Transport.',
};
export default function Layout({children}) {
  return <html lang="en"><body><Frame>{children}</Frame></body></html>;
}
