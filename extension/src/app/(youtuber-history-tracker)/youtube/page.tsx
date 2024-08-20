import TimeLineGeneratorForm from "./components/TimeLineGeneratorForm";

export default async function Page() {
	// 채널 영상 목록 조회
	// 영상 필터링
	// 영상 자막 다운로드
	// 자막 요약 및 핵심 정보 추출

	return (
		<div className="h-full">
			<TimeLineGeneratorForm />
		</div>
	);
}
