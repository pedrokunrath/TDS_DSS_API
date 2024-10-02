// /controller/school.controller.js

let alunos = [
    { id: 1, nome: 'João', idade: 15, turma: '1A', email: 'ffnrueu@fnren.com' }
];

let professores = [
    { id: 1, nome: 'Maria', idade: 30, turma: '1A', email: 'maria@example.com' }
];

let turmas = [
    {
        nome: '1A',
        alunos: alunos,
        professores: professores
    }
];

// Funções para Alunos
function getAllAlunos() {
    return alunos;
}

function getAlunoById(id) {
    return alunos.find(aluno => aluno.id === parseInt(id));
}

function createAluno(aluno) {
    aluno.id = alunos.length + 1; // Define o ID automaticamente
    alunos.push(aluno);
    return aluno;
}

function updateAluno(id, alunoAtualizado) {
    let aluno = alunos.find(aluno => aluno.id === parseInt(id));
    if (aluno) {
        Object.assign(aluno, alunoAtualizado); // Atualiza o aluno com os novos dados
    }
    return aluno;
}

function deleteAluno(id) {
    const index = alunos.findIndex(aluno => aluno.id === parseInt(id));
    if (index > -1) {
        return alunos.splice(index, 1)[0]; // Remove e retorna o aluno deletado
    }
    return null;
}

// Funções para Professores
function getAllProfessores() {
    return professores;
}

function getProfessorById(id) {
    return professores.find(professor => professor.id === parseInt(id));
}

function createProfessor(professor) {
    professor.id = professores.length + 1;
    professores.push(professor);
    return professor;
}

function updateProfessor(id, professorAtualizado) {
    let professor = professores.find(professor => professor.id === parseInt(id));
    if (professor) {
        Object.assign(professor, professorAtualizado);
    }
    return professor;
}

function deleteProfessor(id) {
    const index = professores.findIndex(professor => professor.id === parseInt(id));
    if (index > -1) {
        return professores.splice(index, 1)[0];
    }
    return null;
}

// Funções para Turmas
function getAllTurmas() {
    return turmas;
}

function getTurmaById(id) {
    return turmas.find(turma => turma.nome === id);
}

function createTurma(turma) {
    turmas.push(turma);
    return turma;
}

function updateTurma(id, turmaAtualizada) {
    let turma = turmas.find(turma => turma.nome === id);
    if (turma) {
        Object.assign(turma, turmaAtualizada);
    }
    return turma;
}

function deleteTurma(id) {
    const index = turmas.findIndex(turma => turma.nome === id);
    if (index > -1) {
        return turmas.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    getAllAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,
    getAllProfessores,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    getAllTurmas,
    getTurmaById,
    createTurma,
    updateTurma,
    deleteTurma
};
