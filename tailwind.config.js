/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

const darkMode = ['class'];
const content = [
  './src/**/*.{ts,tsx}',
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
];
const prefix = '';
const theme = {
  extend: {},
};
const plugins = [require('tailwindcss-animate'), nextui()];
export { plugins, content, darkMode, prefix, theme };
