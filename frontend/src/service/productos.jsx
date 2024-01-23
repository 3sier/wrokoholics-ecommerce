export const fetchProductos = async (url) => {
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data;
	} catch (e) {
		return new Error(e);
	}
};
