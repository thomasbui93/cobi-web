export const searchApi = async (requestInfo?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        meta: {
          total: 1000,
          page: requestInfo.page
        },
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