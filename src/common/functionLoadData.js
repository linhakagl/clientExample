import CategoryApi from "../services/CategoryApi";

export async function GetAllCategoryType(){
    var res = await CategoryApi.getAllCategroryType();
    if(res && res.data){
        return res.data;
    }
    return null;
}


