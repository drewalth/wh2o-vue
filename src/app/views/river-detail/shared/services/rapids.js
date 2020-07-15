import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchRapidsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id: ${data}) {
          pois {
            approximate
            character
            description
            difficulty
            distance
            id
            name
            rloc
            photo {
              poi_name
              subject
              description
              author
              caption
              photo_date
              image {
                uri {
                  thumb
                  medium
                  big
                }
              }
              id
            }
          }
        }
      }
    `
    })
    .then(res => res.data)
}

const createRapid = data => {
  return httpClient.post(apiConstants.graphql, {
    query: `
      mutation ($id:ID!, $poi: POIInput!) {
        poiUpdate(id: $id, poi: $poi) {
          id,
          name,
          rloc,
          description,
          difficulty,
          distance,
          character
        }
      }
    `,
    variables: {
      id: data.id,
      poi: {
        reach_id: data.reach_id,
        name: data.name,
        rloc: data.rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: [],
        approximate: false // change this if approximate is added to form
      }
    }
  }).then(response => {
    return response.data.data.poiUpdate
  })
}

const updateRapid = data => {
  return httpClient.post(apiConstants.graphql, {
    query: `
      mutation ($id:ID!, $poi: POIInput!) {
        poiUpdate(id: $id, poi: $poi) {
          id,
          name,
          rloc,
          description,
          difficulty,
          distance,
          character
        }
      }
    `,
    variables: {
      id: data.id,
      poi: {
        name: data.name,
        rloc: data.rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: []
      }
    }
  }).then(response => {
    return response.data.data.poiUpdate
  })
}

const deleteRapid = id => {
  return httpClient.post(apiConstants.graphql, {
    query: `
      mutation ($id:ID!) {
        poiDelete(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: id
    }
  }).then(response => {
    return response.data.data.poiDelete
  })
}

export { fetchRapidsData, createRapid, updateRapid, deleteRapid }
