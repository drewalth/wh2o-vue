import http from "@/app/http"

export async function getDocument(id) {
  return http.post('graphql', {
    query: `
       query { 
          document(id: ID!) {
            abstract
            description
            document
            document_size
            id
            uri
            user {
              uid
            }
            edit_date
            author {
              id
              name
            }
          }
       }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}