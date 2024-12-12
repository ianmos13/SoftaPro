'use client'

import { setHeaderText, setInfoText } from '@/redux/serviceSlice'
import { startFastScroll } from '@/static/startFastScroll'
import styles from '@/styles/Menu.module.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import {
	Autoplay,
	EffectCoverflow,
	Mousewheel,
	Navigation,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const swiperConfigLong = {
	direction: 'vertical',
	effect: 'coverflow',
	centeredSlides: true,
	slidesPerView: 3.1,
	spaceBetween: 0,
	mousewheel: {
		forceToAxis: true,
		sensitivity: 0.1,
		invert: true,
		releaseOnEdges: true,
		thresholdDelta: 4,
		thresholdTime: 500,
	},
	loop: true,
	modules: [EffectCoverflow, Mousewheel, Navigation, Autoplay],
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 3,
		slideShadows: false,
	},
}

const swiperConfigShort = {
	direction: 'vertical',
	effect: 'coverflow',
	centeredSlides: false,
	slidesPerView: 2,
	spaceBetween: 20,
	mousewheel: {
		forceToAxis: true,
		sensitivity: 0.1,
		invert: true,
		releaseOnEdges: true,
		thresholdDelta: 4,
		thresholdTime: 500,
	},
	loop: true,
	modules: [EffectCoverflow, Mousewheel, Navigation, Autoplay],
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 3,
		slideShadows: false,
	},
	style: {
		height: '150px',
	},
}

export default function Menu({mobile, theme, textData }) {
	const [isClick, setIsClick] = React.useState(false)
	const [isAnimationOver, setIsAnimationOver] = React.useState(false)
	let notDefault = theme !== 'default'
	const [smallVersion, setSmallVersion] = React.useState(notDefault)
	const [config, setConfig] = React.useState(notDefault ? swiperConfigShort : swiperConfigLong)
	const [currentData, setCurrentData] = React.useState(textData ?? [])
	const dispatch = useDispatch()
	const swiperRef = React.useRef(null)

	const getTextById = (searchId, data) => {
		return data.find(({ id }) => id === searchId)
	}

	const getTextByTag = (searchTag, data) => {
		return data.find(({ tag }) => tag === searchTag)
	}

	const handleSlideChange = (swiper, isAnimationOver) => {
		const currentSlideIndex = swiper.realIndex
		let sliderInfo = getTextById(currentSlideIndex, currentData)
		if (isAnimationOver) {
			setIsClick(true)
			dispatch(setHeaderText(sliderInfo?.title))
			dispatch(setInfoText(sliderInfo?.info))
		}
	}

	const handleSlideClick = (clickedIndex) => {
		const swiper = swiperRef.current;
		const activeIndex = swiper.realIndex;
		const swiperLength = swiper.slides.length;

		if (clickedIndex === activeIndex) {
		} else if (clickedIndex === (activeIndex - 2 + swiperLength) % swiperLength ||
			clickedIndex === (activeIndex - 1 + swiperLength) % swiperLength) {
			swiper.slidePrev();
		} else if (clickedIndex === (activeIndex + 1) % swiperLength ||
			clickedIndex === (activeIndex + 2) % swiperLength) {
			swiper.slideNext();
		}
	}

	React.useEffect(() => {
		let notDefault = theme !== 'default'
		setSmallVersion(notDefault)
		setConfig(notDefault ? swiperConfigShort : swiperConfigLong)
	}, [theme])

	React.useEffect(() => {
		if(mobile){
			setIsClick(false)
			setIsAnimationOver(false)
			setCurrentData(textData)
		}
	}, [textData])

	React.useEffect(() => {
		if (typeof window !== 'undefined' && currentData.length > 0 && swiperRef) {
			const hash = window.location.hash.substring(1)
			const data = getTextByTag(hash, currentData)
			const searchIndex = data ? data.id : Math.floor(Math.random() * currentData.length)
			if (smallVersion) {
				setIsAnimationOver(true)
				if (data){
					swiperRef.current.slideTo(data.id,300,true)
					handleSlideChange(swiperRef.current, true)
				}
			} else {
				startFastScroll(
					swiperRef,
					currentData.length,
					1,
					searchIndex,
					() => {
						setIsAnimationOver(true)
						if (hash) handleSlideChange(swiperRef.current, true)
					}
				)
			}
		}
	}, [currentData])

	return (
		<div className={styles.menuContainer}>
			<Swiper
				className={`${styles.swiperMenu} ${
					isClick ? `swiperMenu ${theme}SwiperMenu` : ''
				}`}
				onSwiper={swiper => (swiperRef.current = swiper)}
				{...config}
				onRealIndexChange={() => {
					handleSlideChange(swiperRef.current, isAnimationOver)
				}}
			>
				{currentData.map((info, idx) => (
					<SwiperSlide
						key={idx}
						className={styles.swiperSlide}
						onClick={() => handleSlideClick(idx)}

					>
						<div className={`swiperSlide`}>
							<div className={`${styles.slideInfo} slideInfo`}>
								<p>{info.title}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
