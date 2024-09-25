import { useFormik } from "formik"


export default function LayerForm() {

    const formik = useFormik({
      initialValues:{
        layerName: "",
        sourceUrl: "",
        id: "",
        type: "",
      },
      
      onSubmit: async (values) => {
        await fetch('api/layer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
      }
    });

    return (
        <form onSubmit={formik.handleSubmit}>


            <label>Layer:</label>
            <div>
                <label>Name:</label>
                <input type="text" id="layerName" name="layerName" onChange={formik.handleChange} value={formik.values.layerName}/>
            </div>
            <div>
                <label>Source Url:</label>
                <input type="text" id="sourceUrl" name="sourceUrl" onChange={formik.handleChange} value={formik.values.sourceUrl}/>
            </div>

            <div>
                <label>Source Id:</label>
                <input type="text" id="id" name='id' onChange={formik.handleChange} value={formik.values.id}></input>
            </div>

            <div>
                <label>Type:</label>
                <input type="text" id="type" name="type" onChange={formik.handleChange} value={formik.values.type}/>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}