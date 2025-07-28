import { useState } from 'react';

const useConfirmation = (action) => {
    const [confirmation, setConfirmation] = useState(false);
    
    const closeConfirmation = async (value) => {
        if (value.confirmation) {
            try {
                await action();
            } catch (err) {
                console.log(err);
            }
        }
        setConfirmation(false);
    };

    return [confirmation, setConfirmation, closeConfirmation];
};

export default useConfirmation;
