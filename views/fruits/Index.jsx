const React = require('react')
const DefaultLayout = require('../Default')

class Index extends React.Component {
    render() {
        const { fruits } = this.props
        return (
            <DefaultLayout>
            
                <div>
                    <a href="/fruits/new"><button>Create A New Fruit</button></a>
                    {
                        fruits.map((fruit) => (
                            <article>
                                <a href={`/fruits/${fruit._id}`}>
                                    <h2>
                                        {fruit.name} - {fruit.readyToEat ? 'Ripe' : 'Not Ripe Yuck Thats Nasty'}
                                    </h2>
                                </a>
                            </article>
                        ))
                    }
                </div>
            </DefaultLayout >
        )
    }

}

module.exports = Index;