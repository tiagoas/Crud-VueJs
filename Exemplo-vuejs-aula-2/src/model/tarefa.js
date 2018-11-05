export default class Tarefa {
	
	static fromJson(json){
		return new Tarefa(json.id, json.titulo, json.descricao, json.terminada)
	}

    constructor(id = 0, titulo = "", descricao = "", terminada = false) {
		this.id = id;
		this.titulo = titulo;
		this.descricao = descricao;
		this.terminada = terminada;
	}

	toJson() {
		return {
			"id": this.id,
			"titulo": this.titulo,
			"descricao": this.descricao,
			"terminada": this.terminada
		}
	}

	terminar() {
		this.terminada = true;
	}

	clonar() {
		return new Tarefa(this.id, this.titulo, this.descricao, this.terminada)
	}
}