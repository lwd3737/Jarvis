"use client";
import {
	DateRange as DateRangeComponent,
	Range,
	RangeKeyDict,
} from "react-date-range";
import FormFieldSection from "./FormFieldSection";
import { useState } from "react";

interface Props {
	range: DateRange;
	onChange: (range: DateRange) => void;
}
export interface DateRange {
	startDate: Date | undefined;
	endDate: Date | undefined;
}

export default function DateRangePicker(props: Props) {
	const [dateRange, setDateRange] = useState<Range>({
		...props.range,
		color: "#FFCCBC",
		key: "selection",
	});

	const onChange = (range: RangeKeyDict) => {
		setDateRange((prev) => ({ ...prev, ...range.selection }));
		props.onChange({
			startDate: range.selection.startDate,
			endDate: range.selection.endDate,
		});
	};

	return (
		<FormFieldSection
			title="날짜 범위"
			field={
				<DateRangeComponent
					ranges={[dateRange]}
					maxDate={new Date()}
					editableDateInputs
					onChange={onChange}
				/>
			}
		/>
	);
}
