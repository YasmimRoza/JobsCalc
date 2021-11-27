module.exports =  {
    remainingDays(job){
      //ajustes no job
      //cálculo de tempo restante

      //contagem dos dias para o projeto
      //feito em milisegundos
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      //criando um objeto, transformando milisegundos em Data
      //, e essa data será um objeto
      //é uma função construtora
      const createdDate = new Date(job.created_at)

      //criando a data da validade do projeto
      //A função Number(), transforma o String da numeração do tipo numero
      //Ele pega o valor da data e acrescenta o total de dias
      //Exemplo: O projeto iniciou de 05, e terá de terminar em 20 dias
      // então o termino será no dia 25.
      const dueDay = createdDate.getDate() + Number(remainingDays);

      //necessario fazer calculo de subtração da data
      //esta constante quarda o valor da data em milisegundos
      //isso é preciso, pq o calculo so pode ser feito
      //em milisegundos
      const dueDateInMs = createdDate.setDate(dueDay) 

      //fazendo este calculo aqui e o guardando
      const timeDiffInMs = dueDateInMs - Date.now()

      //transformar milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24

      //aqui ele faz a transformação da data em milisegundos
      //para dias e o guarda 
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

      return dayDiff
      },
  
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]  
  }