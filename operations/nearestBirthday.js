const moment = require('moment');

module.exports = async function(req, res, model){
  let currTime = moment();
  let currYear = moment().format('YYYY');
  try {
    const entries = await model.find({}).exec();
    if(!entries.length){
      res
        .status(404)
        .send("No birthdays stored")
        .end();
      return;
    }
    let distances = entries
      .map(entry => {
      let dist = moment(entry.birthday)
        .set('year', currYear)
        .diff(currTime, 'days')
      if(dist < 0){
        dist += 365;
        if(currYear % 4  == 0 && currYear % 100 != 0){
          dist++;
        } 
      }
      return {
        name: entry.name, 
        distance: dist
      };
    })
      .sort((a, b) => a.distance > b.distance);
    let nearestBirthday = await model.findOne({
      name: distances[0].name
    });
    res.status(200).json({
      name: nearestBirthday.name,
      birthday: nearestBirthday.birthday
    }).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
}