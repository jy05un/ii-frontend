declare module '*.css' {
  const content: { [key: string]: string };
  export = content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
