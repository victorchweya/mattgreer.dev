import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import { PageHeading } from '../PageHeading';

type ArticleProps = {
	title: string;
	date: string;
	children: React.ReactNode;
};

function toId(s: string) {
	return s.toLowerCase().replace(/\s/g, '-');
}

function Callout({ className, children }) {
	return (
		<div className={clsx(className, 'my-4 max-w-2xl p-4 -mx-4')}>
			{children}
		</div>
	);
}

const components = {
	h2: ({ children }) => (
		<h2 className="text-2xl font-bold mt-32" id={toId(children)}>
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="font-bold mt-16" id={toId(children)}>
			{children}
		</h3>
	),
	a: ({ children }) => (
		<a className="text-focal font-bold hover:underline">{children}</a>
	),
	img: (props) => (
		<img className="my-12 max-w-2xl" {...props} style={{ maxWidth: '100%' }} />
	),
	p: ({ children }) => <p className="my-4 max-w-2xl">{children}</p>,
	pitfall: ({ children }) => (
		<Callout className="text-red-900 bg-red-50">{children}</Callout>
	),
	wisdom: ({ children }) => (
		<Callout className="text-green-900 bg-green-50">{children}</Callout>
	),
};

function Article({ title, date, children }: ArticleProps) {
	return (
		<MDXProvider components={components}>
			<div className="max-w-screen-lg lg:mx-auto mx-4 px-4 sm:px-16 pb-32">
				<header className="pt-24 mb-16 sm:pt-32 sm:mb-24">
					<time className="text-xs text-fg-fade" dateTime={date}>
						{new Date(date).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</time>
					<PageHeading logo>{title}</PageHeading>
				</header>
				{children}
			</div>
		</MDXProvider>
	);
}

export { Article };
