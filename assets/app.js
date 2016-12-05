var app = new Vue({
  el: '#app',
  data: {
    cep: '',
    bairro: '',
    localidade: '',
    logradouro: '',
    msg: '',
    isResult: false
  },
  watch: {
    cep: function(){
      this.msg = ''
      this.isResult = false
      if (this.cep.length == 8) {
        this.lookupCep()
      }
    }
  },
  methods: {
    lookupCep: _.debounce(function() {
      var app = this
      app.msg = "Procurando..."
      axios.get('http://viacep.com.br/ws/'+app.cep+'/json')
            .then(function (response) {
              console.log(response.data);
              if(response.data.erro){
                app.msg = "CEP inválido."
              } else {
                app.isResult = true
                app.bairro = response.data.bairro
                app.localidade=response.data.localidade + " - " + response.data.uf
                app.logradouro = response.data.logradouro
                if(response.data.complemento.length>0)
                  app.logradouro += ', '+ response.data.complemento
              }
            })
            .catch(function(error){
              app.msg="Erro ao obter CEP."
            })
    }, 500)
  }
})
