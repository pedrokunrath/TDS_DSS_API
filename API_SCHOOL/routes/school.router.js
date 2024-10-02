const express = require('express');
const schoolController = require('../controller/school.controller');
const router = express.Router();

// Rotas para Alunos
router.get('/alunos', (req, res) => res.json(schoolController.getAllAlunos()));
router.get('/alunos/:id', (req, res) => {
    const aluno = schoolController.getAlunoById(req.params.id);
    aluno ? res.json(aluno) : res.status(404).json({ error: 'Aluno não encontrado' });
});
router.post('/alunos', (req, res) => {
    const novoAluno = schoolController.createAluno(req.body);
    res.status(201).json(novoAluno);
});
router.put('/alunos/:id', (req, res) => {
    const alunoAtualizado = schoolController.updateAluno(req.params.id, req.body);
    res.json(alunoAtualizado);
});
router.delete('/alunos/:id', (req, res) => {
    const alunoDeletado = schoolController.deleteAluno(req.params.id);
    alunoDeletado ? res.json(alunoDeletado) : res.status(404).json({ error: 'Aluno não encontrado' });
});

// Rotas para Professores
router.get('/professores', (req, res) => res.json(schoolController.getAllProfessores()));
router.get('/professores/:id', (req, res) => {
    const professor = schoolController.getProfessorById(req.params.id);
    professor ? res.json(professor) : res.status(404).json({ error: 'Professor não encontrado' });
});
router.post('/professores', (req, res) => {
    const novoProfessor = schoolController.createProfessor(req.body);
    res.status(201).json(novoProfessor);
});
router.put('/professores/:id', (req, res) => {
    const professorAtualizado = schoolController.updateProfessor(req.params.id, req.body);
    res.json(professorAtualizado);
});
router.delete('/professores/:id', (req, res) => {
    const professorDeletado = schoolController.deleteProfessor(req.params.id);
    professorDeletado ? res.json(professorDeletado) : res.status(404).json({ error: 'Professor não encontrado' });
});

// Rotas para Turmas
router.get('/turmas', (req, res) => res.json(schoolController.getAllTurmas()));
router.get('/turmas/:nome', (req, res) => {
    const turma = schoolController.getTurmaById(req.params.nome);
    turma ? res.json(turma) : res.status(404).json({ error: 'Turma não encontrada' });
});
router.post('/turmas', (req, res) => {
    const novaTurma = schoolController.createTurma(req.body);
    res.status(201).json(novaTurma);
});
router.put('/turmas/:nome', (req, res) => {
    const turmaAtualizada = schoolController.updateTurma(req.params.nome, req.body);
    res.json(turmaAtualizada);
});
router.delete('/turmas/:nome', (req, res) => {
    const turmaDeletada = schoolController.deleteTurma(req.params.nome);
    turmaDeletada ? res.json(turmaDeletada) : res.status(404).json({ error: 'Turma não encontrada' });
});

module.exports = router;
