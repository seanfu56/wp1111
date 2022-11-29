// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from "../models/info";

exports.GetSearch = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const priceFilter = req.query.priceFilter;
  const mealFilter = req.query.mealFilter;
  const typeFilter = req.query.typeFilter;
  const sortBy = req.query.sortBy;
  /****************************************/

  // NOTE Hint:
  // use `db.collection.find({condition}).exec(err, data) {...}`
  // When success,
  //   do `res.status(200).send({ message: 'success', contents: ... })`
  // When fail,
  //   do `res.status(403).send({ message: 'error', contents: ... })`

  // TODO Part I-3-a: find the information to all restaurants
  try {
    const data = await Info.find({});
    //console.log(priceFilter, mealFilter, typeFilter);
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    //pricefilter
    let newdata = data;
    if (priceFilter !== undefined) {
      newdata = newdata.filter((e) => {
        return priceFilter.includes(`${e.price}`);
      });
    }
    // console.log(newdata);

    //mealfilter
    if (mealFilter !== undefined) {
      newdata = newdata.filter((e) => {
        //console.log(e.tag);
        for (let i = 0; i < e.tag.length; i++) {
          const t = e.tag[i];
          if (mealFilter.includes(t)) {
            return true;
          }
        }
        return false;
      });
    }

    //typefilter
    if (typeFilter !== undefined) {
      newdata = newdata.filter((e) => {
        for (let i = 0; i < e.tag.length; i++) {
          const t = e.tag[i];
          if (typeFilter.includes(t)) {
            return true;
          }
        }
        return false;
      });
    }

    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
    //sort
    newdata.sort((x, y) => {
      if (sortBy === "price") {
        if (x.price >= y.price) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (x.distance >= y.distance) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    // console.log(newdata);
    res.status(200).send({ message: "success", contents: newdata });
  } catch (e) {
    res.status(403).send({ message: "error", contents: e.message });
  }
};

exports.GetInfo = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.id;
  try {
    const data = await Info.findOne({
      id: id,
    });
    console.log(data);
    res.status(200).send({ message: "success", contents: data });
  } catch (e) {
    res.status(403).send({ message: "error", contents: e.message });
  }

  /****************************************/

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }

  // TODO Part III-2: find the information to the restaurant with the id that the user requests
};
