// src/components/DynamicCodes.tsx
'use client';

import React, { useMemo } from 'react';
import { transform } from 'sucrase';
import { Icon } from '@iconify/react';

interface DynamicCodesProps {
  code: string;
}

function prepareCode(raw: string): string {
	const trimmed = raw.trim();
	if (!trimmed) return 'export default function DynamicComponent(){ return null; }';

	if (/^\s*export\s+default\s+function\b/.test(trimmed)) return trimmed;
	if (/^\s*export\s+default\s+class\b/.test(trimmed)) return trimmed;

	let expr = trimmed.replace(/^\s*export\s+default\s+/, '').trim();

	const arrow = expr.match(/^\([^)]*\)\s*=>\s*([\s\S]+)$/);
	if (arrow) {
		let body = arrow[1].trim();
		if (body.startsWith('(') && body.endsWith(')')) {
			body = body.slice(1, -1).trim();
		}
		expr = body;
	}

	return `export default function DynamicComponent(){ return (${expr}); }`;
}

function evaluateDynamicCode(code: string): React.ReactNode {
	const safeCode = prepareCode(code);
	const transpiled = transform(safeCode, {
		transforms: ['jsx', 'typescript', 'imports'],
		production: true,
	}).code.substring(13);

	const exportsObj: { default?: unknown } = {};
	const requireFn = (moduleName: string) => {
		if (moduleName === 'react') return React;
		if (moduleName === '@iconify/react') return { Icon };
		throw new Error(`Module not found: '${moduleName}'`);
	};

	// eslint-disable-next-line no-new-func
	const fn = new Function('React', 'Icon', 'exports', 'require', transpiled);
	fn(React, Icon, exportsObj, requireFn);

	const component = exportsObj.default;
	if (React.isValidElement(component)) return component;
	if (typeof component === 'function') {
		return React.createElement(component as React.ComponentType);
	}
	if (typeof component === 'string') return component;
	return null;
}

export default function DynamicCodes({ code }: DynamicCodesProps) {
	const rendered = useMemo(() => {
		try {
			return evaluateDynamicCode(code);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Erro ao renderizar código';
			return <p className="text-red-500 text-sm">{message}</p>;
		}
	}, [code]);

	return <>{rendered}</>;
}