'use client'

import { setHeaderText, setInfoText } from '@/redux/serviceSlice'
import styles from '@/styles/InformationBlock.module.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function InformationBlock({
	theme,
	defaultHeader,
	defaultText,
}) {
	const [expanded, setExpanded] = React.useState(false)
	const [textVisible, setTextVisible] = React.useState(false)
	const [header, setHeader] = React.useState(defaultHeader)
	const [text, setText] = React.useState(defaultText)

	const dispatch = useDispatch()
	const { headerText, infoText } = useSelector(state => state.service)

	React.useEffect(() => {
		setHeader(headerText ? headerText : defaultHeader)
		setText(infoText ? infoText : defaultText)

		const expandTimeout = setTimeout(() => {
			setExpanded(true)
		}, 1000)

		const textTimeout = setTimeout(() => {
			setTextVisible(true)
		}, 2000)

		return () => {
			clearTimeout(expandTimeout)
			clearTimeout(textTimeout)
			dispatch(setHeaderText(''))
			dispatch(setInfoText(''))
		}
	}, [])

	React.useEffect(() => {
		setHeader(headerText ? headerText : defaultHeader)
		setText(infoText ? infoText : defaultText)
	}, [headerText, infoText])

	return (
		<div
			className={`${styles.outerContainer} ${expanded ? styles.expanded : ''} ${textVisible ? styles.expandedEnd : ''}`}
		>
			<div
				className={`${styles.innerContainer} ${styles[`${theme}Theme`]} ${expanded ? styles.expanded : ''}`}
			>
				<div
					className={`${styles.serviceInformation} ${
						textVisible ? styles.visible : ''
					}`}
				>
					<h1 className={styles.headerText}>{header}</h1>
					<p className={styles.infoText}>{text}</p>
				</div>
			</div>
		</div>
	)
}
