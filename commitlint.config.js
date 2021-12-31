const Configuration = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        name: 'init-project',
        path: './',
        parserOpts: {
            headerPattern: /^(init-project)-[0-9]+\((\w*)\)\s(.*)$/,
            headerCorrespondence: ['ticket', 'type', 'subject'],
        },
    },
};

module.exports = Configuration;
