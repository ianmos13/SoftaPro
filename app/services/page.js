import ContentBox from '@/components/ContentBox'
import { defaultServices, services } from '@/static/text'

export default function ServicePage() {
	return (
		<ContentBox
			defaultText={defaultServices}
			mainText={services}
			theme={'default'}
		/>
	)
}
