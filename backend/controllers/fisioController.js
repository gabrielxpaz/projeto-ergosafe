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
            sensorId: patientId
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

