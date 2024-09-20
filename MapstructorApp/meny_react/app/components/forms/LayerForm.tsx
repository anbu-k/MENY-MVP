import { Map } from '@prisma/client';

export default function LayerForm() {

    

    return (
        <form>


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
                <label>Source Id:</label>
                <input type="text" id="source-id" name='source-id'></input>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}