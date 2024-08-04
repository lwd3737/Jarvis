import {
	FormEventHandler,
	KeyboardEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { MessageAppendHelper } from "../components/ChatWindow";

export default function useMessageForm(input: { append: MessageAppendHelper }) {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(function onAutoResize() {
		const textareaEl = textareaRef.current;
		if (!textareaEl) {
			console.error(EXCEPTIONS.textareaElementNotExist);
			return;
		}

		const autoResize = () => {
			if (textareaEl.scrollHeight >= MAX_HEIGHT) {
				textareaEl.style.overflowY = "scroll";
			} else {
				textareaEl.style.height = "auto";
				textareaEl.style.height = `${textareaEl.scrollHeight}px`;
			}
		};

		textareaEl.addEventListener("input", autoResize);
		return () => textareaEl.removeEventListener("input", autoResize);
	}, []);

	const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

	useEffect(function toggleSubmitEnabledOnInput() {
		const el = textareaRef.current;
		if (!el) {
			console.error(EXCEPTIONS.textareaElementNotExist);
			return;
		}

		const toggleSubmitEnabled = () => {
			const textLength = el.value.length;
			if (textLength > 0) setSubmitEnabled(true);
			else setSubmitEnabled(false);
		};

		el.addEventListener("input", toggleSubmitEnabled);
		return () => el.removeEventListener("input", toggleSubmitEnabled);
	}, []);

	const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		(e) => {
			e.preventDefault();

			const formEl = formRef.current;
			if (!formEl) return;

			const formData = new FormData(formEl);
			const text = formData.get(MESSAGE_FORM_INPUT_ID);
			if (!text) return;

			input.append(text.toString());

			const textareaEl = textareaRef.current!;
			textareaEl.value = "";
			textareaEl.dispatchEvent(new Event("input"));

			setSubmitEnabled(false);
		},
		[input],
	);

	const triggerSubmit = useCallback(() => {
		if (!submitEnabled) return;

		const formEl = formRef.current!;
		const btnEl = submitButtonRef.current!;

		formEl.requestSubmit(btnEl);
	}, [submitEnabled]);

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
		(e) => {
			e.stopPropagation();

			if (e.code === "Enter" && !e.shiftKey) {
				e.preventDefault();
				e.repeat = false;

				// 크롬 브라우저에서 한국어로 입력할 때 2번 호출되는 버그 발생. 비동기로 처리하면 해결됨
				setTimeout(() => {
					triggerSubmit();
				}, 0);
			}
		},
		[triggerSubmit],
	);

	return {
		formRef,
		textareaRef,
		submitButtonRef,
		submitEnabled,
		onSubmit: handleSubmit,
		onKeyDown: handleKeyDown,
	};
}

const MAX_HEIGHT = 150;

const EXCEPTIONS = {
	textareaElementNotExist: "textarea element not exist",
};

export const MESSAGE_FORM_INPUT_ID = "text-prompt";
