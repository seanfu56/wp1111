// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from "../models/comment";

exports.GetCommentsByRestaurantId = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.restaurantId;
  /****************************************/
  // TODO Part III-3-a: find all comments to a restaurant

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }
  try {
    const comment = await Comment.find({ restaurantId: id });
    console.log(comment.length);
    res.status(200).send({ msg: "success", contents: comment });
  } catch (e) {
    res.status(403).send({ msg: "error", contents: [] });
  }
};

exports.CreateComment = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  //const body = req.body;
  const restaurantId = req.body.restaurantId;
  const name = req.body.name;
  const content = req.body.content;
  const rating = req.body.rating;
  try {
    const newComments = new Comment({
      restaurantId: restaurantId,
      name: name,
      content: content,
      rating: rating,
    });
    await newComments.save();
    res.status(200).send({
      msg: "success",
      contents: {
        restaurantId: restaurantId,
        name: name,
        content: content,
        rating: rating,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(403).send({ msg: "error" });
  }
  /****************************************/
  // TODO Part III-3-b: create a new comment to a restaurant
};
