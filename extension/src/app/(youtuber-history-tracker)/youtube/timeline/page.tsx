"use client";
import useGenerateTimeLine from "./hooks/useGenerateTimeLine";

export default function Page() {
	const { isLoading, videos, isVideoStreaming, renderThumbnailImage } =
		useGenerateTimeLine();

	// const [shownVideoIdForDesc, setShownVideoIdForDesc] = useState<string | null>(
	// 	null,
	// );

	return (
		<div>
			<ul>
				{videos?.map((video, idx) => {
					const { id, title, description, thumbnailUrl, publishedAt } = video!;

					return (
						<li key={id}>
							{renderThumbnailImage(idx, thumbnailUrl!, title!)}
							<h2>{title}</h2>
							<p>{publishedAt}</p>
							<button
								className=""
								// onClick={() => setShownVideoIdForDesc(id!)}
							>
								{isVideoStreaming(idx) && isLoading
									? "상세 내용 생성 중..."
									: "상세 내용"}
							</button>
						</li>
					);
				})}
			</ul>

			{/* {shownVideoIdForDesc && (
				<dialog open={!!shownVideoIdForDesc}>
					<h1>{shownVideo?.title}</h1>
					<p>{shownVideo?.description}</p>
				</dialog>
			)} */}
		</div>
	);
}
