const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {

				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZsbLfkpfZWb6yQaNA7W_YVQ1GxTZgA-qyKWjVislxXXxfZkWuJjUsO5PrvOQV8j390l-iX28cOCDtyZ09yC7YspqP_jQnj09ciCxJHwHjV-afnkqtjXtp_UM0nARvKQtHBSdJ8tVMnhY6NNotLqec32QXT8ItLWFTzk963XEuTdWpvXIJTnbVay8OboQE8KDbahAGkUFOqewCBm1lgCR-qSIokXoIuBtHVmRKpiFE9i8XjwuemIK9oQ76MoFD5QahvQMN-jd8uFL3spq153s1egGzobiL0xJdtOLVY2KRnNmS42jxYlJyKXfsFfwbutLIUsbX-xuVm6y4qibyRko7rxpFn8yxkHj0M3BpVt9Qq9KOJ3uyEFGZJQwB0M5884cJK4vnXvNyUAZKSElr8x5VSCZuAml3pat3Odj0NV32mDRkiWEA7iR6OiOlhbC8e_uU39tpNWld8AcWvrFhA55jEAuiipcrxhMe9jw-dzuDxUmFdYCgJNHcog93Ok9A4KLtjE7BExsgXhW5vNJYYw3T1nLyWhtzxlLWiFFgAXYA7ZVkad0twa05_rkmXafeusbpRCGPBG7k-pfO3cUApcTzjn0DKeGdl3TC1R69v_-SDVNq5KzgPMzc7Gbobqh8ppgIGmb6L4P1HW0STVTBldreI2yn-SsE2qtY4KzAa0GIZuM70y53tABshuMfDytRKlPvsbwRVWiKIWbhv90FWpURSyJtyHfp0j2MgAdVB06ShOw4rwJxwqdsqsj7u7HDpWiemcZBiwORiyNHsKDIQzDuR5zrrGdPGYMnyDyRv1j-7ZsDZCxipbnSkdAuyCMIE9o6g3Oo-Gd5TYjCxQ8Q-QXWUXtpOJWMz2hE2gQUClwqeY2DCvyNT_JxHDmS6Uj7Y70CBHRcQCpyUfyxX0r1bsEjGm4lZwJlHwuzd-3wMZLLs5NZyLcF6qL8-lsCV6pHcQC0iojbXwRqhs5WP6unwj1nJb");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch("https://cautious-xylophone-r4r546xv7rr4c5p59-3001.app.github.dev/api/login", requestOptions);
					const result = await response.json();
					if (response.status === 200) {
						localStorage.setItem("token", result.access_token)
						
						return true
					}

					console.log(result)
				} catch (error) {
					console.error(error);
				};
			},

			getFavorite: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch("https://cautious-xylophone-r4r546xv7rr4c5p59-3001.app.github.dev/api/favorite", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const result = await response.json();
					console.log(result)
				} catch (error) {
					console.error(error);
				};
			},

			verifyToken: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch("https://cautious-xylophone-r4r546xv7rr4c5p59-3001.app.github.dev/api/favorite", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const result = await response.json();

					if (response.status !== 200) {
						setStore({auth:result.valid})
					}
					setStore({auth:result.valid})
				} catch (error) {
					console.error(error);
				};
			},

		},
		logout: () => {
			//borrar el token del localStorage
		},
		getMessage: async () => {
			try {
				// fetching data from the backend
				const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				const data = await resp.json()
				setStore({ message: data.message })
				// don't forget to return something, that is how the async resolves
				return data;
			} catch (error) {
				console.log("Error loading message from backend", error)
			}
		},
		changeColor: (index, color) => {
			//get the store
			const store = getStore();

			//we have to loop the entire demo array to look for the respective index
			//and change its color
			const demo = store.demo.map((elm, i) => {
				if (i === index) elm.background = color;
				return elm;
			});

			//reset the global store
			setStore({ demo: demo });
		}
	}
};


export default getState;
