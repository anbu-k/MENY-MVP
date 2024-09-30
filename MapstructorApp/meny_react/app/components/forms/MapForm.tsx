import { useFormik } from "formik"

export default function MapForm() {

    const formik = useFormik({
        initialValues:{
          name: "",
          checked: false,
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
            <input type="text" id="style-id" name="style-id"></input>
        </div>
        <div>
            <label>Style Id:</label>
            <input type="text" id="style-id" name="style-id"></input>
        </div>

        <button type="submit">Submit</button>
    </form>
    )
}