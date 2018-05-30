//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Component = require('../../models/Component');

router.get('/', function(req, res){
  res.render('index')
});

// adding component
router.route('/addComponent').post(function(req,res) {
  var component = new Component();

  // get default values and add with those values
  component.name = req.body.componentName;
  component.system = {  
    init6: [{delay: 500, iteration: 1}],
    reboot: [{delay: 300, iteration: 2}]
  }
  component.protocol = {
    radius: [{interface: "ctrl0", port: "2231"}]
  }
  component.interfaces = {
    packetDelay: [{interface: "eth1", delay: 500}],
    packetLoss: [{interface: "eth2", delay: 300}]
  }
  component.save(function(err) {
    if (err)
      res.send(err);
    res.send('Component successfully added!');
  });
})

router.route('/deleteComponent').post((req, res) => {
  var componentName = req.body.componentName;
  var query = Component.remove({name: componentName});
  query.exec((err, component) => {
    if(err) handleError(err);
    res.send("Component Successfully deleted") 
  })
})

router.route('/update').post(function(req, res) {
  const doc = {
  description: req.body.description,
  amount: req.body.amount,
  month: req.body.month,
  year: req.body.year
  };
  console.log(doc);
  Component.update({_id: req.body._id}, doc, function(err, result) {
    if (err)
      res.send(err);
    res.send('Component successfully updated!');
  });
});

router.get('/delete', function(req, res){
 var id = req.query.id;
 Component.find({_id: id}).remove().exec(function(err, component) {
  if(err)
    res.send(err)
  res.send('Component successfully deleted!');
  })
});

router.get('/getAll',function(req, res) {
  var query = Component.find();
  query.exec(function(err, new_instance){
    if(err) return handleError(err)
    res.send(new_instance)
  })  
});

module.exports = router;