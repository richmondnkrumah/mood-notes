type TAG_OBJECT = {
  key: string,
  items: TAG[]
}

export type TAG = {
  id: number,
  name: string
}


const DEFAULT_TAGS: TAG_OBJECT = {
  key: "TAGS",
  items: [{
    id: 1,
    name: 'Work'
  }, {
    id: 2,
    name: 'Family'
  }, {
    id: 3,
    name: 'Friends'
  }, {
    id: 4,
    name: 'College'
  }, {
    id: 5,
    name: 'Home'
  }, {
    id: 6,
    name: 'Pleasure'
  },]
}

export default DEFAULT_TAGS