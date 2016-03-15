Package.describe({
  name: 'heaven7:instagram',
  version: '0.0.1',
  summary: 'API wrapper package to retreive user data from intragram',
  git: 'https://github.com/heaven7/intragram.git',
  documentation: 'README.md'
})

var both = ['client','server'],
    packages = [
        'ostrio:instagram-node@0.5.8',
        'kadira:flow-router@2.0.2',
        'service-configuration',
        'tracker',
        'session',
        'templating',
        'reactive-var',
        'es5-shim',
        'ecmascript',
        'jquery'
]

Package.onUse(function(api) {
    api.use(packages, both)
    api.imply(packages)

    api.addFiles([
      'lib/both/router.js'
    ], both)

    api.addFiles([
        'lib/client/templates.js',
    ], 'client')

    api.addFiles([
      'lib/server/methods.js'
    ], 'server')
})