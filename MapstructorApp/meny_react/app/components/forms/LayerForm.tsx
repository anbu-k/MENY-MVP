
import {useState, useEffect} from 'react'
import { Map } from '@prisma/client';

export default function LayerForm() {
    const [data, setData] = useState<Map[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api')
        .then((res) =>  res.json())
        .then((data: Map[]) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    //api is getting called more than once so i need to fix that
    if(data && !isLoading) {
        console.log(data)
        console.log(data.map[0].name);

     let dropdown = document.getElementById('dropdown')
    if(dropdown) {dropdown.innerHTML = ''}
    for(let i = 0; i < data.map.length; i++) {
        let newOption = document.createElement('option');
        newOption.value = data.map[i].name;
        newOption.textContent = data.map[i].name;
        dropdown?.appendChild(newOption)
    }
    
}
    

    return (
        <form>
            <label>Map</label>
            <div>
                <label>Name: </label>
                <select id="dropdown"></select>
            </div>
            <div>
                <label>Style Id:</label>
                <input type="text" id="style-id" name="style-id"></input>
            </div>


            <label>Layer:</label>
            <div>
                <label>Name:</label>
                <input type="text" id="layer-name" name="layer-name"/>
            </div>
            <div>
                <label>Source Url:</label>
                <input type="text" id="source-url" name="source-url"/>
            </div>

            <div>
                <label></label>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}