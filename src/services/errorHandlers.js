import { configureStore } from "../store"

const store = configureStore();

export const handleTokenErrors = response => {
	if (!response.success && response.status !== 200) {
		if (response.status === 401 && response.data.error.message === "jwt expired") {
			store.dispatch({ type: 'INVALID_TOKEN' });
		} 
	}
	return response
};
