<template>
	<li class="list-group-item">
		<div>
			<strong>{{ tarefa.titulo }}</strong>
			<br />
			<p>{{ tarefa.descricao }}</p>
		</div>
		<template v-if="!tarefa.terminada">
			<button class="btn btn-default btn-sm" v-on:click="terminarTarefa">
				Terminar
			</button>

			<button class="btn btn-success btn-sm" v-on:click="atualizarTarefa">
				Editar
			</button>
		</template>

		<template v-else>
			<label class="btn btn-default btn-sm">
				Terminada
			</label>
		</template>

		<button class="btn btn-danger btn-sm" v-on:click="removerTarefa">
			Remover
		</button>
	</li>
</template>

<script>
	import TarefaService from "../service/tarefaService.js"

	let tarefaService = null
	export default {
		data: function() {
			return {}
		},
		mounted: function(){
			tarefaService = new TarefaService(this.$http);
		},
		props: ["tarefa"],
		methods: {
			terminarTarefa: function(evt) {
				this.tarefa.terminada = true
				tarefaService.update(this.tarefa,
				 (novaTarefa) =>  console.log(novaTarefa), 
				 (error) => console.log(error))
			},
			atualizarTarefa: function(evt) {
				this.$emit("tarefa-update", this.tarefa.id);
			},
			removerTarefa: function(evt) {
				tarefaService.remove(this.tarefa,
				 (result) => this.$emit("tarefa-removed", this.tarefa), 
				 (error) => console.log(error))
			}
		},
	}

</script>

<style>
	
</style>