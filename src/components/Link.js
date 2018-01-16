import React from 'react';

class Link extends React.Component {
    componentDidMount() {
        console.log('Linker componentDidMount')
    }

    render() {
        return (
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <hr />
            </div>
        )
    }
}

export default Link;