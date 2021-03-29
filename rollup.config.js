import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import deletePlugin from 'rollup-plugin-delete'
import packageJson from './package.json'

export default {
    input: packageJson.source,
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        }
    ],
    plugins: [
        external(),
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        // deletePlugin({ targets: ['dist/*'] }),
    ],
    external: Object.keys(packageJson.peerDependencies || {}),
};
