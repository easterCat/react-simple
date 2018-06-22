/**
 * Created by easterCat on 2018/6/22.
 */
import babel from 'rollup-plugin-babel';

export default {
    input: './Monika/Monika/index.js',
    output: {
        file: './bundle/monika.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
};