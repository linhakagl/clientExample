import { useState, useEffect } from 'react';
import WorkingLocationApi from '../../modules/WorkingLocation/VN/WorkingLocationApi'

export function useWorkingLocation() {
    const [listWorkingLocation, setListWorkingLocation] = useState([]);

    useEffect(() => {
        loadWorkingLocation();
    }, [])

    async function loadWorkingLocation() {
        var res = await new WorkingLocationApi().listAll();
        if (res && res.data) {
            setListWorkingLocation(res.data);
        }
    }

    return listWorkingLocation;
}