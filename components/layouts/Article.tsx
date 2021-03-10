import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';
import { dateToHumanString } from '../../util/dates';
import { FollowMe } from './FollowMe';

type ArticleProps = {
	title: string;
	description: string;
	metaDescription: string;
	date: string;
	intro: string;
	img: string;
	pixelateImage?: boolean;
	socialMediaImg: string;
	children: React.ReactNode;
};

function Article({
	title,
	description,
	metaDescription,
	date,
	intro,
	img,
	pixelateImage,
	socialMediaImg,
	children,
}: ArticleProps) {
	const headerContent = (
		<p className="text-white sm:mx-auto sm:max-w-2xl">{intro}</p>
	);

	return (
		<Root
			title={title}
			metaForTitle={dateToHumanString(date)}
			metaDescription={metaDescription || description}
			headerContent={headerContent}
			img={img}
			pixelateImage={pixelateImage}
			socialMediaImg={socialMediaImg}
			imgAlt="Illustration representing the article"
			navigation
		>
			<MDXProvider components={MDXComponents}>
				<div className="mx-auto max-w-2xl sm:mt-32">
					{children}
					<FollowMe className="mt-16 -mb-16 sm:my-16" />
				</div>
			</MDXProvider>
		</Root>
	);
}

export { Article };
