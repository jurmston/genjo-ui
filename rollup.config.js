import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import deletebuild from 'rollup-plugin-delete'
import packageJson from './package.json'

const path = require('path')
const fse = require('fs-extra')

const packagePath = process.cwd()
const srcPath = path.join(packagePath, './src')

function getSubmodules() {
  const files = fse.readdirSync(srcPath)

  const entries = files.reduce((result, file) => {
    const filePath = `${srcPath}/${file}/index.js`

    if (fse.pathExistsSync(filePath)) {
      result.push(filePath)
    }

    return result
  }, [])

  return entries
}


const babelOptions = {
    exclude: /node_modules/,
    extensions: ['.js'],
    configFile: path.resolve(__dirname, './babel.config.js')
}

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
}

const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
}

export default {
  input: ['src/index.js', ...getSubmodules()],
  output: {
    dir: 'core',
    format: 'esm',
    name: 'GenjoUI',
    preserveModulesRoot: 'src',
    preserveModules: true,
  },
  plugins: [
    // multiEntry(),
    peerDepsExternal(),
    commonjs(commonjsOptions),
    babel(babelOptions),
    nodeResolve(nodeOptions),
    // sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
    // terser(),
    deletebuild(({ targets: ['core/*'] })),
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
}
