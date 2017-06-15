var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var messages = [
	{
		id: 0,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt pulvinar nunc non lacinia. Nam pharetra sodales enim, ac tempus lacus varius in. Duis blandit urna odio, tincidunt interdum neque facilisis eu.',
		owner: 'Tim'
	},
	{
		id: 1,
		text: 'Sed posuere scelerisque diam nec pretium. Suspendisse quis consequat leo, sed consequat quam. Aenean a nisl ex. Nullam varius orci at pharetra efficitur. Nullam pretium consectetur magna scelerisque pretium.',
		owner: 'Jane'
	}
];

var users = [
	{
		firstName: 'Ms Test', 
		email: 'test@test.me', 
		password: 'test', id: 0
	}
];

var dataAll = [
	{
		name: 'January',
		values: 120 
	},
	{
		name: 'February',
		values: 140
	},
	{
		name: 'March',
		values: 25
	},
	{
		name: 'April',
		values: 313
	},
	{
		name: 'May',
		values: 214
	},
	{
		name: 'June',
		values: 123
	}
];

app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
})

var api = express.Router();
var auth = express.Router();

api.get('/messages', (req, res) => {
	res.json(messages);
})

api.get('/messages/:user', (req, res) => {
	var user = req.params.user;
	var result = messages.filter(message => message.owner == user);
	res.json(result);
})

api.put('/messages/:id', (req, res) => {

	var id = req.params.id;
	messages = messages.filter(message => message.id == id);

	// update array object values
	messages[0]['owner'] = req.body.owner;
	messages[0]['text'] = req.body.text;

	res.json(messages)
	
})

api.delete('/messages/:id', (req, res) => {

	var id = req.params.id;
	messages = messages.filter(message => message.id != id );

	res.json(messages);

})

api.get('/dataAll', (req, res) => {
	res.json(dataAll);
})

api.post('/messages', (req, res) => {

	var msg = req.body;
		msg.id = (messages.length) + 1;
		msg.text = req.body.text;
		msg.owner = req.body.owner;

	messages.push(msg);
	res.json(msg);

})

api.get('/users/me', checkAuthenticated, (req,res) => {
    res.json(users[req.user]);
})

api.post('/users/me', checkAuthenticated, (req,res) => {
    var user = users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    res.json(user);
})

auth.post('/login', (req, res) => {

    var user = users.find(user => user.email == req.body.email);

    if (!user) {
        sendAuthError(res);
    }

    if (user.password == req.body.password) {
        sendToken(user, res);
    } else {
        sendAuthError(res);
    }

})

auth.post('/register', (req, res) => {

    var index = users.push(req.body) - 1;

    var user = users[index];
    user.id = index;

    sendToken(user, res);

})

function sendToken(user, res) {
    var token = jwt.sign(user.id, '123');
    res.json({ firstName: user.firstName, token });
}

function sendAuthError(res) {
    return res.json({ success: false, message: 'email or password incorrect' });
}

// checkAuthentıcated middleware that 
// is why has a next parameter
function checkAuthenticated(req, res, next) {
	if(!req.header('authorization')) {
		return res.status(401).send({ message: 'Unauthorized requested. Missing authentication header' });
	}

	var token = req.header('authorization').split(' ')[1];
	var payload = jwt.decode(token, 123);

	if(!payload) {
		return res.status(401).send({ message: 'Unauthorized requested. Authentication header invalid' });
	}

	req.user = payload;

	next();

}

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);