import express from 'express'
const app = express()
import cors from 'cors'

app.use(cors());

<<<<<<< HEAD
=======

>>>>>>> a6fa8dd54f2ef17396ccb2efe898a9a778c415a1
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const info : Array<any> = []
let id = 0

app.get('/', (req, res)=>{
    // Se a consulta get for feita sem parametros trará todo o conteudo do array database
    // Caso tenha filtrará os objetos
    
    let hasParams : boolean = Object.keys(req.query).length > 0
    let objectsInMemory = info

    if(!hasParams){
        res.send(objectsInMemory)
        return
    }

    let objectsInContext = objectsInMemory.filter(
        (obj)=>{
<<<<<<< HEAD

            let paramNames = Object.keys(req.query)
        
            let isTheSearchedObject = paramNames.every(
                (param)=>{
                    //paran exists? if exists, is it the same as the query
                    return param in obj.data && obj.data[param] == req.query[param]
                }
            )

           if(isTheSearchedObject) return obj 
        }
    )
    objectsInContext.length > 0 ? res.send(objectsInContext) : res.status(404).send("Not found") 
=======
            let validParams : Array<boolean> = []

            const filterObjectsByParams = ()=>{
                Object.keys(req.query).forEach(parameters => {
                    if(parameters in obj.data){
                        let isObjectPropertyEqualToQueryParams : boolean = obj.data[parameters] == req.query[parameters]      
                        validParams.push(isObjectPropertyEqualToQueryParams)
                    }else{
                        validParams.push(false)
                    }
                });
            }
            filterObjectsByParams()

            let isAllParamsValid : boolean = validParams.every(x => x)
            if (isAllParamsValid){
                return obj
            }
        }
    )
    res.send(objectsInContext)      

    
>>>>>>> a6fa8dd54f2ef17396ccb2efe898a9a778c415a1
})

app.post('/', (req, res)=>{
    //Create an object

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
    //Update a object by id

    let UpdateObj = info.find(obj => obj["metaData"].id == req.query.id)
    
    if(UpdateObj !== undefined){
        UpdateObj.data = req.body
        UpdateObj.metaData.lastUpdate = new Date(Date.now()).toISOString()
    }else{
        res.status(404).send()
    }
    res.send(UpdateObj)
<<<<<<< HEAD
})

=======
    
})
>>>>>>> a6fa8dd54f2ef17396ccb2efe898a9a778c415a1
app.delete('/', (req, res)=>{
    let objExists = info.indexOf(info.find(obj => obj["metaData"].id == req.query.id))
    if(objExists === -1){
        res.status(404).send("Not found")
    }else{
        info.splice(objExists, 1)
        res.send("Done")
    }
})

<<<<<<< HEAD
app.listen(3000 || process.env.port);
console.log("🌮 Throw some chapolle in there and where set! 🌮")
=======
app.listen(3000);
console.log("Throw some chapolle in there and where set!")

>>>>>>> a6fa8dd54f2ef17396ccb2efe898a9a778c415a1


