export function GetAppCode() {
    var currentUser = null;
    if (localStorage.getItem('tss-current-user')) {
        currentUser = JSON.parse(localStorage.getItem('tss-current-user'));
    }
    if (currentUser && currentUser.appCode) {
        return currentUser.appCode;
    }
    return "VN";
}
export const requestStatus = [
    "Draft", "Submitted", "CostConfirmed", "BULApproved",
    "TBApproved", "TPApproved", "GDFSApproved",
    "AFApproved", "FCApproved", "CFOApproved",
    "CancelRequesting", "Cancelled", "Rejected",
    "DHApproved", "DLApproved", "SHApproved",
    "SLApproved", "OBHDApproved", "OBHSApproved",
    "RAApproved", "DMOApproved"
]
export const ApproveAction = "ApprovalNextStatus";
export const ConfirmCostAction = "CostConfirmed";
export const RejectAction = "RejectEndWorkFlow";
export const RejectStatus = "Rejected";

export const Accommodation = ["None", "Hostel", "Hotel"];
export const AccomLocation = ["", "Near working location", "In downtown"];

export const TypeCode = {
    facebookBuff: "Facebook_Buff",
    facebookVip: "Facebook_Vip",
    instagramBuff: "Instagram_Buff"
}
export const fbChat = "http://m.me/masterlee176";
export const percentAdvanceFilter = 28;