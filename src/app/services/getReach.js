import http from "@/app/http";

export async function getReach(id) {
  return http
    .post("graphql", {
      query: `
              {
                reach(id: ${id}) {
                  avggradient
                  id
                  class
                  description
                  edited
                  gaugeinfo
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  status
                  permissions {
                    domain
                    permission
                    result
                  }
                  readingsummary {
                      adjusted_reach_class
                      gauge_estimated
                      gauge_id
                      gauge_important
                      gauge_max
                      gauge_min
                      gauge_perfect
                      obs_id
                      range_comment
                  }
                  photo {
                    id
                    post {
                      user {
                        uname
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                }
              }
            
            `,
    })
    .then((res) => res.data);
}
