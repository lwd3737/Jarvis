import { ReactNode } from "react";

interface Props {
	title: string;
	headRight?: ReactNode;
	fields: ReactNode;
}

export default function FormFieldSection(props: Props) {
	return (
		<section>
			<div className="flex justify-between">
				<h1 className="text-lg font-bold">{props.title}</h1>
				{props.headRight}
			</div>
			<hr />
			<div className="flex py-2 gap-x-3">{props.fields}</div>
		</section>
	);
}
