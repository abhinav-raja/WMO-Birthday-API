module.exports = async function(req, res, model){
  let name = req.body.name;
  if(!name){
    res.status(400).send("Name field blank").end();
    return;
  }
  try {
    let a = await model.deleteMany({
      name: name
    });
    if(a.deletedCount == 0){
      res.status(404).end();
      return;
    }
    res.status(200).end();
  } catch (err){
    console.log(err);
    res.status(500).end();
  }
}