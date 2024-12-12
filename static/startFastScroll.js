export const startFastScroll = (
	swiperRef,
	slides,
	cycles,
	endPointId,
	onComplete
) => {
	const swiper = swiperRef.current
	if (!swiper) return

	let currentScroll = 0
	let targetScrolls = slides * cycles
	let currentSlideId = swiper.realIndex
	let prevSlideId = currentSlideId
	let currentDelay = 20

	const lerp = (start, end, t) => start + (end - start) * t

	const scroll = () => {
		if (!swiper.realIndex && swiper.realIndex !== 0) return

		currentSlideId = swiper.realIndex

		if (prevSlideId !== currentSlideId) {
			currentScroll++
			prevSlideId = currentSlideId
		}

		const progress = currentScroll / targetScrolls
		currentDelay = lerp(20, 200, progress)

		if (currentScroll < targetScrolls) {
			swiper.slideNext(10, true)
			setTimeout(scroll, currentDelay)
		} else {
			if (currentSlideId !== endPointId) {
				scrollToEndPoint()
			} else {
				onComplete && onComplete()
			}
		}
	}

	const scrollToEndPoint = () => {
		currentSlideId = swiper.realIndex

		if (currentSlideId !== endPointId) {
			swiper.slideNext(10, true)
			setTimeout(scrollToEndPoint, currentDelay)
		} else {
			onComplete && onComplete()
		}
	}

	scroll()
}
