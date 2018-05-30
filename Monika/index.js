/**
 * Created by fuhuo on 2018/5/26.
 */
import './index.html';
import React from './Monika/index.js';
import ReactDOM from './Monika/ReactDOM';


const element = (
    <div>
        hello
        <span>
            world
        </span>
    </div>
);

console.log(element);

function tick() {
    const element = (
        <div>
            <span>
                hello world
            </span>
            <span>
                {
                    new Date().toLocaleString()
                }
            </span>
        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('root')
    )
}

setInterval(tick, 1000);
