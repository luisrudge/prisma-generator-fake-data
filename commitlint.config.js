module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: {
    '@release-it/conventional-changelog': {
      gitRawCommitsOpts: {
        merges: null,
      },
      parserOpts: {
        mergePattern: '^Merge pull request #(\\d+) from (.*)$',
      },
    },
  },
};
