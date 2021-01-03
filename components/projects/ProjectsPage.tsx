import React from 'react';
import { TagFilter } from '../TagFilter';
import { Feature } from '../Feature';
import { Root } from '../layouts/Root';

import laptopSvg from './laptop.svg';

type ProjectsPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function ProjectsPage({ tag, allTags, items }: ProjectsPageProps) {
	const headerContent = (
		<TagFilter
			tags={allTags}
			currentTag={tag}
			classification="projects"
			count={items.length}
		/>
	);

	return (
		<Root
			title="Projects"
			currentNav="/projects"
			metaDescription="Things I have created, mostly webapps"
			img={laptopSvg}
			imgAlt="Illustration of a laptop"
			navigation
			headerContent={headerContent}
			headerContentUnderTitle
		>
			<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl -mx-8 sm:mx-auto">
				{items.map((i) => (
					<Feature key={i.slug} {...i} />
				))}
			</div>
		</Root>
	);
}

export { ProjectsPage };
