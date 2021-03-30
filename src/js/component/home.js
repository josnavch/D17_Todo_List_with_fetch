import React, { useState, useEffect } from "react";
import { string } from "prop-types";

let x = 0;
let url = "https://assets.breatheco.de/apis/fake/todos/user/josnavch";

//create your first component
export function Home() {
	const [todo, setTodo] = useState("");
	const [tareas, setTarea] = useState([{ label: "", done: false }]);

	let addTodo = "";

	const getList = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				setTarea(
					response.map((item, index) => {
						return item;
					})
				);
			});
	};

	const createList = () => {
		fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: []
		})
			.then(response => {
				return response;
			})
			.catch(err => {
				console.log(err);
			});
	};

	const updateList = () => {
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(tareas)
		})
			.then(response => {
				return response;
			})
			.catch(err => {
				console.log(err);
			});
	};

	function addTodos(event, item) {
		addTodo = event.target.value;
		if (event.key === "Enter") {
			if (addTodo) {
				setTarea(tareas.concat({ label: addTodo, done: false }));
				setTodo("");
			} else {
				alert("You must write something!");
			}
		}
		x = tareas.length;
	}

	function removeItem(i) {
		let newtareas = tareas.filter(item => item.label != i);
		x = newtareas.length;
		setTarea(newtareas);
	}

	updateList();

	useEffect(() => {
		getList();
	}, []);

	const TodosHTML = tareas.map((tarea, i) => {
		return (
			<li
				className="list-group-item"
				onClick={() => {
					removeItem(tarea.label);
				}}
				key={i}
				id={i}
				value={tarea.label}
				{...(x = tareas.length)}>
				{tarea.label}
			</li>
		);
	});

	return (
		<div className="list">
			<div className="text-center mt-5">
				<h1 className="titulo"> ToDos </h1>
			</div>
			<div className="text-center mt-5">
				<ul className="list-group list-group-flush">
					<input
						id="myInput"
						value={todo}
						placeholder="Enter your to do's"
						onChange={e => setTodo(e.target.value)}
						onKeyPress={e => addTodos(e, todo)}></input>
					<div>{TodosHTML}</div>
				</ul>
			</div>
			<div className="card-footer text-muted total">
				{" "}
				<strong> {x} items left</strong>
			</div>
		</div>
	);
}
