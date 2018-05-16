import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import "./style.css"
const GET_CURRENT_USER = gql`
    {
        viewer {
            login
            name
        }
    }
`;

const Profile = () => (
    <Query query={GET_CURRENT_USER}>
        {({ data, loading }) => {
        const { viewer } = data;
        if (loading || !viewer) {
            return <div className="profile"> Loading...</div>
        }
        return (
            <div className="profile">
            Welcome {viewer.name}!
            </div>
        );
        }}
    </Query>
)

export default Profile
