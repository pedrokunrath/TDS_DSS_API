// /routes/school.router.js

const express = require('express');
const schoolController = require('../controller/school.controller');

const router = express.Router();

// Rotas para Alunos
router.get('/alunos', (req, res) => {
    res.json(schoolController.getAllAlunos());
});

router.get('/alunos/:id', (req, res) => {
    const aluno = schoolController.getAlunoById(req.params.id);
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

router.post('/alunos', (req, res) => {
    const novoAluno = schoolController.createAluno(req.body);
    res.status(201).json({ message: 'Aluno criado com sucesso', aluno: novoAluno });
});

router.put('/alunos/:id', (req, res) => {
    const alunoAtualizado = schoolController.updateAluno(req.params.id, req.body);
    res.json(alunoAtualizado);
});

router.delete('/alunos/:id', (req, res) => {
    const alunoDeletado = schoolController.deleteAluno(req.params.id);
    if (alunoDeletado) {
        res.json(alunoDeletado);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// Rotas para Professores
router.get('/professores', (req, res) => {
    res.json(schoolController.getAllProfessores());
});

router.get('/professores/:id', (req, res) => {
    const professor = schoolController.getProfessorById(req.params.id);
    if (professor) {
        res.json(professor);
    } else {
        res.status(404).send('Professor não encontrado');
    }
});

router.post('/professores', (req, res) => {
    const novoProfessor = schoolController.createProfessor(req.body);
    res.status(201).json({ message: 'Professor criado com sucesso', professor: novoProfessor });
});

router.put('/professores/:id', (req, res) => {
    const professorAtualizado = schoolController.updateProfessor(req.params.id, req.body);
    res.json(professorAtualizado);
});

router.delete('/professores/:id', (req, res) => {
    const professorDeletado = schoolController.deleteProfessor(req.params.id);
    if (professorDeletado) {
        res.json(professorDeletado);
    } else {
        res.status(404).send('Professor não encontrado');
    }
});

// Rotas para Turmas
router.get('/turmas', (req, res) => {
    res.json(schoolController.getAllTurmas());
});

router.get('/turmas/:id', (req, res) => {
    const turma = schoolController.getTurmaById(req.params.id);
    if (turma) {
        res.json(turma);
    } else {
        res.status(404).send('Turma não encontrada');
    }
});

router.post('/turmas', (req, res) => {
    const novaTurma = schoolController.createTurma(req.body);
    res.status(201).json({ message: 'Turma criada com sucesso', turma: novaTurma });
});

router.put('/turmas/:id', (req, res) => {
    const turmaAtualizada = schoolController.updateTurma(req.params.id, req.body);
    res.json(turmaAtualizada);
});

router.delete('/turmas/:id', (req, res) => {
    const turmaDeletada = schoolController.deleteTurma(req.params.id);
    if (turmaDeletada) {
        res.json(turmaDeletada);
    } else {
        res.status(404).send('Turma não encontrada');
    }
});

module.exports = router;
