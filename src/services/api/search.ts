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