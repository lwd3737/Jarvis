"use client";
import { login } from "@/app/api/login/fetch";
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
			className="flex flex-col items-center gap-y-11 w-full"
			onSubmit={handleSubmit}
		>
			<h1 className="font-bold text-4xl">Login</h1>
			<div className="flex flex-col items-center gap-y-7 w-full">
				<input
					className="border-gray-300 px-3 py-2 border rounded-md w-full text-lg"
					type="email"
					id="email"
					name="email"
					value={email}
					placeholder="이메일"
					onChange={handleEmail}
				/>
				<input
					className="border-gray-300 px-3 py-2 border rounded-md w-full text-lg"
					type="password"
					id="password"
					name="password"
					value={password}
					placeholder="비밀번호"
					autoComplete="current-password"
					onChange={handlePassword}
				/>
			</div>
			<button className="bg-cyan-400 py-2 rounded-md w-full font-bold text-lg text-white">
				로그인
			</button>
		</form>
	);
}
