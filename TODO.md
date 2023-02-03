# Frontend TODO

## TODO

- [] Implement `getLoggedInUserQuery`
- TSLint config

## Production

- Improve chunking:
  - (!) Some chunks are larger than 500 kBs after minification. Consider:

    - Using dynamic import() to code-split the application
    - Use build.rollupOptions.output.manualChunks to improve chunking: <https://rollupjs.org/guide/en/#outputmanualchunks>
    - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.

## Dashboard

- Home (cases):
  - Candidates saved
    - Saved Candidates widget + button to New Search
    - No Candidates saved, but saved/recent present
      - Search view

## Trivial

- Favicon (index.html)
