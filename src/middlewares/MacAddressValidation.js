const MacaddressValidation = (req, res, next) => {
  if (!req.body.macaddress) {
    return res.status(400).json({ error: "macaddress é obrigatório" });
  }

  next();
};

module.exports = MacaddressValidation;
