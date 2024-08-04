"use client";
import { memo } from "react";
import ArrowUpIcon from "./ArrowUpIcon";
import StopIcon from "./StopIcon";
import { MessageAppendHelper, MessageStopHelper } from "./ChatWindow";
import useMessageForm, { MESSAGE_FORM_INPUT_ID } from "../hooks/useMessageForm";

type MessageFormProps = {
	isLoading: boolean;
	append: MessageAppendHelper;
	stop: MessageStopHelper;
};

export default memo(function MessageForm(props: MessageFormProps) {
	const form = useMessageForm({
		append: props.append,
	});

	return (
		<form ref={form.formRef} className="px-5 py-3" onSubmit={form.onSubmit}>
			<div className="h-full px-[16px] py-[14px] bg-gray-100 rounded-3xl">
				<textarea
					className="w-full leading-[20px] text-[15px] bg-inherit resize-none outline-none"
					ref={form.textareaRef}
					name={MESSAGE_FORM_INPUT_ID}
					rows={1}
					wrap="hard"
					autoComplete="off"
					onKeyDown={form.onKeyDown}
				></textarea>
				<div className="flex justify-end">
					{props.isLoading ? (
						<button onClick={props.stop}>
							<StopIcon width={23} height={23} />
						</button>
					) : (
						<button
							ref={form.submitButtonRef}
							className={`p-1 rounded-md ${
								form.submitEnabled
									? "border-2 border-gray-600 border-solid"
									: "border-2 border-gray-300 border-solid"
							}`}
							type="submit"
							disabled={!form.submitEnabled}
						>
							<ArrowUpIcon
								width={13}
								height={13}
								fill={
									form.submitEnabled
										? "rgb(75 85 99 / var(--tw-border-opacity))"
										: "rgb(209 213 219 / var(--tw-border-opacity))"
								}
							/>
						</button>
					)}
				</div>
			</div>
		</form>
	);
});
