const Configuration = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        name: 'init-project',
        path: './',
        parserOpts: {
            headerPattern: /^(myDemo)-[0-9]+\((\w*)\)\s(.*)$/,
            headerCorrespondence: ['ticket', 'type', 'subject'],
        },
    },
};

module.exports = Configuration;
