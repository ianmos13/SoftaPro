import InformationBlock from '@/components/InformationBlock'
import Menu from '@/components/Menu'
import Scene from '@/components/Scene'
import styles from '@/styles/ContentBox.module.scss'

export default function ContentBox({ defaultText, mainText, theme }) {
	return (
		<div className={styles.container}>
			<div className={styles.menuContainer}>
				<Menu mobile={false} theme={theme} textData={mainText} />
			</div>
			<div className={styles.figureContainer}>
				<Scene
					modelName={'1725893200163.glb'}
					scale={2.7}
					position={[0, 0.5, 0]}
					rotation={[Math.PI / 2.7, Math.PI * 1.85, Math.PI / 12]}
					theme={theme}
				/>
			</div>
			<div className={styles.mediumFigureContainer}>
				<Scene
					modelName={'1725893200163.glb'}
                    scale={2}
                    position={[0.5, 1.2, 0]}
					rotation={[Math.PI / 2.7, Math.PI * 1.85, Math.PI / 12]}
					theme={theme}
				/>
			</div>
			<div className={styles.mobileFigureContainer}>
				<Scene
					modelName={'1725893200163.glb'}
					scale={4.7}
					position={[0.4, 0, 0]}
					rotation={[Math.PI / 2.7, Math.PI * 1.85, Math.PI / 12]}
					theme={theme}
				/>
			</div>
			<div className={styles.infoContainer}>
				<InformationBlock
					theme={theme}
					defaultHeader={defaultText.title}
					defaultText={defaultText.info}
				/>
			</div>
		</div>
	)
}
