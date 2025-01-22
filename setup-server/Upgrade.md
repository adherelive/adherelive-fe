# Migration Plan: Node 18+ Upgrade

## Current package upgrades required

```text
> npm outdated
Package                                          Current           Wanted         Latest  Location                                              Depended by
@ant-design/compatible                             1.1.2            1.1.2          5.1.3  node_modules/@ant-design/compatible                   adherelive-fe
@ant-design/icons                                  4.8.3            4.8.3          5.5.2  node_modules/@ant-design/icons                        adherelive-fe
@babel/cli                                        7.19.3           7.26.4         7.26.4  node_modules/@babel/cli                               adherelive-fe
@babel/core                                       7.19.3           7.26.0         7.26.0  node_modules/@babel/core                              adherelive-fe
@babel/plugin-transform-arrow-functions           7.18.6           7.25.9         7.25.9  node_modules/@babel/plugin-transform-arrow-functions  adherelive-fe
@babel/preset-env                                 7.19.3           7.26.0         7.26.0  node_modules/@babel/preset-env                        adherelive-fe
@mui/icons-material                              5.16.13          5.16.13          6.3.0  node_modules/@mui/icons-material                      adherelive-fe
@mui/lab                                 5.0.0-alpha.175  5.0.0-alpha.175  6.0.0-beta.21  node_modules/@mui/lab                                 adherelive-fe
@mui/material                                    5.16.13          5.16.13          6.3.0  node_modules/@mui/material                            adherelive-fe
@mui/x-date-pickers                               6.20.2           6.20.2         7.23.3  node_modules/@mui/x-date-pickers                      adherelive-fe
algoliasearch                                     4.24.0           4.24.0         5.18.0  node_modules/algoliasearch                            adherelive-fe
antd                                             4.24.16          4.24.16         5.22.7  node_modules/antd                                     adherelive-fe
firebase                                          8.10.1           8.10.1         11.1.0  node_modules/firebase                                 adherelive-fe
prettier                                           2.7.1            2.8.8          3.4.2  node_modules/prettier                                 adherelive-fe
react                                            16.14.0          16.14.0         19.0.0  node_modules/react                                    adherelive-fe
react-datepicker                                  4.25.0           4.25.0          7.5.0  node_modules/react-datepicker                         adherelive-fe
react-dom                                        16.14.0          16.14.0         19.0.0  node_modules/react-dom                                adherelive-fe
react-intl                                         2.9.0            2.9.0          7.0.4  node_modules/react-intl                               adherelive-fe
react-markdown                                     8.0.7            8.0.7          9.0.1  node_modules/react-markdown                           adherelive-fe
react-redux                                        8.1.3            8.1.3          9.2.0  node_modules/react-redux                              adherelive-fe
react-router-dom                                  6.28.1           6.28.1          7.1.1  node_modules/react-router-dom                         adherelive-fe
react-spring                                      8.0.27           8.0.27          9.7.5  node_modules/react-spring                             adherelive-fe
react-timekeeper                                   1.1.0            1.1.0          2.2.1  node_modules/react-timekeeper                         adherelive-fe
redux                                              4.2.1            4.2.1          5.0.1  node_modules/redux                                    adherelive-fe
redux-thunk                                        2.4.2            2.4.2          3.1.0  node_modules/redux-thunk                              adherelive-fe
reselect                                           4.1.8            4.1.8          5.1.1  node_modules/reselect                                 adherelive-fe
web-vitals                                         3.5.2            3.5.2          4.2.4  node_modules/web-vitals                               adherelive-fe
```

```text
> npx npm-check-updates                                                                                                                                          
Checking \adherelive-fe\package.json
[====================] 53/53 100%

 @ant-design/compatible                                ^1.1.2  →          ^5.1.3
 @ant-design/icons                                     ^4.8.3  →          ^5.5.2
 @devexpress/dx-react-core                             ^4.0.6  →          ^4.0.9
 @devexpress/dx-react-scheduler                        ^4.0.6  →          ^4.0.9
 @devexpress/dx-react-scheduler-material-ui            ^4.0.6  →          ^4.0.9
 @emotion/react                                      ^11.11.3  →        ^11.14.0
 @emotion/styled                                     ^11.11.0  →        ^11.14.0
 @mui/icons-material                                  ^5.15.2  →          ^6.3.0
 @mui/lab                                    ^5.0.0-alpha.158  →  ^6.0.0-beta.21
 @mui/material                                        ^5.15.2  →          ^6.3.0
 @mui/x-date-pickers                                  ^6.18.6  →         ^7.23.3
 agora-rtc-sdk-ng                                     ^4.19.3  →         ^4.23.0
 algoliasearch                                        ^4.22.1  →         ^5.18.0
 antd                                                 ^4.22.4  →         ^5.22.7
 axios                                                 ^1.6.2  →          ^1.7.9
 chart.js                                              ^4.4.1  →          ^4.4.7
 firebase                                              ^8.5.0  →         ^11.1.0
 moment-timezone                                      ^0.5.43  →         ^0.5.46
 prettier                                              ^2.8.8  →          ^3.4.2
 react                                               ^16.14.0  →         ^19.0.0
 react-datepicker                                     ^4.25.0  →          ^7.5.0
 react-dom                                           ^16.14.0  →         ^19.0.0
 react-intl                                            ^2.7.2  →          ^7.0.4
 react-markdown                                        ^8.0.7  →          ^9.0.1
 react-redux                                           ^8.1.3  →          ^9.2.0
 react-router-dom                                     ^6.21.1  →          ^7.1.1
 react-spring                                         ^8.0.27  →          ^9.7.5
 react-timekeeper                                      ^1.1.0  →          ^2.2.1
 redux                                                 ^4.2.1  →          ^5.0.1
 redux-thunk                                           ^2.4.2  →          ^3.1.0
 reselect                                              ^4.1.8  →          ^5.1.1
 web-vitals                                            ^3.5.0  →          ^4.2.4

```

