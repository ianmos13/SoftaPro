import styles from '@/styles/About.module.scss'
import { aboutUs } from '@/static/text'

export default function AboutPage() {
	return (
		<div className={styles.container}>
			<div className={styles.animationContainer}>
				<div className={styles.logoContainer}>
					<div className={styles.logo}>
						<h1 className={styles.logoText}>SOFTAPRO</h1>
					</div>
				</div>
				<div className={styles.textArea}>
					<div className={styles.text}>
						{ aboutUs.map((info, idx) => (
							<p key={idx}>{info}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
