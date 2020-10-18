import { useState } from 'react'

export function usePagination(onSearch, defautPageSize) {
  const [paging, setPaging] = useState({ pageSize: defautPageSize ? defautPageSize : 10, currentPage: 1, rowsCount: 0 })

  function onShowSizeChange(current, pageSize) {
    let updatePaging = { ...paging };
    updatePaging.currentPage = 1;
    updatePaging.pageSize = pageSize;
    setPaging(updatePaging);
    setTimeout(() => {
      onSearch();
    }, 100);
  };

  function onPageChange(page, pageSize) {
    let updatePaging = { ...paging };
    updatePaging.currentPage = page;
    setPaging(updatePaging);
    setTimeout(() => {
      onSearch();
    }, 100);
  };

  return [paging, setPaging, onPageChange, onShowSizeChange]
}