var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j","gimme"));
var session = driver.session();

exports.showUsers = function(req, res) {
var user = "";
session
  .run('MATCH (n:User) RETURN n, n.name LIMIT 25')
  .then (function(result,summary) {
    result.records.forEach(function (record) {
      user += record.get('n.name') + " ";
      console.log(record.get('n'));
  });
    res.send(user);
    session.close();
  })
    .catch( function (error) {
      console.log(error);
    });
  }

exports.findUser = function(req, res) {
var name = req.params.name;
session
  .run('MATCH (n:User {name:"'+ name +'" }) RETURN n LIMIT 25')
  .subscribe({
    onNext: function (record) {
      user = record.get('n');
      console.log(user);
    },
    onCompleted: function () {
	    res.json(user);
      session.close();
    },
    onError: function (error) {
      console.log(error);
    }
  });
}

exports.addUser = function(req, res) {
	var name = req.body.name;
session
  .run('CREATE ('+ name + ':User {name: "'+ name + '"})')
.subscribe({
onCompleted: function () {
res.send("Added User");
session.close();
},
onError: function (error) {
	console.log(error);
}

});
}

exports.addSong = function(req, res) {
	var title = req.body.title;
session
  .run('CREATE ('+ title + ':Title {title: "'+ title + '"})')
.subscribe({
onCompleted: function () {
res.send("Added Song");
session.close();
},
onError: function (error) {
	console.log(error);
}

});
}

exports.likeMatch = function(req, res) {
  var title = req.body.title;
  var name = req.body.name;
session
.run('MATCH (' + name + ':User),(' + title + ':Title)'
    + ' WHERE ' + name + '.name = "' + name + '" AND '
    +           title + '.title = "' + title + '"'
    + ' CREATE (' + name +')-[l:LIKE]->(' + title +')')
.subscribe({
onCompleted: function () {
res.send("task complete");
session.close();
},
onError: function (error) {
	console.log(error);
}

});
}


exports.deleteUser = function(req, res) {
	var name = req.params.name;
session
  .run('MATCH (n:User {name: "'+ name + '"}) DELETE n')
.subscribe({
onCompleted: function () {
res.send("Deleted User");
session.close();
},
onError: function (error) {
	console.log(error);
}

});
}


//parses the query for user ids
//TODO: send cypher statement to Neo4j that takes ids as input for procedure
exports.recommend = function(req,res) {
	var list = "";
	var n;
	for (n in req.query) {
		list += req.query[n] + " ";
	}
	res.send(list);
}
driver.close();
