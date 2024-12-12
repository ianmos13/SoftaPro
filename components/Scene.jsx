'use client'

import {Environment, OrbitControls, useGLTF} from '@react-three/drei'
import {Canvas, useFrame} from '@react-three/fiber'
import {useRef} from "react";
import * as THREE from "three";

const Model = ({ modelName, scale, rotation, position, theme }) => {
	const { scene } = useGLTF(modelName)
	const modelRef = useRef()
	const color =
		theme === 'default' ? 0x6e7770 :
		theme === 'purple' ? 0x6f6f6f :
		theme === 'yellow' ? 0x7b795e : 0x6e7770

	useFrame(() => {
		if (modelRef.current) {
			modelRef.current.rotation.y += 0.001;
			modelRef.current.rotation.x += 0.0005;
		}
	});

	scene.traverse((object) => {
		if (object.isMesh) {
			object.material = new THREE.MeshStandardMaterial()
			object.material.roughness = 0.1
			object.material.transparent = false
			object.material.color.setHex(color)
		}
	})

	return <primitive ref={modelRef} object={scene} scale={scale} rotation={rotation} position={position} />
}

const Scene = ({ modelName, scale, rotation, position, theme }) => {
	return (
		<Canvas camera={{ position: [0, 0, 5] }}>
			<ambientLight intensity={0.4} />
			<directionalLight position={[5, 10, 5]} intensity={1.5} />{' '}
			<directionalLight position={[-5, -10, 5]} intensity={1.2} />{' '}
			<directionalLight position={[0, 5, -10]} intensity={1.3} />{' '}
			<pointLight position={[10, 10, 10]} intensity={0.8} />{' '}
			<pointLight position={[-10, -10, -10]} intensity={0.8} />{' '}
			<Environment files="./potsdamer_platz_1k.hdr" />
			<Model modelName={modelName} scale={scale} rotation={rotation} position={position} theme={theme} />
			<OrbitControls enableZoom={false} />
		</Canvas>
	)
}

export default Scene
