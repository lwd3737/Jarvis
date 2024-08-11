import SidePannel from "./components/SidePannel";

export default async function Page() {
	// 채널 영상 목록 조회
	// 영상 필터링
	// 영상 자막 다운로드
	// 자막 요약 및 핵심 정보 추출

	return (
		<div className="flex h-full">
			<SidePannel />

			<section className="flex-1">
				<h1 className="py-5 text-2xl text-center text-bold">
					유튜버 히스토리 트래커
				</h1>
			</section>
		</div>
	);
}