## Phase 1: Environment and Dependency Analysis (2-3 days)

### 1.1 Setup Testing Environment

- Create a new git branch for Node 18 migration
- Set up parallel CI/CD pipeline for testing Node 18 builds
- Create a staging environment running Node 18

### 1.2 Dependency Audit

Critical packages requiring updates:

- `react-mde` (blocking React 17+ upgrade)
- `react` and `react-dom` (currently at 16.x)
- `@ant-design/compatible` (needs version alignment)
- `react-timekeeper` (may need replacement)
- `react-places-autocomplete` (maintenance status check)

## Phase 2: React Ecosystem Upgrade (1-2 weeks)

### 2.1 React 16 to 17 Migration

1. Replace `react-mde` with modern alternatives:
   ```json
   {
     "dependencies": {
       "@uiw/react-md-editor": "^3.6.0"     }
   }
   ```

   Or use the below compatible package
   ```json
   {
     "dependencies": {
       "react-simplemde-editor": "^5.2.0"
     }
   }
   ```


2. Update core React packages:
   ```json
   {
     "dependencies": {
       "react": "^17.0.2",
       "react-dom": "^17.0.2"
     }
   }
   ```

3. Run codemod scripts for React 17 compatibility:
   ```bash
   npx react-codemod update-react-imports
   ```

### 2.2 React 17 to 18 Migration

1. Update React packages:
   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     }
   }
   ```

2. Update React ecosystem packages:
   ```json
   {
     "dependencies": {
       "react-redux": "^9.0.0",
       "react-router-dom": "^6.21.0",
       "@redux/toolkit": "^2.0.0"
     }
   }
   ```

3. Handle React 18 specific changes:
    - Replace `ReactDOM.render` with `ReactDOM.createRoot`
    - Update event pooling code
    - Review automatic batching implications

## Phase 3: UI Library Updates (1 week)

### 3.1 Material UI

```json
{
  "dependencies": {
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@mui/lab": "^5.0.0-alpha.155",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0"
  }
}
```

### 3.2 Ant Design

```json
{
  "dependencies": {
    "antd": "^5.12.0",
    "@ant-design/icons": "^5.2.0",
    "@ant-design/compatible": "^5.1.0"
  }
}
```

## Phase 4: Third-party Package Updates (1 week)

### 4.1 Development Tools

```json
{
  "dependencies": {
    "@craco/craco": "^7.1.0",
    "react-scripts": "^5.0.1",
    "web-vitals": "^3.5.0"
  }
}
```

### 4.2 Feature-specific Packages

```json
{
  "dependencies": {
    "agora-rtc-sdk-ng": "^4.19.0",
    "firebase": "^10.7.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

## Phase 5: Node 18 Specific Updates (2-3 days)

### 5.1 Update package.json

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 5.2 Update Build Scripts

- Review and update npm scripts
- Update CI/CD configurations
- Update Docker configurations if applicable

## Phase 6: Testing and Validation (1-2 weeks)

### 6.1 Test Strategy

1. Unit Tests
    - Update test runners
    - Update testing libraries
    - Run full test suite

2. Integration Tests
    - Test all API integrations
    - Verify WebSocket connections
    - Check file upload/download features

3. End-to-End Tests
    - Cross-browser testing
    - Mobile responsiveness
    - Performance benchmarking

### 6.2 Performance Monitoring

- Set up metrics for:
    - Build times
    - Runtime performance
    - Memory usage
    - Load times

## Phase 7: Deployment (2-3 days)

### 7.1 Deployment Strategy

1. Update deployment scripts
2. Configure Node 18 in production environment
3. Plan rollback strategy
4. Update monitoring and logging

### 7.2 Rollout Plan

1. Deploy to development environment
2. Test in staging environment
3. Gradual rollout to production
4. Monitor for issues

## Timeline and Resources

### Estimated Timeline

- Total duration: 4-6 weeks
- Critical path: React ecosystem updates
- Parallel tracks: UI library updates and third-party package updates

### Required Resources

- Frontend developers
- QA engineers
- DevOps support
- Product owner for feature validation

### Risk Mitigation

1. Maintain comprehensive test coverage
2. Keep detailed documentation of changes
3. Prepare rollback procedures
4. Set up feature flags for gradual rollout

## Success Criteria

- All tests passing
- Build time within acceptable range
- Runtime performance metrics meeting targets
- No regression in user experience
- All features functioning as expected

## Post-Migration Tasks

1. Document all changes and updates
2. Update development guidelines
3. Clean up deprecated code
4. Review and update security measures
5. Plan for future updates