import React from 'react'
import { Query } from 'react-apollo';


const Issue = ({ number, author }) =>
    <div>
        {number}: {author.login}
    </div>

export default Issue
