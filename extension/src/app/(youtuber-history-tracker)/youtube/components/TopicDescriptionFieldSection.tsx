import FormFieldSection from "./FormFieldSection";

interface Props {
	description: string;
	onChange: (description: string) => void;
}

export default function TopicDescriptionFieldSection(props: Props) {
	return (
		<FormFieldSection
			title="주제"
			field={
				<textarea
					className="w-full px-4 py-3 rounded-md bg-gray-50"
					name="topic-description"
					value={props.description}
					placeholder="주제에 대한 설명을 입력해주세요."
					onChange={(ev) => props.onChange(ev.target.value)}
				/>
			}
		/>
	);
}
