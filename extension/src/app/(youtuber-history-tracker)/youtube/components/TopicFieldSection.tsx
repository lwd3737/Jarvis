import { ChangeEvent, MouseEvent, useState } from "react";
import FormFieldSection from "./FormFieldSection";

interface Props {
	addedKeywords: string[];
	onAddKeyword: (keyword: string) => void;
	onRemoveKeyword: () => void;
}

export default function TopicFieldSection(props: Props) {
	const [keyword, setKeyword] = useState<string>("");

	const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setKeyword(ev.target.value);
	};

	const isAddedKeywordEmpty = props.addedKeywords.length === 0;

	const handleAddKeyword = (e: MouseEvent) => {
		e.preventDefault();

		props.onAddKeyword(keyword);
	};

	const handleRemoveKeyword = (e: MouseEvent) => {
		e.preventDefault();

		props.onRemoveKeyword();
	};

	return (
		<FormFieldSection
			title="주제"
			fields={
				<fieldset className="border-gray-200 border border-solid rounded-lg h-[40px]">
					<input
						className="px-3 h-full text-[11px]"
						value={keyword}
						placeholder="키워드"
						disabled={!isAddedKeywordEmpty}
						onChange={handleKeywordChange}
					/>
					{isAddedKeywordEmpty ? (
						<button
							className="px-2 h-full font-bold text-[11px] text-gray-500 hover:text-gray-800"
							onClick={handleAddKeyword}
						>
							선택
						</button>
					) : (
						<button
							className="bg-[rgba(239,239,239,0.3)] px-2 h-full font-bold text-[11px] text-red-500 hover:text-red-800"
							onClick={handleRemoveKeyword}
						>
							취소
						</button>
					)}
				</fieldset>
			}
		/>
	);
}
