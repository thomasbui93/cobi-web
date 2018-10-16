export interface InterfaceMenuItem {
  key: string,
  title: string,
  url: string,
  children?: InterfaceMenuItem[]
}

export const getMenuItems = (): InterfaceMenuItem[]=> {
  return [
    {
      key: '1',
      title: 'Menu 1',
      url: 'menu-1',
      children: [
        {
          key: '1-1',
          title: 'Menu 1-1',
          url: 'menu-1-1',
        },
        {
          key: '1-2',
          title: 'Menu 1-2',
          url: 'menu-1-2',
        },
        {
          key: '1-3',
          title: 'Menu 1-3',
          url: 'menu-1-3',
        },
        {
          key: '1-4',
          title: 'Menu 1-4',
          url: 'menu-1-4',
        }
      ]
    },
    {
      key: '2',
      title: 'Menu 2',
      url: 'menu-2',
      children: [
        {
          key: '1-1',
          title: 'Menu 1-1',
          url: 'menu-1-1',
        },
        {
          key: '1-2',
          title: 'Menu 1-2',
          url: 'menu-1-2',
        },
        {
          key: '1-3',
          title: 'Menu 1-3',
          url: 'menu-1-3',
        },
        {
          key: '1-4',
          title: 'Menu 1-4',
          url: 'menu-1-4',
        }
      ]
    },
    {
      key: '3',
      title: 'Menu 3',
      url: 'menu-3',
      children: [
        {
          key: '1-1',
          title: 'Menu 1-1',
          url: 'menu-1-1',
        },
        {
          key: '1-2',
          title: 'Menu 1-2',
          url: 'menu-1-2',
        },
        {
          key: '1-3',
          title: 'Menu 1-3',
          url: 'menu-1-3',
        },
        {
          key: '1-4',
          title: 'Menu 1-4',
          url: 'menu-1-4',
        }
      ]
    },
    {
      key: '4',
      title: 'Menu 4',
      url: 'menu-4',
      children: [
        {
          key: '1-1',
          title: 'Menu 1-1',
          url: 'menu-1-1',
        },
        {
          key: '1-2',
          title: 'Menu 1-2',
          url: 'menu-1-2',
        },
        {
          key: '1-3',
          title: 'Menu 1-3',
          url: 'menu-1-3',
        },
        {
          key: '1-4',
          title: 'Menu 1-4',
          url: 'menu-1-4',
        }
      ]
    },
    {
      key: '5',
      title: 'Menu 5',
      url: 'menu-5',
    }
  ]
}