const cheerio = require('cheerio');
const request = require('request');

const phonesJSON = {
    'iphone': [],
    'samsung': [],
    'motorola': [],
    'xiaomi': [],
    'huawei':[], 
    'lg': []
}
//IPHONE
request('http://www.mgmstore.com.ar/Iphone%20Apple%20Celulares', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const iphone = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]   
        
        $('h2.product-name').each((i, element) => {
          
            iphone[i].marca = $(element).text().trim().slice(0,5)
            iphone[i].modelo = $(element).text().trim().slice(6)
        })
       
        $('div.product-images').each((i, element) => {
            iphone[i].imagen = [$(element).children().children().last().attr('src'), $(element).children().children().attr('src') ]
        
        })
        $('span.price').each((i, element) => {
            iphone[i].precio = $(element).text()
        })
        phonesJSON.iphone = iphone
       
        
       
    }
});
//SAMSUNG

request('http://www.mgmstore.com.ar/Celulares%20Samsung', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const samsung = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]    
        
        $('h2.product-name').each((i, element) => {
          
            samsung[i].marca = $(element).text().trim().slice(0,7)
            samsung[i].modelo = $(element).text().trim().slice(8)
        })
       
        $('div.product-images').each((i, element) => {
            samsung[i].imagen = [$(element).children().children().last().attr('src'), $(element).children().children().attr('src')]

        })
        $('span.price').each((i, element) => {
            samsung[i].precio = $(element).text()
        })
        phonesJSON.samsung = samsung
        
       
    }
});
//MOTOROLA
request('http://www.mgmstore.com.ar/Celulares%20Motorola', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const motorola = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]   
        
        $('h2.product-name').each((i, element) => {
          
            motorola[i].marca = $(element).text().trim().slice(0,8)
            motorola[i].modelo = $(element).text().trim().slice(9)
        })
       
        $('div.product-images').each((i, element) => {
            motorola[i].imagen = [$(element).children().children().last().attr('src'), $(element).children().children().attr('src')]
            
        })
        $('span.price').each((i, element) => {
            motorola[i].precio = $(element).text()
        })
        phonesJSON.motorola = motorola
       
        
        
       
    }
});
//XIAOMI
request('http://www.mgmstore.com.ar/index.php?route=product/category&path=137', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const xiaomi = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]   
        
        $('h2.product-name').each((i, element) => {
          
            xiaomi[i].marca = $(element).text().trim().slice(0,6)
            xiaomi[i].modelo = $(element).text().trim().slice(7)
        })
       
        $('div.product-images').each((i, element) => {
            xiaomi[i].imagen = [$(element).children().children().last().attr('src'), $(element).children().children().attr('src')]
        
        })
        $('span.price').each((i, element) => {
            xiaomi[i].precio = $(element).text()
        })
        phonesJSON.xiaomi = xiaomi
       
        
        
       
    }
   
});
//HUAWEI
request('http://www.mgmstore.com.ar/Celular-huawei', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const huawei = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]   
        
        $('h2.product-name').each((i, element) => {
          
            huawei[i].marca = $(element).text().trim().slice(0,6)
            huawei[i].modelo = $(element).text().trim().slice(7)
        })
       
        $('div.product-images').each((i, element) => {
            huawei[i].imagen = [$(element).children().children().last().attr('src'), $(element).children().children().attr('src')]
        
        })
        $('span.price').each((i, element) => {
            huawei[i].precio = $(element).text()
        })
        phonesJSON.huawei = huawei
    }
});
//LG
request('https://www.cetrogar.com.ar/tecnologia/celulares-accesorios/lg.html', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
       
        const lg = [{marca: '', modelo: '', imagen: '', precio: ''},{marca: '', modelo: '', imagen: '', precio: ''}]   
        
        $('h2.product-name').each((i, element) => {
          
            lg[i].marca = $(element).text().trim().slice(14,16)
            lg[i].modelo = $(element).text().trim().slice(16)
        })
       
        $('a.product-image').each((i, element) => {
            lg[i].imagen = [$(element).children().attr('src'), 'https://www.lg.com/de/images/handy/md05804350/gallery/large08.jpg']
        })
        $('span.regular-price').each((i, element) => {
            lg[i].precio = $(element).children().text().trim()
            lg[1].precio = '$9.799'
        })
        phonesJSON.lg = lg
    }
});

module.exports = {phonesJSON} 







