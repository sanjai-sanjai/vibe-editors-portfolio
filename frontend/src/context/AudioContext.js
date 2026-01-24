import React, { createContext, useState, useContext, useCallback } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const [currentAudioId, setCurrentAudioId] = useState(null);

    const requestAudioFocus = useCallback((id) => {
        setCurrentAudioId(id);
    }, []);

    return (
        <AudioContext.Provider value={{ currentAudioId, requestAudioFocus }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
