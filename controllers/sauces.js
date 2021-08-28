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
    console.log("findOne sauce", sauce);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const addSauce = async (req, res) => {
  try {
    const sauce = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
    console.log("file", req.file);
    const newSauce = await Sauce.create(sauce);
    console.log("sauce ajoutée", newSauce);
    res.status(201).json({ message: "Nouvelle sauce ajoutée avec succès!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateSauce = async (req, res) => {
  const sauceObject = req.file
    ? // to check if user modifies the image file or just the text (req.body)
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : req.body;

  try {
    await Sauce.updateOne({ _id: req.params.id }, sauceObject);
    res.status(200).json({ message: "Sauce modifiée avec succès!" });
  } catch (error) {
    console.log("erreur update", error.message);
    res.status(500).json({ error });
  }
};

export const handleLike = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    const alreadyLiked = sauce.usersLiked.find((id) => id === req.body.userId);
    const alreadyDisliked = sauce.usersDisliked.find(
      (id) => id === req.body.userId
    );

    if (alreadyLiked) {
      req.body.like = 0;
      sauce.likes -= 1;
      let index;
      for (let i = 0; i <= sauce.usersLiked.length; i++) {
        if (req.body.userId === sauce.usersLiked[i]) {
          index = i;
        }
      }
      sauce.usersLiked.splice(index, 1);
    }
    if (alreadyDisliked) {
      req.body.like = 0;
      sauce.dislikes -= 1;
      let index;
      for (let i = 0; i <= sauce.usersDisliked.length; i++) {
        if (req.body.userId === sauce.usersDisliked[i]) {
          index = i;
        }
      }
      sauce.usersDisliked.splice(index, 1);
    }

    switch (req.body.like) {
      case 1:
        sauce.likes += 1;
        sauce.usersLiked.push(req.body.userId);
        break;
      case -1:
        sauce.dislikes += 1;
        sauce.usersDisliked.push(req.body.userId);
        break;
      default:
        break;
    }

    // if (req.body.like === 1) {
    //   if (!sauce.usersLiked.find((id) => id === req.body.userId)) {
    //     // sauce.likes += 1;
    //     // sauce.usersLiked.push(req.body.userId);
    //     console.log("sauce pas encore votée");
    //   } else console.log("sauce déjà votée");
    // }
    // else if (req.body.like === -1) {
    //   if (!sauce.usersDisliked.find((id) => id === req.body.userId)) {
    //     sauce.dislikes++;
    //     sauce.usersLiked.push(req.body.userId);
    //   } else return;
    // } else if (req.body.like === 0) {
    //   if (sauce.usersDisliked.find((id, i) => id === req.body.userId)) {
    //     const index = i;
    //     sauce.dislikes -= 1;
    //     sauce.usersDisliked.splice(index, req.body.userId);
    //   } else if (sauce.usersLiked.find((id, i) => id === req.body.userId)) {
    //     const index = i;
    //     sauce.likes -= 1;
    //     sauce.usersLiked.splice(index, req.body.userId);
    //   }
    // }

    await sauce.save();
    console.log("liked/disliked sauce", sauce);
    res.status(200).json({ userId: req.body.userId, like: req.body.like });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteSauce = async (req, res) => {
  try {
    await Sauce.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Sauce supprimée!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
