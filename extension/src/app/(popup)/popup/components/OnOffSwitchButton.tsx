"use client";
import StorageService from "@/src/services/storage/storage.service";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "on";

export default function OnOffSwitchButton() {
	const storage = useMemo(() => new StorageService(), []);

	const [on, setOn] = useState<boolean>(false);

	useEffect(() => {
		storage.get(STORAGE_KEY).then((value: boolean) => {
			setOn(value);
		});
	}, [storage]);

	const handleToggle = () => {
		if (on) {
			setOn(false);
			storage.set(STORAGE_KEY, false);
		} else {
			setOn(true);
			storage.set(STORAGE_KEY, true);
		}
	};

	useEffect(
		function sendToContentScriptOnChanged() {
			chrome?.tabs?.query({}, function (tabs) {
				tabs.forEach((tab) => {
					if (tab.id)
						chrome.tabs.sendMessage(tab.id, { type: "on", payload: { on } });
				});
			});
		},
		[on],
	);

	const renderText = () => {
		return (
			<span
				className={`absolute pt-[3px] ${
					on ? "left-[7px]" : "right-[5px]"
				}  font-bold text-[11px] text-white`}
			>
				{on ? "ON" : "OFF"}
			</span>
		);
	};

	return (
		<button
			className={`relative flex items-center ${
				on ? "bg-green-300" : "bg-gray-200"
			}  px-1 border-non rounded-2xl w-[50px] h-[25px] transition-[background-color] duration-300`}
			onClick={handleToggle}
		>
			{renderText()}
			<span
				className={`absolute inline-block bg-white rounded-full w-[19px] h-[19px] transition-[left] duration-300`}
				style={{
					left: on
						? styles.container.width - styles.thumb.size - 2 + "px"
						: styles.container.padding + "px",
				}}
			></span>
		</button>
	);
}

const styles = {
	container: {
		width: 50,
		padding: 3,
	},
	thumb: {
		size: 19,
	},
};
