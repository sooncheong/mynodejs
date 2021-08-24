const express = require('express')
const bodyParser = require('body-parser');
var multer = require('multer');

const app = express();
const upload = multer();
const port = 3000

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());

app.use('/assets', express.static('public'))

/**
 * Display OUTPUT AS STRING FOR root url path
 * http://localhost:3000/
 */
app.get('/', (request, response) => {

    response.send('Yeah!!')

})


/**
 * Display OUTPUT AS JSON STRING FORMAT 
 * URL: http://localhost:3000/info/json1
 */
app.get('/info/json1', function(request, response){
    console.log("Testing to display output for string in JSON Format");

    let message = {
        "data": [],
        "message": 'success'
    };

    response.status(200).json(message);
});


/**
 * DISPLAY ARRAY AS JSON STRING FORMAT
 * http://localhost:3000/info/json2
 */
app.get('/info/json2', function(request, response){

    console.log('Testing to display output for array in JSON Format');

    var data = [];
    data['name'] = "Soon Cheong";
    data['gender'] = "Male";

    let message = {
        "data": data['name'],
        "message": 'success'
    };

    response.status(200).json(message);

});


app.get('/user/hee', function (request, response){
    //response.send('Yeah, i am !!')
    console.log('Display before End')
    //response.status(500).send('Something broke!')
    //response.status(500).json('Something broke!')
    let sOutput1 = {
        "data": "hee", 
        "message":"success"
    };

    var arrOutput2 = [ "John", "Peter", "Sally", "Jane" ];
    //response.json(sOutput1)
    //response.json(sOutput1)
    response.json({ username: 'Flavio123' })
    //response.redirect('https://www.sph.com.sg')
})

app.get('/user/:userId/books/:bookId', function (request, response){
    response.send(request.params)
})


/**
 * Test array map
 * URL: http://localhost:3000/info/map
 */
app.post('/info/map', function(request, response){

    let response1 = { errors: null, data:null};
    let badgeData = JSON.parse(request.body.badges);
    const sweetArray = [{ value: 'Soon', label: 'Cheong' }];
    
    console.log("Testing Array Map ", sweetArray, typeof sweetArray);
    
    let allBadgeData = badgeData.map(function(val){ 
        //console.log("Value", val, typeof val);
        return {label: val['label'], type:val['value']}; 
    });

    if(allBadgeData.length > 0){
        response1.data = allBadgeData;
    }else{
        response1.errors = "Badges is required!";
    }

    //return response1;

    
    let message = {
        "data": allBadgeData,
        "message": 'success'
    };
    
    response.status(200).json(response1);
    
});


app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)

})