const path = require('path')

const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

//define path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex Cullen'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex Cullen'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Helps',
        name : 'Alex Cullen',
        text: 'Help yourself, fool.'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
       return res.send({error: 'You did not provide an address'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({error})
        }
    
         forecast(latitude, longitude, (error, conditions) => {
            if(error) {
                return res.send({error})
            }
            res.send({forecast: location, location: conditions})
        })
    }
    )})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({error: 'Error'})
    }
    req.query()
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) =>
{
    res.render('error' ,{
        title: '404',
        error: 'Help article not found',
        name: 'Alex'
    })
})
app.get('*', (req, res)=>
{
    res.render('error', {
        title: '404',
        error: 'Page not found',
        name: 'Alex'})
})


app.listen(port, () => {
    console.log('Server is up on ' + port)
})