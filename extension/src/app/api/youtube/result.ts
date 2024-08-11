import { NextResponse } from "next/server";

export type Result<T = any> = SuccessResult<T> | FailureResult;

type SuccessResult<T = any> = {
	data: T;
};

type FailureResult = {
	error: {
		message: string;
	};
};

// server side
export const createResponse = (data: any, status = 200) => {
	return NextResponse.json({ data }, { status });
};

export const createErrorResponse = (message: string, status = 500) => {
	return NextResponse.json({ error: { message } }, { status });
};

// client side
export const isSuccess = (result: Result): result is SuccessResult => {
	return result.hasOwnProperty("data");
};

export const isFailure = (result: Result): result is FailureResult => {
	return result.hasOwnProperty("error");
};
