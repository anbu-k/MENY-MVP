import { useFormik } from "formik"

const POSTMapForm = () => {

    const formik = useFormik({
        initialValues:{
          name: "",
          checked: "",
          infoId: "",
          zoomFunction: ""
        },
        
        onSubmit: async (values) => {
          await fetch('api/map', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
          })
        }
      });

      
    return(
        <form>
        <label>Map</label>
        <div>
            <label>Name: </label>
            <input 
            value={formik.values.name}
            onChange={formik.handleChange} 
            type="text" id="map_name" name="name">

            </input>
        </div>
        <div>
            <label>Checked:</label>
            <input 
            value = {formik.values.checked}
            onChange = {formik.handleChange} 
            type="boolean" id="checked" name="checked">

            </input>
        </div>
        <div>
            <label>Info Id: </label>
            <input 
            value={formik.values.infoId}
            onChange={formik.handleChange} 
            type="text" id="info_id" name="info id">

            </input>
        </div>
        <div>
            <label>zoomFunction: </label>
            <input 
            value={formik.values.zoomFunction}
            onChange={formik.handleChange} 
            type="text" id="map_zoom" name="zoom function">

            </input>
        </div>

        <button type="submit">Submit</button>
    </form>
    )
}