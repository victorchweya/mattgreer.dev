import React from 'react';
import { Root } from '../layouts/Root';
import { MDXComponents } from '../layouts/MDXComponents';
import { FocalColorLink } from '../FocalColorLink';
import { ResumeLink } from '../ResumeLink';

import baguettesJpg from './baguettes.jpg';
import frannyJpg from './franny.jpg';
import charlieJpg from './charlie.jpg';
import { FiSmile } from 'react-icons/fi';

const { h2: H2, p: P, img: Img } = MDXComponents;

function AboutPage() {
	const headerContent = (
		<>
			<p>
				My name is Matt Greer and I am based in the Ann Arbor, Michigan area.
			</p>
			<p>
				I have been a professional software engineer since about the year 2000,
				but have been programming since I was a small child. My career has
				spanned many industries and technologies, but lately I've been focused
				on web tech such as React and Svelte.
			</p>
		</>
	);

	return (
		<Root
			title="About Me"
			currentNav="/about"
			page="about"
			metaDescription="Some background about me and this website"
			navigation
			headerContent={headerContent}
		>
			<P>
				I have worked for Netflix and Microsoft, amongst other companies (here
				is my <ResumeLink />
				). I am now an independent developer, and am interested in working with
				dynamic teams to help build out cutting edge web experiences.
			</P>
			<H2>My Interests</H2>
			<P>
				As you can probably tell by many of my{' '}
				<FocalColorLink href="/projects">projects</FocalColorLink>, I really
				like old video games. I especially find old game console hardware
				interesting. It's super neat how they were custom built for running
				games, almost as if they have a game engine built into the hardware
				itself.
			</P>
			<P>
				Recently I have been exploring baking bread and pizza. Here is a recent
				baguette I made, and well, I have a long ways to go{' '}
				<FiSmile className="inline" />. It's pretty interesting just how far
				down the rabbit hole you can go on flour, hydration, fermentation and
				more. And eating delicious bread regularly is okay by me.
				<Img src={baguettesJpg} alt="a baguette I made" />
			</P>

			<P>
				I'm a big softy when it comes to animals. Here is our blind dog Franny,
				<Img src={frannyJpg} alt="Franny, my dog" />
			</P>
			<P>
				and our cat Charlie.
				<Img src={charlieJpg} alt="Charlie, my cat" />
			</P>

			<H2>This Website</H2>
			<P>
				This site was built with Next.JS and hosted by Vercel. I used Tailwind
				CSS for the styling, and created the illustrations with Inkscape. You
				can see its source code{' '}
				<FocalColorLink href="https://github.com/city41/mattgreer.org" external>
					here
				</FocalColorLink>
				.
			</P>
		</Root>
	);
}

export { AboutPage };
