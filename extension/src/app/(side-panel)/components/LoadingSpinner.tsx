import { useRef } from "react";

interface LoadingSpinnerProps {}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
	const ref = useRef<HTMLSpanElement>(null);

	return (
		<span
			ref={ref}
			className={`w-[100px] h-[100px] inline-block border-solid border-[10px] border-t-[10px] border-gray-100 border-t-blue-400 rounded-full animate-spin`}
		></span>
	);
}
