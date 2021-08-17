const server = require('express')
const app = server()

app.use(require('cors')());

app.use(server.json())
app.use(server.urlencoded({ extended: true}))

const info = []
let id = 0

app.get('/', (req, res)=>{

    if(Object.keys(req.query).length > 0){
        let objInContext = info.find(obj => obj["metaData"].id == req.query.id)

        if(objInContext){
            res.send(objInContext)
        }else{
            res.status(404)
        }        
    }else{
        res.send(info);
    }
})

app.post('/', (req, res)=>{
    let date = new Date(Date.now())

    let newObj = { ...{
        metaData:{
            "id": id,
            "time": date.toUTCString(),
            "lastUpdate": null
        }
    }, ...{
        "data":req.body
        } 
    }

    info.push(newObj)

    res.send(newObj).status(200)
    id++
})

app.put('/', (req, res)=>{

    let UpdateObj = info.find(obj => obj["metaData"].id == req.query.id)
    if(UpdateObj !== undefined){
        UpdateObj.data = req.body
        UpdateObj.metaData.lastUpdate = new Date(Date.now()).toISOString()
    }else{
        res.status(404).send()
    }
    res.send(UpdateObj)
    
})
app.delete('/', (req, res)=>{
    let exists = info.indexOf(info.find(obj => obj["metaData"].id == req.query.id))
    if(exists === -1){
        res.status(404).send()
    }else{
        info.splice(exists, 1)
        res.send(info)
    }
})

app.listen(3000);
console.log("Throw some chapolle in there and where set!")



