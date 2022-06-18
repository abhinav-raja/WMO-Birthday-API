module.exports = async function(req, res, model){
  let name = req.body.name;
  if(!name){
    res.status(400).send("Name field blank").end();
    return;
  }
  try{
    let entry = await model.findOne({name: name});
    if(entry){
      res.status(200).send({
        name: entry.name,
        birthday: entry.birthday
      }).end();
    } else {
      res
        .status(404)
        .send(`Name ${name} not found in database`)
        .end();
    }
  } catch(err) {
    console.log(err);
    res.status(500).end();
  }
}