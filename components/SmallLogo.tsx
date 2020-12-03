import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type SmallLogoProps = {
	className?: string;
};

function SmallLogo({ className }: SmallLogoProps) {
	return (
		<Link href="/" passHref>
			<div className={clsx(className, 'flex flex-row w-auto cursor-pointer')}>
				<a className="small_logo w-6 h-6 sm:w-9 sm:h-9" />
				<span className="self-center text-xs text-fg-fade ml-1">
					Matt Greer
				</span>
			</div>
		</Link>
	);
}

export { SmallLogo };
