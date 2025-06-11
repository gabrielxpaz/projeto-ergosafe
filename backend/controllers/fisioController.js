const Role = require("../models/Role");
const User = require("../models/User");
const Paciente = require("../models/Paciente");
const Dados = require("../models/Dados");
const session = require("express-session");

exports.pacientes = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    const patients = await Paciente.findAll({
        where: {
            UserId: userId,
        },
        raw: true,
    });

    console.log("Pacientes:", patients);
    res.render("fisio/pacientes", {
        layout: "fisio",
        user,
        patients,
    });
}

exports.paciente = async (req, res) => {
    const user = req.user;
    const patientId = req.params.id;
    const patient = await Paciente.findOne({
        where: {
            UserId: user.id,
            id: patientId,
        },
        raw: true,
    });
    const data = await Dados.findAll({
        where: {
            PacienteId: patientId
        },
        raw: true,
    })

    console.log("Dados do paciente:", data);
    console.log("------Paciente:", patient);
    res.render("fisio/paciente", {
        layout: "fisio",
        user,
        patient,
        dados: data
    });
}

exports.addPacienteScreen = (req, res) => {
    const user = req.user;
    console.log(user);
    res.render("fisio/createPaciente", {
        layout: "fisio",
        user,
        error: req.session.error || null,
    });
    console.log(user);
    req.session.error = null; // Clear the error after rendering
}

exports.addPaciente = async (req, res) => {
    const user = req.user;
    const { name, email, idade, userId  } = req.body;

    console.log("Dados recebidos:", req.body);

    Paciente.create({
        nome: name,
        email,
        idade,
        UserId: user.id, // Use the ID of the logged-in user
    })

    res.render("fisio/createPaciente", {
        layout: "fisio",
        user,
        success: "Paciente adicionado com sucesso!",
    });
}
