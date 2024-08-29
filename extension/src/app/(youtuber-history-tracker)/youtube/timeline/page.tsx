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
						<li className="flex gap-x-5" key={id}>
							{renderThumbnailImage(idx, thumbnailUrl!, title!)}
							<div className="flex flex-col gap-y-1 w-[300px] h-[150px]">
								<h2 className="text-lg font-bold">{title}</h2>
								<p className="text-sm font-thin">{publishedAt}</p>
								<h3 className="text-[14px]">상세 설명</h3>
								<p
									className="flex-1 px-2 py-1 overflow-auto text-sm bg-gray-100 rounded-md"
									style={{ scrollbarWidth: "none" }}
								>
									{description}
								</p>
							</div>
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
