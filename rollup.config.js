// import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import multi from '@rollup/plugin-multi-entry'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import deletePlugin from 'rollup-plugin-delete'
// import packageJson from './package.json'


export default {
    input: ['./src/index.js', './src/**/index.js'],
    output: [
        {
            dir: 'core',
            format: 'cjs',
            sourcemap: true,
        },
        // {
        //     file: 'core/index.esm.js',
        //     format: 'esm',
        //     sourcemap: true,
        // }
    ],
    preserveModules: true,
    plugins: [
        multi(),
        peerDepsExternal(),
        // resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        // deletePlugin({ targets: ['dist/*'] }),
    ],
    // external: Object.keys(packageJson.peerDependencies || {}),
}
