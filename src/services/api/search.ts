export const searchApi = async (requestInfo?: any) => {
  return new Promise((resolve, reject) => {
    const isSuccessfull = Math.floor(Math.random() * 2) === 0;
    setTimeout(() => {
      isSuccessfull || true ? resolve({
        meta: {
          total: 1000,
          page: requestInfo && requestInfo.page ? requestInfo.page : 1
        },
        items: [
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date(),
            key: '1',
          },
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date(),
            key: '2',
          },
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date(),
            key: '3',
          }
        ]
      }) : reject({
        error: 'Fail to fetch data'
      })
    }, 1000)
  })
}

export const filterApi = async () => {
  return new Promise((resolve, reject) => {
    const isSuccessfull = Math.floor(Math.random() * 2) === 0;
    setTimeout(() => {
      isSuccessfull || true ? resolve([
        {
          label: 'Filter A',
          name: 'filter_a',
          type: 'select',
          options: [
            {
              label: 'Filter Item A 1',
              value: 'filter_a_1'
            },
            {
              label: 'Filter Item A 2',
              value: 'filter_a_2'
            },
            {
              label: 'Filter Item A 3',
              value: 'filter_a_3'
            }
          ] 
        },
        {
          label: 'Filter B',
          name: 'filter_b',
          type: 'toggle',
          options: [
            {
              label: 'Filter Item B 1',
              value: 'filter_b_1'
            },
            {
              label: 'Filter Item B 2',
              value: 'filter_b_2'
            }
          ] 
        },
        {
          label: 'Filter C',
          name: 'filter_C',
          type: 'text'
        }
      ]) : reject({
        error: 'Fail to fetch data'
      })
    }, 1000)
  })
}