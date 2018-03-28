var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j","gimme"));
var session = driver.session();

//TODO: set environment vatiable to test against apikey
exports.verifykey = function(apikey, fn) {
  //if apikey is good
  if (apikey === "123") {
  return fn(null, true);
}
  //if apikey is not good
  else {
  return fn(null, false);
}
}

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
var id = req.params.userid;
session
  .run('MATCH (n:User {id:"'+ id +'" }) RETURN n LIMIT 25')
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
	var id = req.body.userid;
session
  .run('CREATE (n:User {id: "'+ id + '"})')
.subscribe({
onCompleted: function () {
res.send("Added User " + id);
session.close();
},
onError: function (error) {
	console.log(error);
}

});
}

exports.addSong = function(req, res) {
	var title = req.body.title;
  var id = req.body.songid;
session
  .run('CREATE (n:Song {id: "'+ id + '",title:"'+title+'"})')
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
  var sid = req.body.songid;
  var uid = req.body.userid;
session
.run('MATCH (n:User),(m:Song)'
    + 'WHERE n.id = "' + uid + '" AND m.id = "' + sid + '"'
    + 'CREATE (n)-[1:LIKE]->(m)')
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

exports.unLikeMatch = function(req, res) {
  var sid = req.body.songid;
  var uid = req.body.userid;
session
.run('MATCH (n { id:"' + uid + '"})-[l:LIKE]->'
    + '({id:"' + sid + '"}) DELETE l' )
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
	var uid = req.params.id;
session
  .run('MATCH (n:User {id: "'+ uid + '"}) DELETE n')
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
	var users = "", n, songs = "";
	for (n in req.query.user) {
    if (n != 0) {
      users += ' OR '
    }
		users +='n.id= "'+req.query.user[n]+'"';
	}
  session
    .run('MATCH (n:User ) WHERE '+ users +
    ' WITH collect(n) as nodes '+
    "CALL algo.personalizedPageRank.stream(nodes, 'Page', 'LINKS', {weightProperty:'LIKE',iterations:20, dampingFactor:0.85})"+
    ' YIELD node , score MATCH(node:Song)'+
    ' RETURN node,node.title,score order by score desc limit 20')
    .then (function(result,summary) {
      result.records.forEach(function (record) {
        songs += record.get('node.title') + " ";
        console.log(record.get('node.title'));
    });
      res.send(songs);
      session.close();
    })
      .catch( function (error) {
        console.log(error);
      });
}
driver.close();
