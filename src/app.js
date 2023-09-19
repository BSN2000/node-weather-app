const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { error } = require('console')

const app = express()

const publicPath = path.join(__dirname,'../public/')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'Basavaprasa',
        age:12
    })
})

app.get('/help',(req,res)=>{
    res.render('help')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please specify an address for the search"
        })
    }
    geocode(req.query.address,(error,{name,lat,long}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat,long,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                name,
                address:req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('notfoundpage',{
        name:'Basavaprasa',
        age:12,
        errorMessage:'help Page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('notfoundpage',{
        name:'Basavaprasa',
        age:12,
        errorMessage:'Page not found'
    })
})

app.listen(8000,()=>{
    console.log("server started")
})