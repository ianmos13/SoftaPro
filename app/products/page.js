import ContentBox from '@/components/ContentBox'
import { defaultProducts, products } from '@/static/text'

export default function ProductsPage() {
	return (
		<ContentBox
			defaultText={defaultProducts}
			mainText={products}
			theme={'yellow'}
		/>
	)
}
