import React from 'react'
import {useParams} from 'react-router-dom'

import Placelist from '../components/placelist'

function Userplaces() {

    const DUMMY=[
        {
        id:'p1',
        title:'Skyring',
        description:'Times passes 5 years slower relative to 1 hr on earth',
        imageUrl:'https://cdn.pixabay.com/photo/2018/05/09/01/00/greece-3384386_1280.jpg',
        address:"77 Massachusetts Ave, Cambridge, MA 02139, United States",
        location:{
            lat: 42.360091,
            lng: -71.0963487
        },
        creator:'u1'
    },
        {
        id:'p2',
        title:'Rainbow',
        description:'As  Vibrant as my classroom.',
        imageUrl:'https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg',
        address:"77 Massachusetts Ave, Cambridge, MA 02139, United States",
        location:{
            lat: 42.360091,
            lng: -71.0963487
        },
        creator:'u1'
    }
]
    const userId =useParams().userId;
    const filtered_DUMMY = DUMMY.filter(item=>item.creator===userId)
    return (
       <Placelist items={filtered_DUMMY}/>
    )
}

export default Userplaces
