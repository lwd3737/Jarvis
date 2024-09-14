import { formatDate } from "../utils";

interface Props {
	dates: string[];
}

export default function TimeLineBar(props: Props) {
	return (
		<div
			className="grid"
			style={{
				gridTemplateColumns: `repeat(${props.dates.length}, 1fr)`,
			}}
		>
			{props.dates.map((date, idx) => (
				<div key={idx}>
					<div className="flex justify-center bg-blue-400 h-[5px] w-full">
						<span className="inline-block w-[10px] h-[10px] mt-[-2.5px] rounded-full border-2 border-solid border-blue-400 bg-white"></span>
					</div>

					<div className="flex flex-col items-center p-2">
						<span className="">{formatDate(date)}</span>
					</div>
				</div>
			))}
		</div>
	);
}
