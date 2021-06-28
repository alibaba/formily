# GIT COMMIT MESSAGE CHEAT SHEET

**Proposed format of the commit message**

```
<type>(<scope>): <subject>

<body>
```

All lines are wrapped at 100 characters !

**Allowed `<type>`**

- breaking --- Breaking Change,
- feat --- A new feature,
- bugfix --- Bug Fix,
- doc --- Documentation,
- refactor --- Some Code Change,
- test --- Update Test Cases,
- perf --- Improve Performace,
- build --- Update Workflow Scripts,
- chore --- Improve Some Code

**Allowed `<scope>`**
Scope could be anything specifying place of the commit change.

For example $location, $browser, compiler, scope, ng:href, etc...

**Breaking changes**
All breaking changes have to be mentioned in message body, on separated line:
​ _Breaks removed $browser.setUrl() method (use $browser.url(newUrl))_
​ _Breaks ng: repeat option is no longer supported on selects (use ng:options)_

**Message body**

- uses the imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous behavior
