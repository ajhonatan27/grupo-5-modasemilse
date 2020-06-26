const fs=require('fs');
const path=require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

let db = require('../database/models');

const controller = {
    root:(req,res)=>{
        res.render('index', { title: 'Modas Emilse | Inicio',session:req.session.userLoginSession});
    },
    
    search:(req,res)=>{
        console.log(req);
        
        db.Products.findAll({ where:{ type_cloth: req.query.keywords.toLowerCase(), size : 1}})
        .then(function(products){
                console.log(products)
                res.render('tienda',{
                    title:'Tienda - Emilse',
                    titleContent: 'Resultados de busqueda',
                    products:products,
                    session:req.session.userLoginSession
            })
        })
    },
    support : (req, res) =>{
        res.render('support', { title: 'Modas Emilse | Atención al cliente'});
    }
}

module.exports = controller;