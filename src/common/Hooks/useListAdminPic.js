import { useState, useEffect } from 'react';
import  UserSyncAdApi from '../../modules/UserSyncAd/VN/UserSyncAdApi'

export function useListAdminPic(){
    const [listAdminPic, setListAdminPic] = useState([]);

    useEffect(() => {
        loadAdminPic();
    }, [])

    async function loadAdminPic() {
        var res = await new UserSyncAdApi().getListAdminPic();
        if (res && res.data) {
            let data = res.data.map(c=> {
                return {
                    account: c.account,
                    name: `${c.name} (${c.account})`
                }
            })
            setListAdminPic(data);
        }
      }

    return listAdminPic;
}