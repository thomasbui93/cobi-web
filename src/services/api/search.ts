export const searchApi = async (requestInfo?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        sorts: requestInfo && requestInfo.sorts ? requestInfo.sorts : [],
        filters: requestInfo && requestInfo.filters ? requestInfo.filters : [],
        items: [
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date()
          },
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date()
          },
          {
            title: 'Category Title',
            description: 'Category Description',
            image: 'http://via.placeholder.com/150x150',
            postCount: 10,
            lastEdit: new Date()
          }
        ]
      })
    }, 1000)
  })
}