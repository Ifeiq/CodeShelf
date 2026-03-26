// src/components/DynamicCodes.tsx
'use client';

import React from 'react';
import { Runner } from 'react-runner';
import { Icon } from '@iconify/react';

interface DynamicCodesProps {
  code: string;
}

function wrapCode(raw: string): string {
  const trimmed = raw.trim();

  // Já é um componente completo
  if (trimmed.includes('export default')) return trimmed;

  // Wrappa o JSX dentro de um componente funcional
  return `
export default function DynamicComponent() {
  return (
    <>
      ${trimmed}
    </>
  );
}
  `.trim();
}

const runnerImportMap = {
  react: React,
  /** Permite `import { Icon } from '@iconify/react'` dentro do código dinâmico */
  "@iconify/react": { Icon },
} as const;

export default function DynamicCodes({ code }: DynamicCodesProps) {
  const wrappedCode = wrapCode(code);

  return (
    <Runner
      code={wrappedCode}
      scope={{
        React,
        ...React,
        /** `<Icon icon="mdi:home" />` sem import explícito */
        Icon,
        import: { ...runnerImportMap },
      }}
    />
  );
}