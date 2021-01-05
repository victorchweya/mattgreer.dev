import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type TagProps = {
	className?: string;
	children: string;
	component?: React.ElementType;
	classification: 'projects' | 'articles';
};

function getUrl(classification: TagProps['classification'], tag: string) {
	if (tag === 'All') {
		return `/${classification}`;
	} else {
		return `/${classification}/${tag}`;
	}
}

function Tag({
	className,
	children,
	component = 'div',
	classification,
}: TagProps) {
	const Component = component;

	return (
		<Link href={getUrl(classification, children)} passHref>
			<a>
				<Component
					className={clsx(
						className,
						'font-bold bg-gray-200 text-gray-700 py-1 px-2 sm:text-xs hover:underline hover:bg-focal-alt-fade hover:text-white'
					)}
				>
					{children}
				</Component>
			</a>
		</Link>
	);
}

export { Tag };
