const TaskModel = require("../model/TaskModel");
const { isPast } = require("date-fns");

const TaskValidation = async (req, res, next) => {
  const { macaddress, title, description, type, when } = req.body;

  if (!macaddress) {
    return res.status(400).json({ error: "Macaddress obrigatório" });
  } else if (!type) {
    return res.status(400).json({ error: "Type obrigatório" });
  } else if (!title) {
    return res.status(400).json({ error: "Title obrigatório" });
  } else if (!description) {
    return res.status(400).json({ error: "Descrição obrigatório" });
  } else if (!when) {
    return res.status(400).json({ error: "Data/Hora obrigatório" });
  } else if (isPast(new Date(when))) {
    return res.status(400).json({ error: "Data não pode ser no passado." });
  } else {
    let exists;

    if (req.params.id) {
      exists = await TaskModel.findOne({
        _id: { $ne: req.params.id },
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    } else {
      exists = await TaskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    }

    if (exists) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa nesse dia e horário." });
    }
    next();
  }
};

module.exports = TaskValidation;
