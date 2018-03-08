const express = require('express')
const bodyParser = require ('body-parser')
const appClase = express()

appClase.use(bodyParser.urlencoded({extended: false}))
appClase.use(bodyParser.json())

var persona = {
	_cedula: '12231240',
	_edad: 20,
	_nombre : 'Jose Ramiro Ramirez Ramirez'
	
};

var profesor = Object.create(persona);
profesor._contrato = 'indefinido';
profesor._materia = 'Ciencias Sociales De La Sociedad Social :v'


var estudiante = Object.create(persona);
estudiante._carrera = 'ing social';
estudiante._suenosYaspiraciones = 'graduarse';

var personas = [
	{_cedula:'32118885', _edad:40, _nombre:'Carlos Gaviria'},
	{_cedula: '5866942', _edad:15, _nombre:'Mario Benedetti' }
];

var profesores = [
	{_cedula:'22585', _edad:35, _nombre:'Carlos De los Rios', _contrato:'indefinido', _materia:'Fundamentos de sistemas'},
	{_cedula:'11213', _edad:50, _nombre:'Bernardo Arenas', _contrato:'indefinido', _materia:'Fisica Mecanica'}
];

var estudiantes = [
	{_cedula:'32252245', _edad:20, _nombre:'Aquiles Brinco', _carrera:'Ing de sistemas', _suenosYaspiraciones:'graduarse alguna vez de la udea'},
	{_cedula:'1000002302', _edad:18, _nombre:'Mariana Rendon', _carrera:'Ing civil', _suenosYaspiraciones:'graduarse en 5 años de la udea...'}
];

//get
appClase.get('/persona', (req,res) => res.send({
	personas: [personas]
}))

appClase.get('/profesor', (req,res) => res.send({
profesores: [profesores]
}))

appClase.get('/estudiante', (req,res) => res.send({
estudiantes: [estudiantes]
}))

//post
appClase.post('/persona', (req,res) => {
	console.log(req.body);
	var bodyPost = req.body;
	var newPerson = Object.create(persona);
	newPerson._cedula = bodyPost._cedula;
	newPerson._edad = bodyPost._edad;
	newPerson._nombre = bodyPost._nombre;
	personas.push(newPerson);
	res.status(200).send({
		message: 'La persona se ha recibido'
	})
})

appClase.post('/profesor', (req,res) => {
	console.log(req.body);
	var bodyPost = req.body;
	var newProfesor = Object.create(profesor);
	newProfesor._cedula = bodyPost._cedula;
	newProfesor._edad = bodyPost._edad;
	newProfesor._nombre = bodyPost._nombre;

	newProfesor._contrato= bodyPost._contrato;
	newProfesor._materia = bodyPost._materia;

	profesores.push(newProfesor);
	res.status(200).send({
		message: 'El Profesor se ha recibido'
	})
})

appClase.post('/estudiante', (req,res) => {
	console.log(req.body);
	var bodyPost = req.body;
	var newEstudiante = Object.create(estudiante);
	newEstudiante._cedula = bodyPost._cedula;
	newEstudiante._edad = bodyPost._edad;
	newEstudiante._nombre = bodyPost._nombre;

	newEstudiante._carrera = bodyPost._carrera;
	newEstudiante._suenosYaspiraciones = bodyPost._sueñosYaspiraciones;

	estudiantes.push(newEstudiante);
	res.status(200).send({
		message: 'el estudiante se ha recibido'
	})
})

//delete
appClase.delete('/persona/', (req,res) => {
	personas = [];
	res.status(200).send({message: 'Todas las personas han sido eliminadas... misión cumplida Dr Malito'})
})

appClase.delete('/persona/:cedula', (req,res) => {
	let personaCed = req.params.cedula;

	var personaDelete = personas.findIndex( x => x._cedula == personaCed);
	if(personaDelete == -1 ){
		 res.status(404).send({message:'La persona no existe'});
	}

	personas.splice(personaDelete, 1);
	res.status(200).send({message: 'La persona ha sido eliminada... Hasta Nunca Baby'})
})

