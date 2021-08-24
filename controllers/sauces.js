import Sauce from "../models/Sauce.js";

export const getAll = async (req, res) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const addSauce = async (req, res) => {
  const test = JSON.parse(req.body.sauce);
  try {
    const sauce = {
      ...test,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };

    const newSauce = await Sauce.create(sauce);
    console.log("sauce ajoutée", newSauce);
    res.status(201).json({ message: "Nouvelle sauce ajoutée avec succès!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
