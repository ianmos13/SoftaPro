import Scene from '@/components/Scene'
import styles from '@/styles/Contacts.module.scss'

export default function ContactsPage() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.mainBox}>
					<div className={styles.mobileFigure}>
						<Scene
							modelName={'1725893200163.glb'}
							scale={5}
							position={[0.5, 0.5, 0]}
							rotation={[Math.PI / 2.7, Math.PI * 1.85 , Math.PI / 12]}
						/>
					</div>
					<div className={styles.leftColumn}>
						<div className={styles.figure}>
							<Scene
								modelName={'1725893262980.glb'}
								scale={2.75}
								position={[1, 0.5, 0]}
								rotation={[Math.PI / 4, Math.PI * 1.9 , Math.PI / 1.75]}
							/>
						</div>
						<div className={styles.figure}>
							<Scene
								modelName={'1725893287697.glb'}
								scale={2.75}
								position={[0.75, 0.5, 0]}
								rotation={[Math.PI, Math.PI * 1.25 , Math.PI / 2.3]}
							/>
						</div>
					</div>
					<div className={styles.infoBox}>
						<div className={styles.contactItem}>
							<img src={'/mail.svg'} alt={'email'} className={styles.mailImage} />
							<p className={styles.contactText}>
								<u>info@softapro.pro</u>
							</p>
						</div>
						<div className={styles.contactItem}>
							<img
								src={'/phone.svg'}
								alt={'phone'}
								className={styles.contactImage}
							/>
							<p className={styles.contactText}>+7 (985) 787-74-03</p>
						</div>
						<div className={styles.contactItem}>
							<img src={'/map.svg'} alt={'map'} className={styles.mapImage} />
							<p className={styles.contactText}>
								Москва, 3-я Хорошевская улица, д. 13, к. 1, 123298
							</p>
						</div>
					</div>
					<div className={styles.rightColumn}>
						<div className={styles.rightColumnContainer}>
							<div className={styles.figure}>
								<Scene
									modelName={'1725893315534.glb'}
									scale={2}
									position={[0, 1, 0]}
									rotation={[Math.PI, Math.PI * 1.15 , Math.PI / 2.5]}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.footerItem}>
						<p className={styles.footerText}>@ SOFTAPRO, 2024</p>
					</div>
					<div className={styles.footerItem}>
						<p className={styles.footerText}>Генеральный директор:</p>
						<p className={styles.footerText}>Кошман Константин Владимирович</p>
					</div>
					<div className={styles.footerItem}>
						<p className={styles.footerText}>Общество с ограниченной</p>
						<p className={styles.footerText}>ответственностью «СОФТАПРО»</p>
					</div>
					<div className={styles.footerItem}>
						<p className={styles.footerText}>ОГРН 1247700208304</p>
						<p className={styles.footerText}>ИНН/КПП 7716993948 / 771601001</p>
					</div>
				</div>
			</div>
		</>
	)
}
