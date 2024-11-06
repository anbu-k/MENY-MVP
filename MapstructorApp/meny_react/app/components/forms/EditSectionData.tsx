import { useFormik } from "formik"
import { LayerSectionData as PrismaLayerSectionData } from "@prisma/client"
import { CSSProperties, useEffect, useState } from "react";
import Loader from "../loading/loading.component";

const EditSectionData = (props: {id: string, afterSubmit: (formVisible: boolean) => void}) => {
    const [LayerSectionData, setLayerSectionData] = useState<PrismaLayerSectionData>({
        id: "",
        name: "",
        sectionName: "",
        iconColor: "",
        iconType: "",
        label: "",
        longitude: 0,
        latitude: 0,
        zoom: 0,
        bearing: 0,
        topLayerClass: "",
        infoId: "",
    })

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await fetch('http://localhost:3000/api/LayerSectionData/' + props.id)
                .then((response) => {
                response.json()?.then(parsed => {
                    setLayerSectionData(parsed.layerSectionData);
                })
            });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        name:LayerSectionData.name,
        sectionName:LayerSectionData.sectionName,
        iconColor:LayerSectionData.iconColor,
        iconType:LayerSectionData.iconType,
        label:LayerSectionData.label,
        longitude:LayerSectionData.longitude,
        latitude:LayerSectionData.latitude,
        zoom:LayerSectionData.zoom,
        bearing:LayerSectionData.bearing,
        topLayerClass:LayerSectionData.topLayerClass,
        infoId:LayerSectionData.infoId,

    },

    onSubmit: async (values) => {
        try{
          await fetch('http://localhost:3000/api/LayerSectionData', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        alert(`Layer Updated`);
        props.afterSubmit(false);
        }
        catch (error: any)
        {
          alert(`Error: ${error.message}`);
        }
      }

    })

    const boxStyling: CSSProperties = {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      };
    
      const labelStyling: CSSProperties = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
      };
    
      const buttonStyling: CSSProperties = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      };
    
      const buttonHoverStyling: CSSProperties = {
        backgroundColor: '#0056b3',
      };

    return (
        <div>
            {isLoading ? (<Loader/>) : (
                                <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}>
                                    <strong>Edit {LayerSectionData.name}</strong>
                                </h2>

                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Section Name</label>
                                    <input
                                        type="text"
                                        name="sectionName"
                                        value={formik.values.sectionName}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Icon Color</label>
                                    <input
                                        type="text"
                                        name="iconColor"
                                        value={formik.values.iconColor}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Icon Type</label>
                                    <input
                                        type="text"
                                        name="iconType"
                                        value={formik.values.iconType}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Label</label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={formik.values.label}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Longitude</label>
                                    <input
                                        type="number"
                                        name="longitude"
                                        value={formik.values.longitude ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Latitude</label>
                                    <input
                                        type="number"
                                        name="latitude"
                                        value={formik.values.latitude ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Zoom</label>
                                    <input
                                        type="number"
                                        name="zoom"
                                        value={formik.values.zoom ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Bearing</label>
                                    <input
                                        type="number"
                                        name="bearing"
                                        value={formik.values.bearing ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Top Layer Class</label>
                                    <input
                                        type="text"
                                        name="topLayerClass"
                                        value={formik.values.topLayerClass ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyling}>Info ID</label>
                                    <input
                                        type="text"
                                        name="infoId"
                                        value={formik.values.infoId ?? ""}
                                        onChange={formik.handleChange}
                                        style={boxStyling}
                                    />
                                </div>
                                <button
                                    style={buttonStyling}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
                                    type="submit"
                                >
                                Update
                                </button>
                            </form>



            ) }

        </div>

    )

}

export default EditSectionData





