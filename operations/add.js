const moment = require('moment');

module.exports = async function(req, res, model) {
  let name = req.body.name;
  let birthday = req.body.birthday;
  if (!name || !moment(birthday, "DD/MM/YYYY", true).isValid()) {
    res.status(400).json({
      error: "Name or birthday is not valid"
    });
  }
  try {
    let a = await model.find({ name: name }, 'name birthday');
    if (a.length) {
      res.status(400).json({
        error: `User with name ${name} already exists in database`
      });
      return;
    }
    await model.create({
      name: name,
      birthday: birthday
    });
    console.log("Save successful");
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}