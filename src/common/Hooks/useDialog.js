import { useState } from 'react'

export function useDialog(closeCallback, innitState = { show: false,isEdit: false, id: 0}) {
  const [dialogState, setDialogState] = useState(innitState)

  function showDialog(isEdit = false, id = 0){
    let dialog = { ...dialogState };
    dialog.show = true;
    dialog.isEdit = isEdit;
    dialog.id = id;
    setDialogState(dialog)
  }

  function hideDialog(callBack = false, data){
    let dialog = { ...dialogState};
    dialog.show = false;
    dialog.isEdit = false;
    dialog.id = 0;
    setDialogState(dialog)
    if (callBack && closeCallback) {
        setTimeout(() => {
            closeCallback(data)
        }, 100);
      }
  }
  

  return [dialogState, showDialog, hideDialog, setDialogState]
}