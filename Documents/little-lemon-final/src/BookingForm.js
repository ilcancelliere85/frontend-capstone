import React from "react";
import { Link } from "react-router-dom";

const ConfirmedBooking = () => {
    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>✅ Prenotazione Confermata!</h1>
            <p>Grazie per aver scelto Little Lemon. Ti abbiamo inviato una mail con i dettagli.</p>
            <Link to="/">Torna alla Home</Link>
        </div>
    );
};

export default ConfirmedBooking;