const express = require("express")

const router = express.Router()

const DUMMY_PLACES = [
    {
        id:"p1",
        title:"MIT",
        description:"Hella this is the greatest university",
        location:{
            lat:70.46,
            lng:54.45
        },
        address:"69 Street, London",
        creator:'u1'
    }
]


router.get('/:pid',(req,res,next)=>{
    console.log("GET request in console")
    const placeId = req.params.pid //{pid:'p1'}
    const place = DUMMY_PLACES.find(p=>p.id===placeId)

    if(!place){
        const error = new Error("Couldn't find place for the provided id")
        error.code = 404
        return next(error)
    }
    res.json({place})

})
router.get('/users/:uid',(req,res,next)=>{
    console.log("GET request in Users")
    const userId = req.params.uid
    const user = DUMMY_PLACES.find(p=>p.creator===userId)

    if(!user){
       const error = new Error("Couldn't find place for the provided user id")
       error.code = 404
       return next(error)
    }
    res.json({user})

})




module.exports = router