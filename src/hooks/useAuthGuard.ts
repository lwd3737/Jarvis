import { useRouter } from "next/navigation";
import { UnauthorizedException } from "../exceptions/unauthorize.exception";
import useAuth from "./useAuth";

export function useAuthGuard() {
	const router = useRouter();
	const auth = useAuth();

	return async (api: Function) => {
		try {
			return await api();
		} catch (err) {
			if (err instanceof UnauthorizedException) {
				console.log(err.message);

				auth?.logout();
				router.replace("/login");
			}
		}
	};
}
