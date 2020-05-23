const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',
    {
        branch: 'master',
        repo: 'git@github.com:bitcoinclubatksu/bitcoinclubatksu.github.io.git',
        user: {
            name: 'Harshit Joshi',
            email: 'hjoshi023@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
);
