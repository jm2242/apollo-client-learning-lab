import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import Issue from "./Issue"
const GET_ISSUES = gql`
query getIssues($organization: String!, $repoName: String!) {
    organization(login: $organization) {
        name
        url
        repository(name: $repoName) {
            id
            name
            hasIssuesEnabled
            stargazers {
                totalCount
            }
            issues(last: 20, states: OPEN, labels: ["bug"]) {
                totalCount
                edges {
                    node {
                        closed
                        number,
                        author {
                            login
                        }
                        publishedAt
                    }
                }
                pageInfo {
                    startCursor
                    hasPreviousPage
                }
            }
        }
    }
}
`;

const IssuesList = () => (
    <Query
        query={GET_ISSUES}
        variables={{
            organization: "QuorumUS",
            repoName: "issues",
        }}
    >
        {({ data, loading }) => {
            if (loading) {
                return <div>Loading Your Issues...</div>
            }

            const issues = data.organization.repository.issues
            const { totalCount, edges, pageInfo  } = issues
            return edges.map( ({ node }) => <Issue number={node.number} author={node.author} />)
        }}
    </Query>
)

export default IssuesList;
