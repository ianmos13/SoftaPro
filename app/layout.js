import Sidebar from '@/components/Sidebar'
import './globals.css'
import styles from '@/styles/Layout.module.scss';
import { Providers } from './providers'
import Link from "next/link";

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<title>SOFTAPRO</title>
			</head>
			<Providers>
				<body>
					<div className={styles.notchContainer}>
						<Link className={styles.logoLink} href={'/'}>
							<img src='/logo.svg' alt='SoftaPro' className={styles.logoImage} />
							<h1 className={styles.logoText}>SOFTAPRO</h1>
						</Link>
					</div>
					<Sidebar />
					<div className={styles.outerContainer}>
						<div className={styles.innerContainer}>{children}</div>
					</div>
				</body>
			</Providers>
		</html>
	)
}
