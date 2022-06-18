const moment = require('moment');

module.exports = async function(req, res, model){
  let name = req.body.name;
  let birthday = req.body.birthday;
  if(!name || !moment(birthday, "DD/MM/YYYY", true).isValid()){
    res.status(400).send("Name or Birthday is not valid").end();
    return;
  }
  try {
    let entry = await model.findOne({name: name}).exec();
    entry.birthday = req.body.birthday;
    await entry.save();
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}