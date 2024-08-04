type ArrowUpProps = {
	width?: number;
	height?: number;
	fill?: string;
};

export default function ArrowUpIcon(props: ArrowUpProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={props.height || 16}
			width={props.width || 12}
			viewBox="0 0 384 512"
			fill={props.fill}
		>
			<path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
		</svg>
	);
}
