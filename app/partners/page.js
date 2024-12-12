import ContentBox from '@/components/ContentBox'
import { defaultPartners, partners } from '@/static/text'

export default function PartnersPage() {
	return (
		<ContentBox
			defaultText={defaultPartners}
			mainText={partners}
			theme={'purple'}
		/>
	)
}
