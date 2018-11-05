import Tarefa from "../model/tarefa"

export default class TarefaService {

	constructor(vueHttpResource) {
		this.http = vueHttpResource;
		this.baseUrl = "http://localhost:8080/tarefas" ;
	}

	get(id, tarefaCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let tarefa =  Tarefa.fromJson(response.body);
			tarefaCallback(tarefa);
		}
		return this.http.get(this.baseUrl + `/${id}`).then(defaultSuccessCallback, errorCallback);
	}

	getAll(tarefaCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let tarefas = response.body.map((tarefa) => Tarefa.fromJson(tarefa));
			tarefaCallback(tarefas)
		}
		return this.http.get(this.baseUrl).then(defaultSuccessCallback, errorCallback);
	}

	update(tarefa, finishedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let novaTarefa = Tarefa.fromJson(response.body)
			finishedCallback(novaTarefa)
		}
		return this.http
				.put(this.baseUrl + `/${tarefa.id}`,  tarefa.toJson())
				.then(defaultSuccessCallback, errorCallback);
	}

	insert(tarefa, insertedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let novaTarefa = Tarefa.fromJson(response.body)
			insertedCallback(novaTarefa)
		}
		return this.http
				.post(this.baseUrl,  tarefa.toJson())
				.then(defaultSuccessCallback, errorCallback);
	}

	remove(tarefa, finishedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			finishedCallback(response.body)
		}
		return this.http
				.delete(this.baseUrl + `/${tarefa.id}`)
				.then(defaultSuccessCallback, errorCallback);
	}

}
