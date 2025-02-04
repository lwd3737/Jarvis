"use client";
import Image from "next/image";
import logoImg from "/public/images/logo.png";
import useAuth from "@/hooks/useAuth";

type HeaderProps = {
	height: string;
};

export default function Header(props: HeaderProps) {
	const auth = useAuth();

	return (
		<header
			className={`flex justify-center items-center h-[${props.height}] py-3`}
		>
			<h1>
				<Image src={logoImg} alt="logo" width={35} height={35} />
			</h1>
			{auth?.isLogined && (
				<button
					className="right-5 absolute text-gray-500 text-sm"
					onClick={() => auth?.logout()}
				>
					Logout
				</button>
			)}
		</header>
	);
}
