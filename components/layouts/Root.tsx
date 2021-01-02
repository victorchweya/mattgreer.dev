import React from 'react';
import { Navigation } from '../Navigation';
import { Head } from './Head';
import { Header } from '../Header';
import { Footer } from '../Footer';

import fallbackImg from './meIndex_openGraph.png';

type RootProps = {
	navigation?: boolean;
	currentNav?: string;
	title: string;
	metaDescription: string;
	page?: string;
	img?: string;
	headerContent?: React.ReactNode;
	headerContentUnderTitle?: boolean;
	children: React.ReactNode;
};

function Root({
	navigation,
	currentNav,
	title,
	metaDescription,
	page,
	img,
	headerContent,
	headerContentUnderTitle,
	children,
}: RootProps) {
	return (
		<>
			<Head title={title} metaDescription={metaDescription} metaImg={img} />
			{navigation && <Navigation current={currentNav} />}
			<Header
				title={title}
				page={page}
				img={img}
				childrenUnderTitle={headerContentUnderTitle}
			>
				{headerContent}
			</Header>
			<main role="main" className="mt-32 px-8 sm:px-0 sm:max-w-4xl sm:mx-auto">
				{children}
			</main>
			<Footer className="mt-16 sm:mt-24" />
		</>
	);
}

export { Root };
