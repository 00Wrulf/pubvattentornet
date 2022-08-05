import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import VattentornetDataService from "../../services/vattentornet.service";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginPopup({closePopup}) {

    const {register, handleSubmit, setError, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        //TODO: Lägg in error handling om användaren inte finns i DB.
        // Just nu visas bara error om man inte skriver mail-adressen på rätt format
        // Finns inte användaren händer ingenting.
        VattentornetDataService.login(data.email, data.password)
    }

    // Felhantering för felaktigt formaterad mail
    const onError = (errors) => {
        setError("customError", { type: "server side", message: "Felaktig email"});
        console.log("neee");
    }

    const [user, loading] = useAuthState(VattentornetDataService.auth);

    useEffect(() => {
        if (loading) {
            //Trigger loading anim?
            return;
        }
        if(user) {
            closePopup();
        }
    }, [user, loading]); 
    
    return (
        <div className="popup">
            <p className="popupHeader">Logga in</p>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <label>
                    Email *
                    <input 
                        type="email" 
                        placeholder="Din email"
                    {...register("email", {
                        required: "Obligatoriskt",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Ogiltig emailadress"
                        }
                    })} 
                />
                </label>
                <label>
                    Lösenord *
                    <input 
                        type="password" 
                        placeholder="Lösenord"
                        {...register("password", {
                        required: "Obligatoriskt"
                    })}/>
                </label>
                <p style={{color: 'red'}}>{errors.customError?.message}</p>
                <input type="submit" value="Logga in"/>
            </form>
        </div>
    )
}
