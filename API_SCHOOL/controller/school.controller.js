const alunos = require('../models/alunos.model');
const professores = require('../models/professor.model');
const turmas = require('../models/turma.model');

// Funções para Alunos
exports.getAllAlunos = () => alunos;

exports.getAlunoById = (id) => alunos.find(aluno => aluno.id === parseInt(id));

exports.createAluno = (aluno) => {
    aluno.id = alunos.length + 1;
    alunos.push(aluno);
    return aluno;
};

exports.updateAluno = (id, alunoAtualizado) => {
    let aluno = alunos.find(a => a.id === parseInt(id));
    if (aluno) Object.assign(aluno, alunoAtualizado);
    return aluno;
};

exports.deleteAluno = (id) => {
    const index = alunos.findIndex(aluno => aluno.id === parseInt(id));
    if (index > -1) return alunos.splice(index, 1)[0];
    return null;
};

// Funções para Professores (seguem o mesmo padrão que para Alunos)
exports.getAllProfessores = () => professores;
exports.getProfessorById = (id) => professores.find(prof => prof.id === parseInt(id));
exports.createProfessor = (professor) => {
    professor.id = professores.length + 1;
    professores.push(professor);
    return professor;
};
exports.updateProfessor = (id, professorAtualizado) => {
    let professor = professores.find(p => p.id === parseInt(id));
    if (professor) Object.assign(professor, professorAtualizado);
    return professor;
};
exports.deleteProfessor = (id) => {
    const index = professores.findIndex(prof => prof.id === parseInt(id));
    if (index > -1) return professores.splice(index, 1)[0];
    return null;
};

// Funções para Turmas (seguem o mesmo padrão)
exports.getAllTurmas = () => turmas;
exports.getTurmaById = (nome) => turmas.find(turma => turma.nome === nome);
exports.createTurma = (turma) => {
    turmas.push(turma);
    return turma;
};
exports.updateTurma = (nome, turmaAtualizada) => {
    let turma = turmas.find(t => t.nome === nome);
    if (turma) Object.assign(turma, turmaAtualizada);
    return turma;
};
exports.deleteTurma = (nome) => {
    const index = turmas.findIndex(turma => turma.nome === nome);
    if (index > -1) return turmas.splice(index, 1)[0];
    return null;
};
