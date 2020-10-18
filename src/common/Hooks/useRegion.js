import { useState, useEffect } from 'react'
import RegionApi from '../../modules/Region/VN/RegionApi';

export default function useRegion() {
    const [listRegion, setListRegion] = useState([]);
    useEffect(() => {
        loadRegion();
    }, []);

    async function loadRegion() {
        var res = await new RegionApi().listAll();
        if (res && res.status === 200) {
            if (res.data) {
                setListRegion(res.data)
            }
        }
    }

    return listRegion;
}
