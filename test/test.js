/**
 * Created by easterCat on 2018/6/22.
 */
import React from '../Monika/Monika';

describe('index.js', () => {
    it('React have the createElement prototype', () => {
        spyOn(console, 'error');
        let root = document.createElement('div');
        root.id = 'root';

        class Counter extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    num: 0
                }
            }

            componentWillMount() {
                for (let i = 0; i < 100; i++) {
                    this.setState({num: this.state.num++});
                    if ((this.state.num / 10) && (this.state.num / 10 % 1 === 0)) {
                        document.write(`[ ${pathZero(this.state.num)} ] => </br>`);
                    } else {
                        document.write(`[ ${pathZero(this.state.num)} ] => `);
                    }
                }

                function pathZero(num) {
                    if (num >= 0 && num < 10) {
                        return `00${num}`;
                    }
                    if (num >= 10 && num <= 99) {
                        return `0${num}`
                    }
                    return num
                }
            }

            onClick() {
                this.setState({num: this.state.num + 1}, () => {
                    console.log(this.state.num);
                });
            }

            render() {
                return (
                    <div>
                        <h1>count: { this.state.num }</h1>
                        <button onClick={ () => this.onClick()}>add</button>
                    </div>
                );
            }
        }

        React.render(<Counter/>, root);
        document.body.appendChild(root);
        expect(console.error.calls.count()).toBe(0);
    });
});