import { Component } from 'react'

export class ListBaseComponent extends Component {
  state = {
    filter: {
      paging: {
        pageSize: 10,
        currentPage: 1,
        rowsCount: 0
      }
    }
  };

  onShowSizeChange = (current, pageSize) => {
    let filter = { ...this.state.filter };
    filter.paging.currentPage = 1;
    filter.paging.pageSize = pageSize;
    this.setState({ filter: filter });
    setTimeout(() => {
      this.onSearch();
    }, 100);
  };

  onPageChange = (page, pageSize) => {
    let filter = { ...this.state.filter };
    filter.paging.currentPage = page;
    this.setState({ filter: filter });
    setTimeout(() => {
      this.onSearch(page);
    }, 100);
  };

  onSearch = () => { }

  GetTreeUnit = async () => {
    // var result = null
    // result = await this.DepartmentApi.listAll()
    //   .then(res => {
    //     if (res && res.data && res.status === 200) {
    //       var dt = res.data.map(d => {
    //         var obj = {}
    //         obj.title = d.abreviationName
    //         obj.value = d.unitId
    //         obj.key = d.unitId
    //         obj.unitId = d.unitId
    //         obj.parentId = d.parentId
    //         return obj
    //       })
    //       return this.buildTree(dt, "unitId", "parentId")
    //     }
    //     else {
    //       if (res) {
    //         this.Notification.error(res.message);
    //       }
    //     }
    //   })
    // return result
  }

  buildTree = (array, keyId, parentKeyId, parent, tree) => {
    var selft = this;
    tree = typeof tree !== 'undefined' ? tree : [];
    if (typeof parent === 'undefined') {
      parent = {};
      parent[keyId] = null;
    }
    var children = array.filter(child => child[parentKeyId] === parent[keyId]);
    if (children) {
      if (parent[keyId] == null) {
        tree = children;
      } else {
        parent['children'] = children;
      }
      children.forEach(child => selft.buildTree(array, keyId, parentKeyId, child));
    }
    return tree;
  }

  
}

export default ListBaseComponent
