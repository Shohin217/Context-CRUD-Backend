const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

let nextPurchaseId = 1;
let purchases = [
    {id:nextPurchaseId++, category:'Авто', amount: 4000, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, eveniet.' },
    {id:nextPurchaseId++, category:'Еда', amount: 2500, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, eveniet.'},
    {id:nextPurchaseId++, category:'Путешествие', amount: 20300, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, eveniet.'},
];

const ERR_BAD_REQUEST = 'error.bad_request';
const ERR_NOT_FOUND = 'error.not_found';

server.get('/api/purchases', (req, res) => {
    setTimeout(()=>{
        res.send(purchases);
        // res.statusCode(404)
        // res.send()
    }, 1000)
});

server.get('/api/purchases/:id', (req, res)=>{
    setTimeout(() => {
        const {id} = req.params;
        const parsedId = parseInt(id, 10)
        if(isNaN(id)){
            res.statusCode = 400;
            res.send()
            return;
        }
        if(purchases.some( o => o.id == id)){
            // const[{description}]  = purchases.filter(o => o.id === parsedId)
            const description = purchases.filter(o=> o.id === parsedId)
            res.send(description)
            return
        }else{
            res.statusCode = 404
            res.send()
        }
        res.send()
    }, 1000);
})


server.delete('/api/purchases/:id', (req, res)=>{
    setTimeout(()=>{
            const {id} = req.params;
            const parsedId = parseInt(id, 10)
            if(isNaN(id)){
                res.statusCode = 400;
                res.send()
                return;
            }
            if(purchases.some( o => o.id == id)){
                purchases = purchases.filter(p => parsedId !== p.id)
                res.send()
                return
            }else{
                res.statusCode = 404
                res.send()
            }
        // res.statusCode = 404
            res.send()  
    },1000)
})

server.post('/api/purchases', (req, res) => {
    const purchase = req.body;
    const someId = parseInt(purchase.id,10);
    const parsed = parseInt(purchase.amount, 10)

    setTimeout(()=>{
        if (someId === 0) {
            purchases = [...purchases, { ...purchase, id: nextPurchaseId++, amount: parsed }]
            res.statusCode = 201
            res.send()
            return;
        }
        if(isNaN(someId)){
            res.statusCode = 400;
            res.send({error: ERR_BAD_REQUEST});
            return;
        }
        if(purchases.some(i => i.id === someId)){
            purchases = purchases.map(o => o.id === someId ? { ...o, ...purchase } : o)
            res.send();
            return;
        }else{
            res.statusCode = 404;
            res.send({error: ERR_NOT_FOUND})
        }
        res.send();
    },1000)
   
});

// server.delete('/api/posts/:id', (req, res) => {
//     const { id } = req.params;
//     const parsedId = parseInt(id, 10);
//     if(isNaN(id)){
//         res.statusCode = 400;
//         res.send({error: ERR_BAD_REQUEST});
//         return;
//     }
//     if(posts.some(i => i.id == id)){
//         posts = posts.filter(o =>  o.id !== parsedId)
//         res.send()
//         return
//     }else{
//         res.statusCode = 404; 
//         res.send({error: ERR_NOT_FOUND})
//     }
//     res.send();
// });

const port = process.env.PORT || 9999;
server.listen(port);


