"use client";
import TimeLine from "./components/TimeLine";

export default function Page() {
	return (
		<div className="flex w-full h-full gap-x-5">
			<div className="flex flex-col items-center bg-white shadow-xl px-2 py-3 rounded-xl w-[70px] h-fit">
				<button className="text-xs text-center text-gray-500 text-nowrap hover:text-black">
					더 보기
				</button>
			</div>
			<TimeLine />
		</div>
	);
}
