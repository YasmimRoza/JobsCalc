const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) { 
    //Toda vez que ele entrar no site de projetos

    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }

    //total de horas por dia de cada JOB em progresso
    let jobTotalHours = 0

    //esta função irá atualizar alguns dados
    const updatedJobs = jobs.map((job) => {

      //ajustes no job
      const remaining = JobUtils.remainingDays(job);

      //if ternario, se for igual a zero então 'done'
      //se não 'progress'
      const status = remaining <= 0 ? "done" : "progress";

      //total de horas por dia de cada JOB em progress
      jobTotalHours = status === "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;

      //Somando a quantidade de status
      statusCount[status] += 1;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });
    
    //quantidade de horas que quero trabalhar dia(PROFILE)
    //MENOS 
    //quantidade de horas/dias de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};
 