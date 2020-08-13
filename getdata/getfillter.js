const { Picker } = require("react-native");
const axios = require('axios');

const SIDO = [
    {
        label: '경기도',
        value: 'kyongki',
    },
    {
        label: '강원도',
        value: 'kangwon',
    },

];
class PersonInfo extends React.Component {
    render() {
        return (
            <Picker.Item label={this.props.data.name} value="this.props.data.value" />
        );
    }
}
class Person extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://myks790.iptime.org:8082/board/major')
            .then(function (response) {
                
            })
    }

    render() {
        const mapToComponent = data => {
            return data.map((person, i) => {
                return (<PersonInfo person={person} key={i} />);
            });
        };

        return (
            <div>
                {mapToComponent(this.state.personData)}
            </div>
        );
    }
}
class App extends React.Component {
    render() {
        return (
            <div>
                <Person />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));