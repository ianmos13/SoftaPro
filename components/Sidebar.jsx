'use client'

import Menu from '@/components/Menu'
import { partners, products, services } from '@/static/text'
import styles from '@/styles/Sidebar.module.scss'
import { usePathname } from 'next/navigation'
import React from 'react'
const withoutSidebarPages = ['/contacts', '/about']

export default function Sidebar() {
	const [isOpenMenu, setIsOpenMenu] = React.useState(false)
	const [currentData, setCurrentData] = React.useState([])
	const [theme, setTheme] = React.useState('default')
	const pathname = usePathname()
	const isHidden = pathname === '/' || withoutSidebarPages.includes(pathname)

	React.useEffect(() => {
		switch (pathname.substring(1)) {
			case 'services':
				setCurrentData(services)
				setTheme('default')
				break
			case 'partners':
				setCurrentData(partners)
				setTheme('purple')
				break
			case 'products':
				setCurrentData(products)
				setTheme('yellow')
				break
			default:
				setCurrentData([])
				setTheme('default')
		}
	}, [pathname])

	const handleOpenMenu = () => {
		setIsOpenMenu(true)
	}

	const handleCloseMenu = () => {
		setIsOpenMenu(false)
	}

	return (
		<div className={`${styles.container} ${isHidden ? styles.hidden : ''}`}>
			{ !isHidden && (
				<>
					<button className={styles.menuButton} onClick={handleOpenMenu}>
						<img src='/menu.svg' alt='menu' />
					</button>
					<div className={`${styles.sidebarBox} ${isOpenMenu ? styles.open : ''}`}>
						<button className={styles.closeButton} onClick={handleCloseMenu}>
							<img src='/close.svg' alt='close' />
						</button>
						<div className={styles.menuContainer}>
							<Menu mobile={true} theme={theme} textData={currentData} />
						</div>
					</div>
				</>
			)}
		</div>
	)
}
