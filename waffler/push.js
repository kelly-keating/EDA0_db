const {getAssignments} = require('./assignments')
const getStudent = require('./students')
const {postAssignments} = require('./post')

function push ({sprint, cohort, github_name}) {
  if (!process.env['WTR_ACCESS_TOKEN']) {
    console.error('Please set WTR_ACCESS_TOKEN')
    return
  }

  console.log('Getting assignments and student...')
  return new Promise(function(resolve, reject) {
    Promise.all([
      getAssignments(sprint),
      getStudent(cohort, github_name)
    ])
    .then(([assignments, student]) => {
      postAssignments(assignments, student, cohort)
        .then(msg => {
          console.log("push", msg);
          resolve(msg)
        })
    })
    .catch(reject)
  });
}

module.exports = push
