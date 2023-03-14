const router = require('express').Router()

const Person = require('../models/Person')

//CREATE
//rotas da API
router.post('/', async (req, res) => {
    //req.body
    const {name, salary, approved} = req.body

    if(!name){
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    if(!salary){
        res.status(422).json({ error: 'O salário é obrigatório!' })
        return
    }
    
    //cria objeto
    const person = {
        name,
        salary,
        approved
    }

    try{
        //criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
        
    }catch (error){
        res.status(500).json({error: error})
    }
})

//READ
router.get('/', async (req, res) => {
    try {
        // await vai esperar que todos os dados da colletion venham
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async(req, res) => {
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).message({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update (PUT, PATCH)
router.patch('/:id', async(req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    //cria objeto
    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).message({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Delete
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    if(!person){
        res.status(422).message({message: 'O usuário não foi encontrado!'})
        return
    }

    try {
        await Person.deleteOne({_id: id}, person)

        res.status(200).message({message: 'Usuário removido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router