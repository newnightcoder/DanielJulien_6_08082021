import Sauce from "../models/Sauce.js";

export const getAll = async (req, res) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const getOne = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    console.log(sauce);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const addSauce = async (req, res) => {
  const test = JSON.parse(req.body.sauce);
  try {
    const sauce = {
      ...test,
      imgUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.originalname
      }`,
    };
    const newSauce = await Sauce.create(sauce);
    console.log("sauce ajoutée", newSauce);
    res.status(201).json({ message: "Nouvelle sauce ajoutée avec succès!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteSauce = async (req, res) => {
  try {
    const sauce = await Sauce.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Sauce supprimée!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
