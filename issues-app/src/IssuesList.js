import React, { Fragment } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import Issue from "./Issue"
const GET_ISSUES = gql`
query getIssues($organization: String!, $repoName: String!, $cursor: String) {
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
            issues(
                first: 10,
                after: $cursor,
                states: OPEN,
                labels: ["bug"],
                orderBy: {
                    field: CREATED_AT,
                    direction: DESC
                }) {
                totalCount
                edges {
                    node {
                        id
                        closed
                        number
                        title
                        author {
                            login
                            avatarUrl
                        }
                        comments(first: 10) {
                            edges {
                                node {
                                    body
                                }
                            }
                        }
                        publishedAt
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
}
`;

const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
        return previousResult
    }
    return {
        ...previousResult,
        organization: {
            ...previousResult.organization,
            repository: {
                ...previousResult.organization.repository,
                issues: {
                    ...previousResult.organization.repository.issues,
                    ...fetchMoreResult.organization.repository.issues,
                    edges: [
                        ...previousResult.organization.repository.issues.edges,
                        ...fetchMoreResult.organization.repository.issues.edges,
                    ]
                }
            }
        }

    }
}

const IssuesList = () => (
    <Query
        query={GET_ISSUES}
        variables={{
            organization: "QuorumUS",
            repoName: "issues",
        }}
    >
        {({ data, loading, error, fetchMore }) => {
            if (loading) {
                return <div>Loading Your Issues...</div>
            }

            const issues = data.organization.repository.issues
            const { totalCount, edges, pageInfo  } = issues

            return (
                <Fragment>
                    <h2> Quorum's Issues - Total: {totalCount} </h2>
                    <div style={{marginBottom: "100px"}}>
                    {edges.map( ({ node }) => <Issue key={node.id} {...node} />)}
                    {
                        pageInfo.hasNextPage &&
                        <button
                            type="button"
                            onClick={() => fetchMore({
                                variables: {
                                    cursor: pageInfo.endCursor
                                },
                                updateQuery,
                            })}
                        >
                            Load More
                        </button>
                    }
                    </div>
                </Fragment>
            )

        }}
    </Query>
)

export default IssuesList;
