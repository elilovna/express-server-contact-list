import express from "express";
import bodyParser from "body-parser";
import ContactList from "./contactList";

const app = express()

const my_contact_list = new ContactList();

my_contact_list.add({
  name: "marco",
  phone: 42838188
})

my_contact_list.add({
  name: "frank",
  phone: 42838199
})

my_contact_list.add({
  name: "federica",
  phone: 42844159
})

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage

// Get all the contacts
app.get('/contacts', function (req, res) {
  if (req.query.name && req.query.name.length > 0) {
    const search_result = my_contact_list.searchBy("name", req.query.name);
    res.send(search_result);
  } else if (req.query.phone && req.query.phone.length > 0) {
    const search_result = my_contact_list.searchBy("phone", req.query.phone);
    res.send(search_result);
  } else {
    res.send(my_contact_list.getList());
  }
})

// Get one contact
app.get('/contacts/:id', function (req, res) {
  // TODO: need some validation
  res.send(my_contact_list.getList()[req.params.id]);
})

// create one contact
app.post('/contacts', function (req, res) {
  // TODO: create a new contact, we can use isValid method
  my_contact_list.add(req.body)
  res.send(my_contact_list.getList());
})

app.delete('/contacts/:id', function(req, res) {
  my_contact_list.removeById(req.params.id);
  res.send(my_contact_list.getList());
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})