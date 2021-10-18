# Release Engineering

This flow is a simplified version of the "gitflow" model described [here](https://nvie.com/posts/a-successful-git-branching-model/). Our simplified version of this model does not use hotfix or release branches because we've found those muck up the git history log. Instead, hotfixes can be branched off of master and pull-requested back in directly and release branches can be cut from the `develop` branch.

## Branches
- `main`: production releases to staging and prod happen from this branch
- `develop`: developers merge into this branch continuous integration continuous deployment to the develop environment
- feature branches (e.g. `jeff_features`): each developer uses one (or more) feature branches merges happen into the `develop` branch

## Simplified Process
1. Synchronize the `develop` branch on your local machine to the repo.
    ```
    git checkout develop
    git pull
    ```

1. Update the version number:
    - in the `package.json` file update the `version` key based on the semantic changes made: breaking.feature.fix (see [https://medium.com/javascript-scene/software-versions-are-broken-3d2dc0da0783])
    - Commit the change.
    ```
    git add ./package.json
    git commit -m "Bump version to v0.1.2"
    git push
    ```

1. Verify that the commit on the `develop` branch passes the Continuous Build integration tests.

1. Merge `develop` into `main`.
    - Go to Git Hub’s "Pull Request" tab:
    - Create a pull request from `develop` to `main`.
    - Approve and merge the Pull Request.

1. Verify that Chromatic Deployment Action succeeded.
    - This may take a few minutes as Chromatic needs to republish the site after a successful build.

1. Sync the master branch on your local machine
    ```
    git checkout main
    git pull
    ```
    - Check that that Pull Request has been merged properly.

1. Create an annotated tag on the `main` branch.
    ```
    git co main
    git tag -a v0.1.2 -m "Version 0.1.2" [Tag names should start with "v", I think mostly to confirm to Github.com conventions :-)]
    git push --tags
    ```

1. Publish release on github
    - on the main code page click on "Releases"
    - click on "Draft a new release"
    - Select the tag created in the previous step.
    - Select the target branch `main`
    - Create a title and description for the release. Include the release notes.
    - Click "Publish"

1. Verify that `npm publish` ran correctly.
    - Review under actions panel on github.

1. Rebase `develop` on top of `main`
    ```
    git checkout develop
    git rebase main
    git push
    ```
