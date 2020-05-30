const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

function removeDuplicates(originalArray, nameProperty) {
    var newArray = [];
    var objectProcess  = {};
    for(var i=0; i<originalArray.length ; i++){
        objectProcess[originalArray[i][nameProperty]] = originalArray[i];
    }
    for(var object in objectProcess) {
        newArray.push(objectProcess[object]);
    }
     return newArray;
}

//function productDetails(originalArray, productId){}

const controller = {
    root:(req,res) => {
        /*const newPrueba = {a:1,b:5124,c:5,d:613};
        for(i in newPrueba){
            console.log(newPrueba[i]);
        }*/
        var productsWithoutRepeat = removeDuplicates(products,'idArticle');
        res.render('tienda', { 
            title: 'Tienda - Emilse',
            titleContent:'Todos los productos',
            products:productsWithoutRepeat,
        }); 
        res.render('tienda',{
            products:products,
        });
    },
    
    filter:(req,res) => {
        const productsFilter = products.filter(product => req.params.type.includes(product.type.toLowerCase()));
        res.render('tienda',{
            title: 'Tienda - Emilse',
            titleContent: req.params.type[0].toUpperCase()+req.params.type.slice(1),
            products:removeDuplicates(productsFilter,'idArticle'),
        });
    },

    create:(req,res,next) => {
        res.send('productAdd');
    },

    store:(req,res) => {
        const newId = products[products.length-1].id + 1;
		const newProduct = {
			id:newId,
			idArticle: req.body.idArticle,
			gender: req.body.gender,
			cloth: req.body.cloth,
			type:req.body.type,
			image:[req.files[0].filename],
            talle:req.body.talle,
            colour: req.body.colour,
            print: req.body.print,
            unit: req.body.unit,
            price: req.body.price,
            priceDiscount: req.body.priceDiscount,
            fecha: req.body.fecha
		};

		const finalProduct = [...products,newProduct];
		fs.writeFileSync(productsFilePath,JSON.stringify(finalProduct, null, ' '));
		res.redirect('/products');
    },

    edit:(req,res) => {
        let idEdit = req.params.productId;
		let productEdit;
		products.forEach(product => {
			if(idEdit == product.id){
				productEdit=product;
			}
		});
		res.send('productAdd', {
			productEdit:productEdit,
			idEdit:idEdit,
		});
    },

    update: (req,res) => {
        let idEdit=req.params.productId;
		const newProducts = products.map(product =>{
			if(product.id == idEdit)
			{
                idArticle = req.body.idArticle;
                gender = req.body.gender;
                cloth = req.body.cloth;
                type = req.body.type;
                talle = req.body.talle;
                colour = req.body.colour;
                print = req.body.print;
                unit = req.body.unit;
                price = req.body.price;
                priceDiscount = req.body.priceDiscount;
                fecha = req.body.fecha;
			}
			return product;
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null, ' '));
		res.redirect('/products');
    },

    delete:(req,res) => {
        const idDelete = req.params.productId;
		let newID=1;
		const newProducts=products.filter(product =>{
			if(product.id != idDelete){
				product.id=newID;
				newID+=1;
				return product;
			}
        });
        
		fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null, ' '));
		res.redirect('/');
    },

    detail:(req,res) => {
        const idProduct = req.params.productId;
        const product = products.filter(product => {
            if(product.id == idProduct){
                productDetails = product;
            }
        });
        res.render('detalleProducto',  {productDetails:productDetails,}
        );
    },

}

module.exports = controller;