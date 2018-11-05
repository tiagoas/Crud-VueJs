<template>
	<div id="app">
		<h1>Lista de Tarefas</h1>
 		<div>
			<p class="text-muted">Adicionar Tarefa</p>
			<div class="form-inline">
				<div class="form-group">
					<label>Título</label>
					<input  class="form-control" v-model="tarefaAtual.titulo" />
				</div>	
				<div class="form-group">
					<label>Descrição</label>
					<input class="form-control" v-model="tarefaAtual.descricao" />
				</div>
				<button class="btn btn-primary" v-if="!updateMode" v-on:click="save">Adicionar</button>
				<button class="btn btn-primary" v-if="updateMode" v-on:click="update">Atualizar</button>
				<button class="btn btn-danger" v-on:click="cancel">Cancelar</button>
			</div>
		</div>

		<br />
		<ul class="list-group">
			<item-lista v-for="tarefa in tarefas" 
				:tarefa="tarefa" :key="tarefa.id" 
				v-on:tarefa-update="wantUpdateTarefa"
				v-on:tarefa-removed="removeTarefa"/>
		</ul>
	</div>
</template>

<script>
	import Tarefa from "./model/tarefa";
	import TarefaService from "./service/tarefaService";
	import ItemLista from "./components/ItemLista.vue";

	let tarefaService = null;
	export default {
		data() {
			return {
				tarefas: [],
				tarefaAtual: new Tarefa(),
				updateMode: false
			}
		},
		mounted: function() {
			tarefaService = new TarefaService(this.$http)
			tarefaService.getAll(
				(tarefas) => this.tarefas = tarefas,
				 (error) => console.log(error));
			this.$on("update-tarefa", this.wantUpdateTarefa);
		},
		methods: {
			wantUpdateTarefa: function(idTarefa) {
				this.tarefaAtual = this.tarefas.filter((t) => t.id === idTarefa)[0];
				this.tarefaAntiga = this.tarefaAtual.clonar();
				this.updateMode = true;
			},
			removeTarefa: function(tarefa) {
				let id = this.tarefas.indexOf(tarefa);
				if (id > -1) {
				    this.tarefas.splice(id, 1);
				}
			},
			cancel: function (evt) {
				this.tarefaAtual.titulo = this.tarefaAntiga.titulo;
				this.tarefaAtual.descricao = this.tarefaAntiga.descricao;
				this.tarefaAtual = new Tarefa();
				this.updateMode = false;
			},
			save: function (evt) {
				let lastId = 0;
				if (this.tarefas.length > 0) {
					lastId = this.tarefas[this.tarefas.length - 1].id;
				}
				this.tarefaAtual.id = lastId + 1;

				tarefaService.insert(this.tarefaAtual,
					(novaTarefa) => {
						this.tarefaAtual = new Tarefa()
						this.tarefas.push(novaTarefa)
					},
					(error) => console.log("Error")
				);
			},
			update: function (evt) {
				tarefaService.update(this.tarefaAtual,
					(tarefaAtualizar) => {
						this.tarefaAtual = new Tarefa()
						this.updateMode = false
					},
					(error) => console.log("Error")
				);
			}
		}, components: {
			ItemLista
		}
	}

</script>

<style lang="css" scoped>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 200px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
