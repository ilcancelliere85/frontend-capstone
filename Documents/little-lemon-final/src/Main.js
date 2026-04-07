import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

// 1. Funzione per aggiornare gli orari quando l'utente cambia data
export function updateTimes(state, date) {
    if (window.fetchAPI) {
        return { availableTimes: window.fetchAPI(new Date(date)) };
    }
    return state; // Ritorna lo stato attuale se l'API non è pronta
}

// 2. Funzione per caricare gli orari iniziali (di oggi)
export function initializeTimes() {
    if (window.fetchAPI) {
        return { availableTimes: window.fetchAPI(new Date()) };
    }
    // Orari di emergenza se l'API non risponde subito
    return { availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] };
}

function Main() {
    const [state, dispatch] = useReducer(updateTimes, null, initializeTimes);
    const navigate = useNavigate();

    // 3. Gestione dell'invio del modulo
    const submitForm = (formData) => {
        if (window.submitAPI) {
            const isSubmitted = window.submitAPI(formData);
            if (isSubmitted) {
                navigate("/confirmed"); // Naviga alla pagina di successo
            }
        } else {
            // Se l'API di Meta non è caricata, simuliamo il successo per permetterti di testare
            console.warn("API non trovata, simulo invio...");
            navigate("/confirmed");
        }
    };

    return (
        <main>
            <div className="container">
                <h1>Prenota un tavolo da Little Lemon</h1>
                <p>Inserisci i tuoi dettagli qui sotto per riservare un posto.</p>
                
                <BookingForm 
                    availableTimes={state.availableTimes} 
                    dispatch={dispatch} 
                    submitForm={submitForm} 
                />
            </div>
        </main>
    );
}

export default Main;