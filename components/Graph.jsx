'use client'

import styles from '@/styles/Graph.module.scss'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js'

const linkSettings = {
	id: 0,
	link_to: '/about',
	title: 'О КОМПАНИИ',
	children: [
		{
			id: 1,
			link_to: '/services',
			title: 'СЕРВИСЫ',
			children: [
				{
					id: 11,
					link_to: '/services#BIM_implementation_to_the_customer',
					title: 'ВНЕДРЕНИЕ BIM ЗАКАЗЧИКУ',
					widthConstraint: { minimum: 90, maximum: 155 },
				},
				{
					id: 12,
					link_to: '/services#BIM_implementation_to_the_designer',
					title: 'ВНЕДРЕНИЕ BIM ПРОЕКТИРОВЩИКУ',
					widthConstraint: { minimum: 90, maximum: 255 },
				},
				{
					id: 13,
					link_to: '/services#customer_consulting',
					title: 'КОНСАЛТИНГ ЗАКАЗЧИКА',
					widthConstraint: { minimum: 90, maximum: 175 },
				},
				{
					id: 14,
					link_to: '/services#design_consultancy',
					title: 'КОНСАЛТИНГ ПРОЕКТИРОВЩИКА',
					widthConstraint: { minimum: 90, maximum: 255 },
				},
				{
					id: 15,
					link_to: '/services#family_development',
					title: 'РАЗРАБОТКА СЕМЕЙСТВ',
					widthConstraint: { minimum: 90, maximum: 175 },
				},
				{
					id: 16,
					link_to: '/services#training',
					title: 'ОБУЧЕНИЕ',
					widthConstraint: { minimum: 90, maximum: 135 },
				},
				{
					id: 17,
					link_to: '/services#construction_cost_estimation',
					title: 'ОЦЕНКА СТОИМОСТИ СТРОИТЕЛЬСТВА',
					widthConstraint: { minimum: 90, maximum: 215 },
				},
				// {
				// 	id: 18,
				// 	link_to: '/services#5d_modelling_support',
				// 	title: '5D МОДЕЛИРОВАНИЕ (СОПРОВОЖДЕНИЕ)',
				// 	widthConstraint: { minimum: 90, maximum: 215 },
				// },
				{
					id: 18,
					link_to: '/services#custom_script_plugin_development',
					title: 'РАЗРАБОТКА СКРИПТОВ/ПЛАГИНОВ НА ЗАКАЗ',
					widthConstraint: { minimum: 90, maximum: 300 },
				},
				{
					id: 19,
					link_to: '/services#BIM_modelling_to_order',
					title: 'BIM МОДЕЛИРОВАНИЕ ПОД ЗАКАЗ',
					widthConstraint: { minimum: 90, maximum: 240 },
				},
			],
		},
		{
			id: 2,
			page: 'partners',
			link_to: '/partners',
			title: 'ПАРТНЕРЫ ЗАКАЗЧИКИ',
			widthConstraint: { minimum: 90, maximum: 150 },
			children: [
				{
					id: 21,
					link_to: '/partners#injline',
					title: 'ИНЖЛАЙН',
				},
				{
					id: 22,
					link_to: '/partners#ingrad_project',
					title: 'ИНГРАД ПРОЕКТ',
					widthConstraint: { minimum: 90, maximum: 115 },
				},
			],
		},
		{
			id: 3,
			page: 'products',
			link_to: '/products',
			title: 'ПРОГРАММНЫЕ ПРОДУКТЫ',
			widthConstraint: { minimum: 90, maximum: 210 },
			children: [
				{
					id: 31,
					link_to: '/products#collision_manager',
					title: 'МЕНЕДЖЕР КОЛЛИЗИЙ',
					widthConstraint: { minimum: 90, maximum: 165 },
				},
				{
					id: 32,
					link_to: '/products#workshared_export',
					title: 'WORKSHARED EXPORT',
					widthConstraint: { minimum: 90, maximum: 200 },
				},
			],
		},
		{
			id: 4,
			page: 'contacts',
			link_to: '/contacts',
			title: 'КОНТАКТЫ',
			children: [],
		},
	],
}

export default function Graph() {
    const networkRef = useRef(null);
    const [networkInstance, setNetworkInstance] = useState(null);
    const router = useRouter();

	useEffect(() => {
		if (networkRef.current) {
			const nodesArray = []
			const edgesArray = []
			nodesArray.push({
				id: linkSettings.id,
				fixed: {
					x: 1,
					y: 1,
				},
				x: 22,
				y: 14,
				label: linkSettings.title,
				title: linkSettings.title,
				link_to: linkSettings.link_to,
				borderWidth: 0,
				size: 70,
				color: {
					background: '#dbe7eb',
					highlight: {
						background: '#dbe7eb',
					},
				},
				shape: "circularImage",
				image: '/logo.svg',
			})
			linkSettings.children.forEach(link => {
				nodesArray.push({
					id: link.id,
					label: link.title,
					title: link.title,
					link_to: link.link_to,
					widthConstraint: link.widthConstraint,
					color: {
						background: '#305bcb',
						border: '#d7ffff',
					},
				})
				edgesArray.push({ from: link.id, to: linkSettings.id })
				link.children.forEach(child => {
					nodesArray.push({
						id: child.id,
						label: child.title,
						title: child.title,
						link_to: child.link_to,
						widthConstraint: child.widthConstraint,
						color: {
							background: '#6d9ebe',
							border: '#d7ffff',
						},
					})
					edgesArray.push({ from: link.id, to: child.id })
				})
			})

            const nodes = new DataSet(nodesArray);
            const edges = new DataSet(edgesArray);
            const data = { nodes, edges };
            const options = {
                nodes: {
                    shape: 'dot',
                    size: 20,
                    color: {
                        background: '#2d2d2d',
                        border: '#ffffff'
                    },
                    font: {
						align: "center",
						face: 'Tektur',
                        color: '#154359',
						size: 24,
                    },
                    borderWidth: 2,
                },
                edges: {
                    color: '#154359',
                    width: 1,
                    smooth: {
                        type: 'continuous',
                        forceDirection: 'vertical',
                        roundness: 0
                    }
                },
                interaction: {
                    hover: true
                },
                physics: {
                    enabled: true,
                    barnesHut: {
                        theta: 0.1,
                        gravitationalConstant: -13250,
                        centralGravity: 0,
                        springLength: 0,
                        springConstant: 0.005,
                        damping: 0.22,
                        avoidOverlap: 0.45
                    },
                    maxVelocity: 56,
                    minVelocity: 0.41
                },
				layout: {
					randomSeed: 1,
				}
            };
            const network = new Network(networkRef.current, data, options);
            setNetworkInstance(network);
            network.on('hoverNode', function (params) {
                networkRef.current.style.cursor = 'pointer';
            })
            network.on("blurNode", function () {
                networkRef.current.style.cursor = 'default'
            });
            network.on('click', function (params) {
                if (params.nodes.length > 0) {
                    const nodeId = params.nodes[0];
                    const nodeData = nodes.get(nodeId);
                    if (nodeData && nodeData.link_to) {
                        setTimeout(() => {
                            router.push(nodeData.link_to)
                        }, 1000);
                    }
                }
            });
        }
    }, [networkRef]);

    return (
        <div className={styles.graph}>
            <div ref={networkRef} className={styles.network}></div>
        </div>
    );
}
