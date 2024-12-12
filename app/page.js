import Intro from "@/components/Intro";
import {Suspense} from "react";

export default function Home() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Intro />
			</Suspense>
		</>
	)
}