appClase.delete('/profesor/', (req,res) => {
	profesores = [];
	res.status(200).send({message: 'Todos los profesores han sido eliminadas... la ignoracia acaba con el mundo como lo conocemos... Uribe presidente del mundo :v'})
})

appClase.delete('/profesor/:cedula', (req,res) => {
	let profesorCed = req.params.cedula;

	var profesorDelete = profesores.findIndex( x => x._cedula == profesorCed);
	if(profesorDelete == -1 ){
		 res.status(404).send({message:'El profesor no existe'});
	}

	profesores.splice(profesorDelete, 1);
	res.status(200).send({message: 'El profesor ha sido eliminada... Por cuchilla!'})
})

appClase.delete('/estudiante/', (req,res) => {
	estudiantes = [];
	res.status(200).send({message: 'Todos los estudiantes han sido eliminadas... Los profesores se sienten desolados y se suicidan porque nos aman'})
})

appClase.delete('/estudiante/:cedula', (req,res) => {
	let estudianteCed = req.params.cedula;

	var estudianteDelete = estudiantes.findIndex( x => x._cedula == estudianteCed);
	if(estudianteDelete == -1 ){
		 res.status(404).send({message:'El estudiante no existe'});
	}

	estudiantes.splice(estudianteDelete, 1);
	res.status(200).send({message: 'El estudiante ha sido eliminada... Por vago! se mantenía en el aero'})
})


//put
appClase.put('/persona/:cedula', (req,res)=>{
	let cedulaPut = req.params.cedula;
	//var body = req.body;

	var personaPut = personas.findIndex(x => x._cedula == cedulaPut);
	if(personaPut == -1){
		res.status(404).send({message:'La persona no existe'});
	}

	personas[personaPut]._nombre = valor(req.body._nombre, personas[personaPut]._nombre);
	personas[personaPut]._cedula = valor(req.body._cedula, personas[personaPut]._cedula);
	personas[personaPut]._edad = valor(req.body._edad, personas[personaPut]._edad);

	res.status(200).send({message: 'Los datos de la persona han sido actualizados'})
})

appClase.put('/profesor/:cedula', (req,res)=>{
	let cedulaPut = req.params.cedula;
	//var body = req.body;

	var profesorPut = profesores.findIndex(x => x._cedula == cedulaPut);
	if(profesorPut == -1){
		res.status(404).send({message:'El profesor no existe'});
	}

	profesores[profesorPut]._nombre = valor(req.body._nombre, profesores[profesorPut]._nombre);
	profesores[profesorPut]._cedula = valor(req.body._cedula, profesores[profesorPut]._cedula);
	profesores[profesorPut]._edad = valor(req.body._edad, profesores[profesorPut]._edad);
	profesores[profesorPut]._materia = valor(req.body._materia, profesores[profesorPut]._materia);
	profesores[profesorPut]._contrato = valor(req.body._contrato, profesores[profesorPut]._contrato);


	res.status(200).send({message: 'Los datos del profesor han sido actualizados'})
})

appClase.put('/estudiante/:cedula', (req,res)=>{
	let cedulaPut = req.params.cedula;
	//var body = req.body;

	var estudiantePut = estudiantes.findIndex(x => x._cedula == cedulaPut);
	if(estudiantePut == -1){
		res.status(404).send({message:'El estudiante no existe'});
	}

	estudiantes[estudiantePut]._nombre = valor(req.body._nombre, estudiantes[estudiantePut]._nombre);
	estudiantes[estudiantePut]._cedula = valor(req.body._cedula, estudiantes[estudiantePut]._cedula);
	estudiantes[estudiantePut]._edad = valor(req.body._edad, estudiantes[estudiantePut]._edad);
	estudiantes[estudiantePut]._carrera = valor(req.body._carrera, estudiantes[estudiantePut]._carrera);
	estudiantes[estudiantePut]._suenosYaspiraciones = valor(req.body._suenosYaspiraciones, estudiantes[estudiantePut]._suenosYaspiraciones);


	res.status(200).send({message: 'Los datos del estudiante han sido actualizados'})
})



appClase.listen(3001, ()=> console.log('Escuchando el puerto 3001'))

function valor(x, y){
  return Boolean(x) ? x : y;
}
