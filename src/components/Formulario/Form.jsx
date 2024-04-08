import { useState, useRef } from "react";
import Styles from "./Form.module.scss";



export default function Form(props) {

    const [responseMessage, setResponseMessage] = useState("");
    const loader = useRef(null);
    const modal = useRef(null);
    const iconCheck = useRef(null);
    const formulario = useRef(null);

    const submit = async (e) => {

        e.preventDefault();
        modal.current.showModal();
        loader.current.classList.add(Styles.animate);
        setResponseMessage("Solicitando ...");
        
        const formData = new FormData(e.target);
        const response = await fetch("https://formsubmit.co/ajax/aebfabe79b4041c8e7b41c7cf4c790fe", {
            method: "POST",
            body: formData,
        });


        if (response.ok) {

            loader.current.classList.remove(Styles.animate);
            iconCheck.current.classList.add(Styles.iconShow);

            setResponseMessage("Solicitud Enviada");
        } else {

        }

    }

    const closeDialog = (e) =>{
        e.preventDefault();
        // e.reset();
        formulario.current.reset();
        modal.current.close();
        iconCheck.current.classList.remove(Styles.iconShow);
    }

    return (
        <form onSubmit={submit} className={Styles.formulario} ref={formulario}>
            <label className={Styles.label} htmlFor="nombre">
                Nombre
            </label>
            <input className={Styles.input} name="nombre" id="nombre" required />
            <label className={Styles.label} htmlFor="apellido">
                Apellido
            </label>
            <input className={Styles.input} name="apellido" id="apellido" required />
            <label className={Styles.label} htmlFor="email">
                Correo
            </label>
            <input className={Styles.input} name="email" type="email" id="email" required />
            <label className={Styles.label} htmlFor="programasLabel">
                Seleccione el programa de estudio
            </label>
            <select name="programasEstudio" id="programas" className={Styles.select}>
                {
                    props.itemsProgramas.map((programa, i) => {
                        return <option value={programa} key={i}>{programa}</option>
                    })
                }
            </select>
            <label className={Styles.label} htmlFor="observacion">
                Alguna observacion
            </label>
            <textarea className={Styles.textarea} name="observacion" id="observacion"></textarea>
            <button className={Styles.boton}>Solicitar Informacion</button>

            <dialog className={Styles.modal} ref={modal}>
                <div className={`${Styles.containerIcons}`} >
                    <span className={`${Styles.loader}`} ref={loader} />
                    <span className={`${Styles.checkIcon}`} ref={iconCheck}>
                        {props.iconCheck}
                    </span>
                </div>
                <h3>{responseMessage}</h3>
                <button className={Styles.botonClose} onClick={closeDialog}>X</button>
            </dialog>
            
        </form>
    );
}

