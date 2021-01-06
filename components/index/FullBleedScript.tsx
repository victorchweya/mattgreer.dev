import React from 'react';

type FullBleedScriptProps = {
	rootId: string;
	titleId: string;
	nextInPageId: string;
	floatingImgSrc: string;
	reflectionImgSrc: string;
};

type Point = { x: number; y: number };
type Bounds = { left: number; top: number; right: number; bottom: number };

type Particle = {
	x: number;
	y: number;
	color: string;
	targetAlpha: number;
	currentAlpha: number;
};

function animateFullBleed(args: FullBleedScriptProps) {
	const {
		rootId,
		titleId,
		nextInPageId,
		floatingImgSrc,
		reflectionImgSrc,
	} = args;

	const isSafari = !!(navigator.vendor?.indexOf('Apple') > -1);

	function isInMobileMode(root: HTMLDivElement): boolean {
		return window.innerWidth < 800;
	}

	const fullBleedRoot = document.getElementById(
		rootId
	) as HTMLDivElement | null;

	if (!fullBleedRoot) {
		return;
	}

	if (fullBleedRoot.querySelector('canvas')) {
		return;
	}

	const bounds = fullBleedRoot.getBoundingClientRect();

	if (bounds.width === 0) {
		setTimeout(() => animateFullBleed(args), 25);
		return;
	}

	if (isInMobileMode(fullBleedRoot)) {
		return;
	}

	const title = fullBleedRoot.querySelector(`#${titleId}`) as HTMLDivElement;
	const nextInPage = document.getElementById(nextInPageId);

	if (nextInPage) {
		nextInPage.classList.remove('mt-24');
		nextInPage.style.setProperty(
			'margin-top',
			`-${Math.round(window.innerHeight / 3)}px`
		);

		let scrollTop;
		let ticking = false;

		document.addEventListener(
			'scroll',
			() => {
				scrollTop = document.scrollingElement.scrollTop;

				if (!ticking) {
					requestAnimationFrame(() => {
						const margin = Math.min(
							document.scrollingElement.scrollTop,
							bounds.height
						);
						fullBleedRoot.style.setProperty(
							'transform',
							`translateY(-${margin}px)`
						);

						if (isSafari) {
							// fix a safari specific bug where the title/arrow disappear
							// when scrolling back up to the top of the page
							// they seem to disappear because the canvas gets z ordered on top of them
							// removing then re-adding the canvas is the only hack I could find that works
							fullBleedRoot.removeChild(canvas);
							fullBleedRoot.appendChild(canvas);
						}

						ticking = false;
					});

					ticking = true;
				}
			},
			{ passive: true }
		);
	}

	const canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fullBleedRoot.style.setProperty('height', `${window.innerHeight}px`);
	canvas.style.setProperty('position', 'absolute');
	canvas.style.setProperty('z-index', '0');
	canvas.style.setProperty('top', '0');
	canvas.style.setProperty('left', '0');

	fullBleedRoot.appendChild(canvas);

	const context = canvas.getContext('2d');

	const seaGradient = context.createLinearGradient(0, 0, 0, canvas.height);
	seaGradient.addColorStop(0, '#118a8b');
	seaGradient.addColorStop(0.25, '#118a8b');
	seaGradient.addColorStop(1, '#063232');

	const BAR_COUNT = 50;
	let barWidth = Math.ceil(canvas.width / BAR_COUNT);
	const yOverlap = 20;
	const tickRate = 0.003;
	const reflectionRate = 0.003;
	let tick = 0;

	window.addEventListener('resize', () => {
		if (isInMobileMode(fullBleedRoot)) {
			canvas.style.display = 'none';
			fullBleedRoot.style.removeProperty('height');
		} else {
			fullBleedRoot.style.setProperty('height', `${window.innerHeight}px`);
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			barWidth = Math.ceil(canvas.width / BAR_COUNT);

			canvas.style.display = 'block';
		}
	});

	// draw the polygons just slightly bigger so they overlap a bit.
	// since all colors are opaque, this won't cause any ill effects, and helps
	// ensure on all machines, there isn't a tiny/thin border between each bar
	const fudge = 0.1;

	function drawPolygon(
		x: number,
		upperLeftY: number,
		upperRightY: number,
		lowerLeftY: number,
		lowerRightY: number
	) {
		context.beginPath();
		context.moveTo(x - fudge, upperLeftY);
		context.lineTo(x - fudge, lowerLeftY);
		context.lineTo(x + barWidth + fudge, lowerRightY);
		context.lineTo(x + barWidth + fudge, upperRightY);
		context.closePath();
		context.fill();
	}

	let heightTweak = 0.5;

	function getWaveHeight(seed: number): number {
		const height =
			(Math.sin((seed + tick) / (BAR_COUNT / 10)) * canvas.height) / 4;

		return (height * Math.sin(heightTweak) * seed) / BAR_COUNT / 2; // * Math.cos((tick * seed) / BAR_COUNT); // / ((seed + 1) * 0.04);
	}

	const floaterIndex = Math.floor(BAR_COUNT * 0.75);

	const img = new Image();
	img.src = floatingImgSrc;
	const reflectionImg = new Image();
	reflectionImg.src = reflectionImgSrc;

	function drawFloater(waveOffset: number, tick: number) {
		if (!img.width || !reflectionImg.width) {
			return;
		}

		const leftHeight = getWaveHeight(floaterIndex - 1);
		const rightHeight = getWaveHeight(floaterIndex + 1);

		// by subtracting 2, it causes the floater to slightly desync with
		// the wave, giving the impression it's sloshing around in the water
		const x = (floaterIndex - 4) * barWidth;
		const y = (leftHeight + rightHeight) / 2 + waveOffset + yOverlap * 2.5;

		const angle = Math.atan(
			(rightHeight - leftHeight) / ((canvas.width * 2) / BAR_COUNT)
		);

		context.save();
		context.translate(x, y);
		context.rotate(angle);

		for (let y = 8; y < reflectionImg.height; ++y) {
			const rowXOffset = Math.sin(y / 4 + tick * 0.5) * 8;

			context.drawImage(
				reflectionImg,
				0,
				y,
				reflectionImg.width,
				1,
				rowXOffset - 5,
				23 + y,
				reflectionImg.width * 0.8,
				1
			);
		}

		context.drawImage(
			img,
			0,
			0,
			img.width,
			img.height,
			0,
			0,
			img.width * 0.8,
			img.height * 0.8
		);
		context.restore();
	}

	let last;

	// run at 30fps instead of 60 to help reduce cpu load
	let everyOther = false;

	function mainDraw(timestamp: number) {
		everyOther = !everyOther;

		if (everyOther) {
			requestAnimationFrame(mainDraw);
			return;
		}

		if (last === undefined) {
			last = timestamp;
		}

		const delta = timestamp - last;
		last = timestamp;

		if (isInMobileMode(fullBleedRoot)) {
			setTimeout(() => {
				requestAnimationFrame(mainDraw);
			}, 1000);
			return;
		}

		tick += tickRate * delta;

		context.clearRect(0, 0, canvas.width, canvas.height);

		heightTweak += 1 / 100;

		const waveOffset = canvas.height * 0.4;

		for (let i = 0; i < BAR_COUNT; i++) {
			const leftWaveHeight = getWaveHeight(i);
			const rightWaveHeight = getWaveHeight(i + 1);

			const x = i * barWidth;

			context.fillStyle = '#489393';

			drawPolygon(
				x,
				leftWaveHeight - yOverlap + waveOffset,
				rightWaveHeight - yOverlap + waveOffset,
				leftWaveHeight + waveOffset,
				rightWaveHeight + waveOffset
			);

			context.fillStyle = seaGradient;

			drawPolygon(
				x,
				leftWaveHeight + waveOffset,
				rightWaveHeight + waveOffset,
				canvas.height,
				canvas.height
			);
		}

		drawFloater(waveOffset, tick);

		requestAnimationFrame(mainDraw);
	}

	requestAnimationFrame(mainDraw);
}

function FullBleedScript(props: FullBleedScriptProps) {
	return (
		<script
			type="text/javascript"
			dangerouslySetInnerHTML={{
				__html: `${animateFullBleed.toString()}; animateFullBleed(${JSON.stringify(
					props
				)})`,
			}}
		></script>
	);
}

export { FullBleedScript };
