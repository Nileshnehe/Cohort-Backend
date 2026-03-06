import { Children, createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({

        "url": "https://ik.imagekit.io/l0fbze2wt/cohort-2/moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__-S0GPO8Qn.mp3",
        "posterUrl": "https://ik.imagekit.io/l0fbze2wt/cohort-2/moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__JvOEdADGz.jpeg",
        "title": "Jatt Mehkma (RiskyjaTT.CoM)",
        "mood": "sad",

    })
    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider
            value = {{ loading, setLoading, song, setSong }}
            >
                {children}
        </SongContext.Provider>
    )
}