module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/radio',
        'http://localhost:3000/shop'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.85}],
        'categories:accessibility': ['warn', {minScore: 0.9}]
      }
    }
  }
};
