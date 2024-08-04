"use client";
import { login } from "@/src/app/api/login/fetch";
import {
	ChangeEventHandler,
	FormEventHandler,
	useCallback,
	useState,
} from "react";
import useAuth from "../../../../hooks/useAuth";
import useStorage from "../../../../hooks/useStorage";

export default function LoginForm() {
	const auth = useAuth();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const storageService = useStorage();

	const handleEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		setEmail(e.currentTarget.value);
	}, []);

	const handlePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			setPassword(e.currentTarget.value);
		},
		[],
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (e) => {
			e.preventDefault();

			try {
				const { accessToken } = await login({ email, password });
				storageService?.set("accessToken", accessToken);
				auth?.login();
			} catch (err) {
				console.error(err);

				alert("Login failed");
			}
		},
		[auth, email, password, storageService],
	);

	return (
		<form
			className="flex flex-col items-center w-full gap-y-11"
			onSubmit={handleSubmit}
		>
			<h1 className="text-4xl font-bold">Login</h1>
			<div className="flex flex-col items-center w-full gap-y-7">
				<input
					className="w-full px-3 py-2 text-lg border border-gray-300 rounded-md "
					type="email"
					id="email"
					name="email"
					value={email}
					placeholder="이메일"
					onChange={handleEmail}
				/>
				<input
					className="w-full px-3 py-2 text-lg border border-gray-300 rounded-md"
					type="password"
					id="password"
					name="password"
					value={password}
					placeholder="비밀번호"
					autoComplete="current-password"
					onChange={handlePassword}
				/>
			</div>
			<button className="w-full py-2 text-lg font-bold text-white rounded-md bg-cyan-400">
				로그인
			</button>
		</form>
	);
}
