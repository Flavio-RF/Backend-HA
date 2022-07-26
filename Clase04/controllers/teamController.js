const mongoose = require("mongoose");
const Team = require("../models/Team");

const index = async (req, res) => {
  const order = req.query.order || "asc";
  const sortBy = req.query.sortBy || "code";
  const skip = Number(req.query.skip);
  const sortCriteria = {
    [sortBy]: order, // creamos una key en el objecto usando el valor de sortBy
  };
  const teams = await Team.find({}).sort(sortCriteria).skip(skip);
  res.json(teams);
};

const show = async (req, res) => {
  const team = await Team.findOne({ code: req.params.code });
  if (!team) {
    return res.status(404).json({
      error: "El equipo no existe.",
    });
  }
  res.json(team);
};

const store = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body); // OJO: Esto puede ser peligroso debido al "Mass Assignment".
    return res.status(201).json(newTeam);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Ocurrió un error al guardar el equipo.",
      });
    }
  }
};

const update = async (req, res) => {
  const teamUpdated = await Team.findOneAndUpdate({ code: req.params.code }, { ...req.body })
  if (!teamUpdated) {
    res.status(404).json({ error: "Error al actualizar el Team" })
  } else {
    res.status(200).json({ msg: "Team actualizado con exito", teamUpdated })
  }
};

const destroy = async (req, res) => {
  const teamBorrado = await Team.findOneAndDelete({ code: req.params.code })
  if (!teamBorrado) {
    return res.status(404).json({
      error: "El equipo no existe.",
    });
  } else {
    res.status(200).json({ msg: "El siguiente Team ha sido borrado.", teamBorrado });
  }
};

const addGoal = async (req, res) => {
  const team = await Team.findOneAndUpdate({ code: req.params.code },
    { $inc: { goals: 1 } }
  )
  team.goals++
  if (!team) {
    return res.status(404).json({
      error: "El equipo no existe.",
    });
  }
  res.status(200).json(team);
}

const subGoal = async (req, res) => {
  const team = await Team.findOneAndUpdate({ code: req.params.code },
    { $inc: { goals: -1 } }
  )
  team.goals--
  if (!team) {
    return res.status(404).json({
      error: "El equipo no existe.",
    });
  }
  res.status(200).json(team);
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  addGoal,
  subGoal
};
